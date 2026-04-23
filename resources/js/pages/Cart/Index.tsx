import { Link } from '@inertiajs/react';

export default function CartIndex({ cart, total }: { cart: any; total: number }): JSX.Element {
    return (
        <main className="min-h-screen bg-zinc-950 px-6 py-12 text-zinc-100">
            <h1 className="text-3xl font-bold">Your Cart</h1>
            <div className="mt-6 space-y-4">
                {cart.items.map((item: any) => (
                    <div key={item.id} className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                        {item.product.name} × {item.quantity}
                    </div>
                ))}
            </div>
            <p className="mt-6 text-xl">Total: ${total.toFixed(2)}</p>
            <Link href="/checkout" className="mt-4 inline-block rounded bg-blue-600 px-4 py-2">Proceed to Checkout</Link>
        </main>
    );
}
