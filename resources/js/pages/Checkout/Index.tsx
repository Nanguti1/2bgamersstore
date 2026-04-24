import { Footer } from '@/components/store/footer';
import { Navbar } from '@/components/store/navbar';
import { useForm } from '@inertiajs/react';

export default function CheckoutIndex({ total }: { total: number }): JSX.Element {
    const { data, setData, post } = useForm({ line_1: '', line_2: '', city: '', state: '', postal_code: '', country: 'US' });

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100">
            <Navbar />
            <section className="mx-auto max-w-7xl px-6 py-12">
                <h1 className="text-3xl font-bold">Checkout</h1>
                <p className="mt-2">Order Total: ${total.toFixed(2)}</p>
                <form onSubmit={(event) => { event.preventDefault(); post('/checkout'); }} className="mt-6 grid max-w-2xl gap-3">
                    {Object.entries(data).map(([key, value]) => (
                        <input key={key} value={value} onChange={(event) => setData(key as any, event.target.value)} className="rounded border border-zinc-700 bg-zinc-900 p-3" placeholder={key} />
                    ))}
                    <button className="rounded bg-blue-600 px-4 py-2">Place Order</button>
                </form>
            </section>
            <Footer />
        </main>
    );
}
