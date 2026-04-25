import { Footer } from '@/components/store/footer';
import { Navbar } from '@/components/store/navbar';
import { Link, router } from '@inertiajs/react';

interface CartItem {
    id: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        price: number;
        image: string | null;
        stock: number;
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

export default function CartIndex({ cart, total }: { cart: CartData; total: number }): JSX.Element {
    const shipping = cart.items.length > 0 ? 650 : 0;
    const tax = total * 0.16;
    const orderTotal = total + shipping + tax;

    return (
        <main className="min-h-screen bg-gray-950 text-gray-100">
            <Navbar />
            <section className="mx-auto max-w-screen-2xl px-8 py-16">
                <h1 className="text-4xl font-semibold tracking-tight text-white">Shopping Cart</h1>

                <div className="mt-10 space-y-0 overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900">
                    {cart.items.map((item) => (
                        <div key={item.id} className="grid gap-5 border-b border-zinc-700 p-6 last:border-b-0 md:grid-cols-[120px_1fr_auto] md:items-start">
                            <img
                                src={item.product.image ?? 'https://placehold.co/120x120'}
                                alt={item.product.name}
                                className="h-28 w-28 rounded-xl border border-zinc-700 bg-zinc-800 object-cover"
                            />

                            <div>
                                <h2 className="text-lg font-medium text-white">{item.product.name}</h2>
                                <p className="mt-3 text-sm text-gray-400">
                                    {item.product.stock > 0 ? '✓ In stock' : '• Ships in 3–4 weeks'}
                                </p>
                            </div>

                            <div className="justify-self-start md:justify-self-end">
                                <select
                                    value={item.quantity}
                                    onChange={(event) => {
                                        router.patch(`/cart/${item.id}`, { quantity: Number(event.target.value) }, { preserveScroll: true });
                                    }}
                                    className="w-20 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white"
                                >
                                    {Array.from({ length: 10 }).map((_, index) => (
                                        <option key={index + 1} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={() => router.delete(`/cart/${item.id}`, { preserveScroll: true })}
                                    className="mt-3 block text-sm text-blue-400 hover:text-blue-300"
                                >
                                    Remove
                                </button>
                                <p className="mt-5 text-right text-base font-semibold text-white">{formatKes(Number(item.product.price) * item.quantity)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 ml-auto max-w-xl rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between border-b border-zinc-700 pb-3">
                            <span className="text-gray-400">Subtotal</span>
                            <span className="font-medium text-white">{formatKes(total)}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-zinc-700 pb-3">
                            <span className="text-gray-400">Shipping</span>
                            <span className="font-medium text-white">{formatKes(shipping)}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-zinc-700 pb-3">
                            <span className="text-gray-400">Tax (VAT 16%)</span>
                            <span className="font-medium text-white">{formatKes(tax)}</span>
                        </div>
                        <div className="flex items-center justify-between pt-1 text-base font-semibold">
                            <span className="text-white">Order total</span>
                            <span className="text-white">{formatKes(orderTotal)}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 ml-auto max-w-xl">
                    <Link
                        href="/checkout"
                        className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-500"
                    >
                        Checkout
                    </Link>
                    <Link href="/products" className="mt-4 block text-center text-sm text-blue-400 hover:text-blue-300">
                        Continue Shopping →
                    </Link>
                </div>
            </section>
            <Footer />
        </main>
    );
}
