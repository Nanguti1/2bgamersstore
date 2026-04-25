import { Footer } from '@/components/store/footer';
import { Navbar } from '@/components/store/navbar';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

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

    // Show success message if redirected from successful checkout
    useEffect(() => {
        const successMessage = (window as any).pageProps?.flash?.success;
        if (successMessage) {
            toast.success(successMessage);
        }
    }, []);

    return (
        <main className="min-h-screen bg-gray-950 text-gray-100">
            <Navbar />

            <section className="mx-auto grid max-w-screen-2xl gap-0 border-x border-zinc-800 bg-zinc-900 md:grid-cols-[1.5fr_1fr] my-16 px-8">
                <div className="border-b border-zinc-800 p-8 md:border-r md:border-b-0 md:p-12">
                    <h1 className="text-3xl font-semibold text-white">Checkout</h1>

                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            post('/checkout');
                        }}
                        className="mt-8 space-y-4"
                    >
                        {/* Payment Method Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Payment Method</label>
                            <div className="space-y-2">
                                <label className="flex items-center gap-3 p-3 border border-zinc-700 rounded-lg cursor-pointer hover:border-blue-500 transition">
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="mpesa"
                                        checked={data.payment_method === 'mpesa'}
                                        onChange={() => setData('payment_method', 'mpesa')}
                                        className="text-blue-600"
                                    />
                                    <span className="text-white font-medium">M-Pesa</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 border border-zinc-700 rounded-lg cursor-pointer hover:border-blue-500 transition">
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="cash"
                                        checked={data.payment_method === 'cash'}
                                        onChange={() => setData('payment_method', 'cash')}
                                        className="text-blue-600"
                                    />
                                    <span className="text-white font-medium">Cash on Delivery</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 border border-zinc-700 rounded-lg cursor-pointer hover:border-blue-500 transition">
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="bank"
                                        checked={data.payment_method === 'bank'}
                                        onChange={() => setData('payment_method', 'bank')}
                                        className="text-blue-600"
                                    />
                                    <span className="text-white font-medium">Bank Transfer</span>
                                </label>
                            </div>
                        </div>

                        {/* M-Pesa Phone Number - only show for M-Pesa */}
                        {data.payment_method === 'mpesa' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">M-Pesa Phone Number</label>
                                <input
                                    value={data.mpesa_phone}
                                    onChange={(event) => setData('mpesa_phone', event.target.value)}
                                    className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-gray-400"
                                    placeholder="2547XXXXXXXX"
                                    maxLength={12}
                                />
                                <p className="text-xs text-gray-400 mt-1">Enter your M-Pesa phone number (format: 2547XXXXXXXX)</p>
                            </div>
                        )}

                        {/* Bank Transfer Info - only show for Bank */}
                        {data.payment_method === 'bank' && (
                            <div className="p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                                <p className="text-sm text-gray-300 mb-2">Bank Transfer Details:</p>
                                <p className="text-sm text-gray-400">Bank: Equity Bank</p>
                                <p className="text-sm text-gray-400">Account Name: 2B Gamers Entertainment</p>
                                <p className="text-sm text-gray-400">Account Number: 1234567890</p>
                            </div>
                        )}

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-300 mb-4">Customer Information</label>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <input
                                value={data.first_name}
                                onChange={(event) => setData('first_name', event.target.value)}
                                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-gray-400"
                                placeholder="First Name"
                            />
                            <input
                                value={data.last_name}
                                onChange={(event) => setData('last_name', event.target.value)}
                                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-gray-400"
                                placeholder="Last Name"
                            />
                        </div>

                        <input
                            value={data.email}
                            onChange={(event) => setData('email', event.target.value)}
                            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-gray-400"
                            placeholder="Email"
                            type="email"
                        />

                        <input
                            value={data.phone}
                            onChange={(event) => setData('phone', event.target.value)}
                            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-gray-400"
                            placeholder="Phone Number"
                            type="tel"
                        />

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-300 mb-4">Shipping Information</label>
                        </div>

                        <input
                            value={data.line_1}
                            onChange={(event) => setData('line_1', event.target.value)}
                            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-gray-400"
                            placeholder="Address"
                        />
                        <input
                            value={data.line_2}
                            onChange={(event) => setData('line_2', event.target.value)}
                            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-gray-400"
                            placeholder="Apartment / Landmark"
                        />

                        <div className="grid grid-cols-3 gap-3">
                            <input
                                value={data.city}
                                onChange={(event) => setData('city', event.target.value)}
                                className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-gray-400"
                                placeholder="City"
                            />
                            <input
                                value={data.state}
                                onChange={(event) => setData('state', event.target.value)}
                                className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-gray-400"
                                placeholder="County"
                            />
                            <input
                                value={data.postal_code}
                                onChange={(event) => setData('postal_code', event.target.value)}
                                className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-gray-400"
                                placeholder="Postal code"
                            />
                        </div>

                        <input
                            value={data.country}
                            onChange={(event) => setData('country', event.target.value.toUpperCase())}
                            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-gray-400"
                            placeholder="Country code (KE)"
                            maxLength={2}
                        />

                        {(errors.line_1 || errors.city || errors.state || errors.postal_code || errors.country || errors.mpesa_phone) && (
                            <p className="text-sm text-red-600">Please fill all required fields correctly.</p>
                        )}

                        <button
                            disabled={processing}
                            className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-500 disabled:opacity-60"
                        >
                            {processing ? 'Processing...' : `Pay ${formatKes(grandTotal)}`}
                        </button>
                    </form>
                </div>

                <aside className="p-8 md:p-10">
                    <div className="space-y-6">
                        {cart.items.map((item) => (
                            <div key={item.id} className="flex gap-4 border-b border-zinc-700 pb-5">
                                <img
                                    src={item.product.image ?? 'https://placehold.co/92x92'}
                                    alt={item.product.name}
                                    className="h-20 w-20 rounded-lg border border-zinc-700 object-cover"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold text-white">{item.product.name}</p>
                                    <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                                    <p className="text-sm font-medium text-white">{formatKes(Number(item.product.price) * item.quantity)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Subtotal</span>
                            <span className="text-white">{formatKes(total)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Taxes</span>
                            <span className="text-white">{formatKes(tax)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Shipping</span>
                            <span className="text-white">{formatKes(shipping)}</span>
                        </div>
                        <div className="mt-4 flex justify-between border-t border-zinc-700 pt-4 text-base font-semibold">
                            <span className="text-white">Total</span>
                            <span className="text-white">{formatKes(grandTotal)}</span>
                        </div>
                    </div>
                </aside>
            </section>

            <Footer />
        </main>
    );
}
