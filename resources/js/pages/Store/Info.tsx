import { Footer } from '@/components/store/footer';
import { Navbar } from '@/components/store/navbar';
import { ThinHero } from '@/components/store/thin-hero';
import { Link, useForm } from '@inertiajs/react';

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
}

const formatKes = (value: number): string => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(value);
};

export default function StoreInfo({ title, page, consultationPrefill, community }: StoreInfoProps): JSX.Element {
    const appointmentForm = useForm({
        name: consultationPrefill?.name ?? '',
        email: consultationPrefill?.email ?? '',
        phone: '',
        preferred_at: '',
        message: '',
    });

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100">
            <Navbar />
            <ThinHero title={title} />

            {page === 'store' && (
                <section className="mx-auto w-full max-w-6xl px-6 py-10">
                    <div className="overflow-hidden rounded-2xl border border-zinc-800">
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
                <section className="mx-auto max-w-3xl px-6 py-12">
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            appointmentForm.post('/consultation/appointments');
                        }}
                        className="grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"
                    >
                        <h2 className="text-xl font-semibold">Book Setup Appointment</h2>
                        <input value={appointmentForm.data.name} onChange={(event) => appointmentForm.setData('name', event.target.value)} placeholder="Full Name" className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2" />
                        <input value={appointmentForm.data.email} onChange={(event) => appointmentForm.setData('email', event.target.value)} placeholder="Email Address" className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2" />
                        <input value={appointmentForm.data.phone} onChange={(event) => appointmentForm.setData('phone', event.target.value)} placeholder="Phone Number" className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2" />
                        <input type="datetime-local" value={appointmentForm.data.preferred_at} onChange={(event) => appointmentForm.setData('preferred_at', event.target.value)} className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2" />
                        <textarea value={appointmentForm.data.message} onChange={(event) => appointmentForm.setData('message', event.target.value)} placeholder="Any setup details" rows={4} className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2" />
                        <button disabled={appointmentForm.processing} className="w-fit rounded bg-blue-600 px-5 py-2 font-semibold text-white disabled:opacity-50">
                            {appointmentForm.processing ? 'Submitting...' : 'Request Appointment'}
                        </button>
                    </form>
                </section>
            )}

            {page === 'community' && community && (
                <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-2">
                    <div>
                        <h2 className="text-2xl font-semibold">Products</h2>
                        <div className="mt-4 grid gap-4">
                            {community.products.data.map((product) => (
                                <article key={product.id} className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3">
                                    <img src={product.image ?? 'https://placehold.co/100x100'} alt={product.name} className="h-20 w-20 rounded object-cover" />
                                    <div>
                                        <Link href={`/products/${product.slug}`} className="font-semibold hover:text-blue-400">{product.name}</Link>
                                        <p className="text-sm text-zinc-400">{formatKes(Number(product.price))}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {community.products.links.map((link, index) => (
                                <Link key={`${link.label}-${index}`} href={link.url ?? '#'} className={`rounded border px-3 py-1 text-sm ${link.active ? 'border-blue-500 bg-blue-500 text-white' : 'border-zinc-700'}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold">Latest Reviews</h2>
                        <div className="mt-4 space-y-3">
                            {community.reviews.data.map((review) => (
                                <article key={review.id} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                                    <p className="text-sm text-zinc-400">{review.user.name} on {review.product.name}</p>
                                    <p className="text-amber-400">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                                    <p className="mt-2 text-sm">{review.comment}</p>
                                </article>
                            ))}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {community.reviews.links.map((link, index) => (
                                <Link key={`${link.label}-${index}`} href={link.url ?? '#'} className={`rounded border px-3 py-1 text-sm ${link.active ? 'border-blue-500 bg-blue-500 text-white' : 'border-zinc-700'}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {page !== 'store' && page !== 'consultation' && page !== 'community' && (
                <section className="mx-auto max-w-5xl px-6 py-16 text-center">
                    <p className="mx-auto mt-4 max-w-2xl text-zinc-300">This page is now available and connected from the main navigation. More detailed content can be added here anytime.</p>
                    <Link href="/products" className="mt-8 inline-flex rounded bg-blue-600 px-6 py-3 font-semibold text-white">Browse Products</Link>
                </section>
            )}

            <Footer />
        </main>
    );
}
