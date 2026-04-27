import { Footer } from '@/components/store/footer';
import { Navbar } from '@/components/store/navbar';
import { ThinHero } from '@/components/store/thin-hero';
import { Link, useForm, usePage } from '@inertiajs/react';

type Product = {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    price: string;
};

type Review = {
    id: number;
    rating: number;
    comment: string;
    created_at: string;
    user: { name: string };
    product: { name: string; slug: string; image: string | null };
};

type OrderItem = {
    id: number;
    quantity: number;
    line_total: string;
    product: {
        id: number;
        name: string;
        slug: string;
        image: string | null;
    } | null;
};

type Order = {
    id: number;
    created_at: string;
    status: string;
    payment_status: string;
    total_amount: string;
    items: OrderItem[];
};

type Pagination<T> = {
    data: T[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
};

interface StoreInfoProps {
    title: string;
    page: string;
    consultationPrefill?: {
        name?: string;
        email?: string;
    };
    community?: {
        products: Pagination<Product>;
        reviews: Pagination<Review>;
    } | null;
    account?: {
        user: { name: string; email: string };
        orders: Pagination<Order>;
    } | null;
}

const formatKes = (value: number): string => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(value);
};

export default function StoreInfo({ title, page, consultationPrefill, community, account }: StoreInfoProps): JSX.Element {
    const appointmentForm = useForm({
        name: consultationPrefill?.name ?? '',
        email: consultationPrefill?.email ?? '',
        phone: '',
        preferred_at: '',
        message: '',
    });
    const { props } = usePage();
    const authUser = (props as { auth?: { user?: { id: number } | null } }).auth?.user;

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <Navbar />
            <ThinHero title={title} />

            {page === 'store' && (
                <section className="mx-auto w-full max-w-6xl px-6 py-10 lg:pb-16">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <iframe
                            className="h-[600px] w-full"
                            src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Luthuli%20Avenue%20Gaberone%20Plaza,%20First%20Floor%20Luthuli%20Ave,%20Nairobi+(2B%20Gamers%20Store)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                            title="2B Gamers Store Map"
                            loading="lazy"
                        />
                    </div>
                </section>
            )}

            {page === 'consultation' && (
                <section className="mx-auto max-w-3xl px-6 py-12 lg:pb-16">
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            appointmentForm.post('/consultation/appointments');
                        }}
                        className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                        <h2 className="text-xl font-semibold text-slate-900">Book Setup Appointment</h2>
                        <p className="text-sm text-slate-600">Share your preferred time and setup needs. Our team will reach out to confirm.</p>
                        <input value={appointmentForm.data.name} onChange={(event) => appointmentForm.setData('name', event.target.value)} placeholder="Full Name" className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 placeholder:text-slate-400" />
                        <input value={appointmentForm.data.email} onChange={(event) => appointmentForm.setData('email', event.target.value)} placeholder="Email Address" className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 placeholder:text-slate-400" />
                        <input value={appointmentForm.data.phone} onChange={(event) => appointmentForm.setData('phone', event.target.value)} placeholder="Phone Number" className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 placeholder:text-slate-400" />
                        <input type="datetime-local" value={appointmentForm.data.preferred_at} onChange={(event) => appointmentForm.setData('preferred_at', event.target.value)} className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900" />
                        <textarea value={appointmentForm.data.message} onChange={(event) => appointmentForm.setData('message', event.target.value)} placeholder="Any setup details" rows={4} className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 placeholder:text-slate-400" />
                        <button disabled={appointmentForm.processing} className="w-fit rounded bg-blue-600 px-5 py-2 font-semibold text-white disabled:opacity-50">
                            {appointmentForm.processing ? 'Submitting...' : 'Request Appointment'}
                        </button>
                    </form>
                </section>
            )}

            {page === 'community' && community && (
                <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-2 lg:pb-16">
                    <div>
                        <h2 className="text-2xl font-semibold">Products</h2>
                        <div className="mt-4 grid gap-4">
                            {community.products.data.map((product) => (
                                <article key={product.id} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                                    <img src={product.image ?? 'https://placehold.co/100x100'} alt={product.name} className="h-20 w-20 rounded object-cover" />
                                    <div>
                                        <Link href={`/products/${product.slug}`} className="font-semibold text-slate-900 hover:text-blue-600">{product.name}</Link>
                                        <p className="text-sm text-slate-600">{formatKes(Number(product.price))}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold">Latest Reviews</h2>
                        <div className="mt-4 space-y-3">
                            {community.reviews.data.map((review) => (
                                <article key={review.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                    <p className="text-sm text-slate-500">{review.user.name} on {review.product.name}</p>
                                    <p className="text-amber-400">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                                    <p className="mt-2 text-sm text-slate-700">{review.comment}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {page === 'account' && (
                <section className="mx-auto max-w-6xl px-6 py-12 lg:pb-16">
                    {!authUser && (
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                            <h2 className="text-2xl font-semibold text-slate-900">Sign in to your account</h2>
                            <p className="mt-3 text-slate-600">Log in to view your order history and purchase details.</p>
                            <Link href="/login" className="mt-6 inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white">Log In</Link>
                        </div>
                    )}

                    {authUser && account && (
                        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
                            <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                <h3 className="px-2 text-sm font-semibold tracking-wide text-slate-500 uppercase">My Account</h3>
                                <nav className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                                    <a href="#account-details" className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">Account Details</a>
                                    <a href="#order-history" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">Order History</a>
                                    <a href="#purchases" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">Previous Purchases</a>
                                </nav>
                            </aside>

                            <div className="space-y-6">
                                <section id="account-details" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <h2 className="text-xl font-semibold text-slate-900">Account Details</h2>
                                    <p className="mt-3 text-sm text-slate-600"><span className="font-medium text-slate-800">Name:</span> {account.user.name}</p>
                                    <p className="mt-2 text-sm text-slate-600"><span className="font-medium text-slate-800">Email:</span> {account.user.email}</p>
                                </section>

                                <section id="order-history" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <h2 className="text-xl font-semibold text-slate-900">Order History</h2>
                                    <div className="mt-4 space-y-3">
                                        {account.orders.data.length === 0 && <p className="text-sm text-slate-500">You do not have any orders yet.</p>}
                                        {account.orders.data.map((order) => (
                                            <article key={order.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                                <div className="flex flex-wrap items-center justify-between gap-2">
                                                    <p className="font-semibold text-slate-900">Order #{order.id}</p>
                                                    <p className="text-sm text-slate-500">{new Date(order.created_at).toLocaleDateString()}</p>
                                                </div>
                                                <p className="mt-2 text-sm text-slate-600">Status: {order.status} • Payment: {order.payment_status}</p>
                                                <p className="mt-1 text-sm text-green-400">Total: {formatKes(Number(order.total_amount))}</p>
                                            </article>
                                        ))}
                                    </div>
                                </section>

                                <section id="purchases" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <h2 className="text-xl font-semibold text-slate-900">Previous Purchases</h2>
                                    <div className="mt-4 space-y-4">
                                        {account.orders.data.flatMap((order) => order.items).length === 0 && (
                                            <p className="text-sm text-slate-500">No purchase items found yet.</p>
                                        )}
                                        {account.orders.data.flatMap((order) => order.items.map((item) => ({ orderId: order.id, item }))).map(({ orderId, item }) => (
                                            <article key={`${orderId}-${item.id}`} className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center">
                                                <img src={item.product?.image ?? 'https://placehold.co/96x96'} alt={item.product?.name ?? 'Product'} className="h-20 w-20 rounded object-cover" />
                                                <div className="flex-1">
                                                    {item.product ? (
                                                        <Link href={`/products/${item.product.slug}`} className="font-semibold text-slate-900 hover:text-blue-600">{item.product.name}</Link>
                                                    ) : (
                                                        <p className="font-semibold text-slate-500">Unavailable product</p>
                                                    )}
                                                    <p className="mt-1 text-sm text-slate-500">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="text-sm font-medium text-green-400">{formatKes(Number(item.line_total))}</p>
                                            </article>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    )}
                </section>
            )}

            {page !== 'store' && page !== 'consultation' && page !== 'community' && page !== 'account' && (
                <section className="mx-auto max-w-5xl px-6 py-16 text-center lg:pb-20">
                    <p className="mx-auto mt-4 max-w-2xl text-slate-600">This page is now available and connected from the main navigation. More detailed content can be added here anytime.</p>
                    <Link href="/products" className="mt-8 inline-flex rounded bg-blue-600 px-6 py-3 font-semibold text-white">Browse Products</Link>
                </section>
            )}

            <Footer />
        </main>
    );
}
