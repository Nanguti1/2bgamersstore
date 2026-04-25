import { Footer } from '@/components/store/footer';
import { Navbar } from '@/components/store/navbar';
import { useForm } from '@inertiajs/react';

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
    const shipping = cart.items.length > 0 ? 650 : 0;
    const tax = total * 0.16;
    const grandTotal = total + shipping + tax;

    const { data, setData, post, processing, errors } = useForm({
        line_1: '',
        line_2: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'KE',
        card_email: '',
        card_name: '',
        card_number: '',
        expiry: '',
        cvc: '',
    });

    return (
        <main className="min-h-screen bg-[#f4f4f5] text-[#111827]">
            <Navbar />

            <section className="mx-auto grid max-w-6xl gap-0 border-x border-zinc-200 bg-white md:grid-cols-[1.5fr_1fr]">
                <div className="border-b border-zinc-200 p-8 md:border-r md:border-b-0 md:p-12">
                    <h1 className="text-3xl font-semibold">Checkout</h1>

                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            post('/checkout');
                        }}
                        className="mt-8 space-y-4"
                    >
                        <input
                            value={data.card_email}
                            onChange={(event) => setData('card_email', event.target.value)}
                            className="w-full rounded-md border border-zinc-300 px-3 py-2"
                            placeholder="Email address"
                        />
                        <input
                            value={data.card_name}
                            onChange={(event) => setData('card_name', event.target.value)}
                            className="w-full rounded-md border border-zinc-300 px-3 py-2"
                            placeholder="Name on card"
                        />
                        <input
                            value={data.card_number}
                            onChange={(event) => setData('card_number', event.target.value)}
                            className="w-full rounded-md border border-zinc-300 px-3 py-2"
                            placeholder="Card number"
                        />

                        <div className="grid grid-cols-[2fr_1fr] gap-3">
                            <input
                                value={data.expiry}
                                onChange={(event) => setData('expiry', event.target.value)}
                                className="rounded-md border border-zinc-300 px-3 py-2"
                                placeholder="Expiration date (MM/YY)"
                            />
                            <input
                                value={data.cvc}
                                onChange={(event) => setData('cvc', event.target.value)}
                                className="rounded-md border border-zinc-300 px-3 py-2"
                                placeholder="CVC"
                            />
                        </div>

                        <input
                            value={data.line_1}
                            onChange={(event) => setData('line_1', event.target.value)}
                            className="w-full rounded-md border border-zinc-300 px-3 py-2"
                            placeholder="Address"
                        />
                        <input
                            value={data.line_2}
                            onChange={(event) => setData('line_2', event.target.value)}
                            className="w-full rounded-md border border-zinc-300 px-3 py-2"
                            placeholder="Apartment / Landmark"
                        />

                        <div className="grid grid-cols-3 gap-3">
                            <input
                                value={data.city}
                                onChange={(event) => setData('city', event.target.value)}
                                className="rounded-md border border-zinc-300 px-3 py-2"
                                placeholder="City"
                            />
                            <input
                                value={data.state}
                                onChange={(event) => setData('state', event.target.value)}
                                className="rounded-md border border-zinc-300 px-3 py-2"
                                placeholder="County"
                            />
                            <input
                                value={data.postal_code}
                                onChange={(event) => setData('postal_code', event.target.value)}
                                className="rounded-md border border-zinc-300 px-3 py-2"
                                placeholder="Postal code"
                            />
                        </div>

                        <input
                            value={data.country}
                            onChange={(event) => setData('country', event.target.value.toUpperCase())}
                            className="w-full rounded-md border border-zinc-300 px-3 py-2"
                            placeholder="Country code (KE)"
                            maxLength={2}
                        />

                        {(errors.line_1 || errors.city || errors.state || errors.postal_code || errors.country) && (
                            <p className="text-sm text-red-600">Please fill all required shipping fields correctly.</p>
                        )}

                        <button
                            disabled={processing}
                            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
                        >
                            {processing ? 'Processing...' : `Pay ${formatKes(grandTotal)}`}
                        </button>

                        <p className="text-center text-xs text-zinc-500">Payment details stored in plain text</p>
                    </form>
                </div>

                <aside className="p-8 md:p-10">
                    <div className="space-y-6">
                        {cart.items.map((item) => (
                            <div key={item.id} className="flex gap-4 border-b border-zinc-100 pb-5">
                                <img
                                    src={item.product.image ?? 'https://placehold.co/92x92'}
                                    alt={item.product.name}
                                    className="h-20 w-20 rounded-lg border border-zinc-100 object-cover"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold">{item.product.name}</p>
                                    <p className="text-sm text-zinc-600">Qty: {item.quantity}</p>
                                    <p className="text-sm font-medium text-zinc-800">{formatKes(Number(item.product.price) * item.quantity)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{formatKes(total)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Taxes</span>
                            <span>{formatKes(tax)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>{formatKes(shipping)}</span>
                        </div>
                        <div className="mt-4 flex justify-between border-t border-zinc-200 pt-4 text-base font-semibold">
                            <span>Total</span>
                            <span>{formatKes(grandTotal)}</span>
                        </div>
                    </div>
                </aside>
            </section>

            <Footer />
        </main>
    );
}
