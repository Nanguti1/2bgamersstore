import { Footer } from '@/components/store/footer';
import { Navbar } from '@/components/store/navbar';
import { ThinHero } from '@/components/store/thin-hero';
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
    const shipping = 0;
    const orderTotal = total;
    const hasItems = cart.items.length > 0;

    return (
        <main className="min-h-screen bg-[#f4f4f5] text-[#111827]">
            <Navbar />
            <ThinHero title="Shopping Cart" />
            <section className="mx-auto max-w-screen-2xl px-8 py-16">
                <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    {hasItems ? cart.items.map((item) => (
                        <div key={item.id} className="grid gap-5 border-b border-slate-200 p-6 last:border-b-0 md:grid-cols-[120px_1fr_auto] md:items-start">
                            <img
                                src={item.product.image ?? 'https://placehold.co/120x120'}
                                alt={item.product.name}
                                className="h-28 w-28 rounded-xl border border-slate-200 bg-slate-50 object-cover"
                            />

                            <div>
                                <h2 className="text-lg font-medium text-slate-900">{item.product.name}</h2>
                                <p className="mt-3 text-sm text-slate-500">
                                    {item.product.stock > 0 ? '✓ In stock' : '• Ships in 3–4 weeks'}
                                </p>
                            </div>

                            <div className="justify-self-start md:justify-self-end">
                                <select
                                    value={item.quantity}
                                    onChange={(event) => {
                                        router.patch(`/cart/${item.id}`, { quantity: Number(event.target.value) }, { preserveScroll: true });
                                    }}
                                    className="w-20 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900"
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
                                    className="mt-3 block text-sm text-blue-600 hover:text-blue-500"
                                >
                                    Remove
                                </button>
                                <p className="mt-5 text-right text-base font-semibold text-slate-900">{formatKes(Number(item.product.price) * item.quantity)}</p>
                            </div>
                        </div>
                    )) : (
                        <div className="p-10 text-center">
                            <p className="text-lg font-medium text-slate-900">No products in your cart.</p>
                            <Link href="/products" className="mt-3 inline-block text-blue-600 hover:text-blue-500">
                                Continue Shopping →
                            </Link>
                        </div>
                    )}
                </div>

                <div className="mt-8 ml-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                            <span className="text-slate-500">Subtotal</span>
                            <span className="font-medium text-slate-900">{formatKes(total)}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                            <span className="text-slate-500">Shipping</span>
                            <span className="font-medium text-slate-900">{formatKes(shipping)}</span>
                        </div>
                        <div className="flex items-center justify-between pt-1 text-base font-semibold">
                            <span className="text-slate-900">Order total</span>
                            <span className="text-slate-900">{formatKes(orderTotal)}</span>
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-slate-500">VAT is included in listed product prices.</p>
                    <p className="mt-1 text-xs text-slate-500">Shipping fee: Outside Nairobi CBD is KES 350. Free delivery within CBD.</p>
                </div>

                <div className="mt-8 ml-auto max-w-xl">
                    {hasItems && (
                        <Link
                            href="/checkout"
                            className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-500"
                        >
                            Checkout
                        </Link>
                    )}
                    <Link href="/products" className="mt-4 block text-center text-sm text-blue-400 hover:text-blue-300">
                        Continue Shopping →
                    </Link>
                </div>
            </section>
            <Footer />
        </main>
    );
}
