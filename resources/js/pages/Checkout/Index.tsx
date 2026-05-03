import { Footer } from '@/components/store/footer';
import { Navbar } from '@/components/store/navbar';
import { ThinHero } from '@/components/store/thin-hero';
import { Link, useForm } from '@inertiajs/react';

interface CartItem {
    id: number;
    quantity: number;
    product: {
        name: string;
        price: number;
        image: string | null;
    };
}

interface CartData {
    items: CartItem[];
}

const formatKes = (value: number): string => {
    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        minimumFractionDigits: 2,
    }).format(value);
};

export default function CheckoutIndex({ total, cart }: { total: number; cart: CartData }): JSX.Element {
    const shipping = 0;
    const grandTotal = total;
    const hasItems = cart.items.length > 0;

    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        line_1: '',
        line_2: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'KE',
        mpesa_phone: '',
        payment_method: 'mpesa',
    });

    return (
        <main className="min-h-screen bg-[#f4f4f5] text-[#111827]">
            <Navbar />
            <ThinHero title="Checkout" />

            {!hasItems ? (
                <section className="mx-auto my-16 max-w-3xl rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                    <h1 className="text-3xl font-semibold text-slate-900">No products to checkout</h1>
                    <p className="mt-3 text-slate-600">Your cart is empty. Continue shopping to add products.</p>
                    <Link
                        href="/products"
                        className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-500"
                    >
                        Continue Shopping
                    </Link>
                </section>
            ) : (
            <section className="mx-auto my-16 grid max-w-screen-2xl gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:grid-cols-[1.5fr_1fr]">
                <div className="border-b border-slate-200 p-8 md:border-r md:border-b-0 md:p-12">
                    <h1 className="text-3xl font-semibold text-slate-900">Checkout</h1>

                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            const submitData: Record<string, string> = { ...data };
                            if (submitData.payment_method !== 'mpesa') {
                                delete submitData.mpesa_phone;
                            }
                            post('/checkout', {
                                data: submitData,
                                preserveScroll: true,
                            });
                        }}
                        className="mt-8 space-y-4"
                    >
                        {/* Payment Method Selection */}
                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-medium text-slate-700">Payment Method</label>
                            <div className="space-y-2">
                                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-300 p-3 transition hover:border-blue-500">
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="mpesa"
                                        checked={data.payment_method === 'mpesa'}
                                        onChange={() => setData('payment_method', 'mpesa')}
                                        className="text-blue-600"
                                    />
                                    <span className="font-medium text-slate-900">M-Pesa</span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-300 p-3 transition hover:border-blue-500">
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="cash"
                                        checked={data.payment_method === 'cash'}
                                        onChange={() => setData('payment_method', 'cash')}
                                        className="text-blue-600"
                                    />
                                    <span className="font-medium text-slate-900">Cash on Delivery</span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-300 p-3 transition hover:border-blue-500">
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="bank"
                                        checked={data.payment_method === 'bank'}
                                        onChange={() => setData('payment_method', 'bank')}
                                        className="text-blue-600"
                                    />
                                    <span className="font-medium text-slate-900">Bank Transfer</span>
                                </label>
                            </div>
                        </div>

                        {/* M-Pesa Phone Number - only show for M-Pesa */}
                        {data.payment_method === 'mpesa' && (
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">M-Pesa Phone Number</label>
                                <input
                                    value={data.mpesa_phone}
                                    onChange={(event) => setData('mpesa_phone', event.target.value)}
                                    className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400"
                                    placeholder="2547XXXXXXXX"
                                    maxLength={12}
                                />
                                <p className="mt-1 text-xs text-slate-500">Enter your M-Pesa phone number (format: 2547XXXXXXXX)</p>
                            </div>
                        )}

                        {/* Bank Transfer Info - only show for Bank */}
                        {data.payment_method === 'bank' && (
                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <p className="mb-2 text-sm text-slate-700">Bank Transfer Details:</p>
                                <p className="text-sm text-slate-500">Bank: Equity Bank</p>
                                <p className="text-sm text-slate-500">Account Name: 2B Gamers Entertainment</p>
                                <p className="text-sm text-slate-500">Account Number: 1234567890</p>
                            </div>
                        )}

                        <div className="mt-6">
                            <label className="mb-4 block text-sm font-medium text-slate-700">Customer Information</label>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <input
                                value={data.first_name}
                                onChange={(event) => setData('first_name', event.target.value)}
                                className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400"
                                placeholder="First Name"
                            />
                            <input
                                value={data.last_name}
                                onChange={(event) => setData('last_name', event.target.value)}
                                className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400"
                                placeholder="Last Name"
                            />
                        </div>

                        <input
                            value={data.email}
                            onChange={(event) => setData('email', event.target.value)}
                            className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400"
                            placeholder="Email"
                            type="email"
                        />

                        <input
                            value={data.phone}
                            onChange={(event) => setData('phone', event.target.value)}
                            className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400"
                            placeholder="Phone Number"
                            type="tel"
                        />

                        <div className="mt-6">
                            <label className="mb-4 block text-sm font-medium text-slate-700">Shipping Information</label>
                        </div>

                        <input
                            value={data.line_1}
                            onChange={(event) => setData('line_1', event.target.value)}
                            className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400"
                            placeholder="Address"
                        />
                        <input
                            value={data.line_2}
                            onChange={(event) => setData('line_2', event.target.value)}
                            className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400"
                            placeholder="Apartment / Landmark"
                        />

                        <div className="grid grid-cols-3 gap-3">
                            <input
                                value={data.city}
                                onChange={(event) => setData('city', event.target.value)}
                                className="rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400"
                                placeholder="City"
                            />
                            <input
                                value={data.state}
                                onChange={(event) => setData('state', event.target.value)}
                                className="rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400"
                                placeholder="County"
                            />
                            <input
                                value={data.postal_code}
                                onChange={(event) => setData('postal_code', event.target.value)}
                                className="rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400"
                                placeholder="Postal code"
                            />
                        </div>

                        <input
                            value={data.country}
                            onChange={(event) => setData('country', event.target.value.toUpperCase())}
                            className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400"
                            placeholder="Country code (KE)"
                            maxLength={2}
                        />

                        {Object.keys(errors).length > 0 && (
                            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                <p className="font-medium">Please correct the highlighted checkout fields.</p>
                                <ul className="mt-2 list-disc space-y-1 pl-5">
                                    {Object.entries(errors).map(([field, message]) => (
                                        <li key={field}>{message}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button
                            disabled={processing}
                            className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-500 disabled:opacity-60"
                        >
                            {processing ? 'Processing...' : `Pay ${formatKes(grandTotal)}`}
                        </button>
                    </form>
                </div>

                <aside className="bg-slate-50 p-8 md:p-10">
                    <div className="space-y-6">
                        {cart.items.map((item) => (
                            <div key={item.id} className="flex gap-4 border-b border-slate-200 pb-5">
                                <img
                                    src={item.product.image ?? 'https://placehold.co/92x92'}
                                    alt={item.product.name}
                                    className="h-20 w-20 rounded-lg border border-slate-300 object-cover"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold text-slate-900">{item.product.name}</p>
                                    <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                                    <p className="text-sm font-medium text-slate-900">{formatKes(Number(item.product.price) * item.quantity)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Subtotal</span>
                            <span className="text-slate-900">{formatKes(total)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">VAT</span>
                            <span className="text-slate-900">Included</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Shipping</span>
                            <span className="text-slate-900">{formatKes(shipping)}</span>
                        </div>
                        <p className="text-xs text-slate-500">Shipping fee: Outside Nairobi CBD is KES 350. Free delivery within CBD.</p>
                        <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-base font-semibold">
                            <span className="text-slate-900">Total</span>
                            <span className="text-slate-900">{formatKes(grandTotal)}</span>
                        </div>
                    </div>
                </aside>
            </section>
            )}

            <Footer />
        </main>
    );
}
