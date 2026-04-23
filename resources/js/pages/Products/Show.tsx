import { Link } from '@inertiajs/react';
import { Footer } from '@/components/store/footer';
import { Navbar } from '@/components/store/navbar';

export default function ProductShow({ product }: { product: any }): JSX.Element {
    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100">
            <Navbar />
            <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-2">
                <img src={product.image ?? 'https://placehold.co/700x500'} alt={product.name} className="w-full rounded-xl object-cover" />
                <div>
                    <h1 className="text-4xl font-bold">{product.name}</h1>
                    <p className="mt-3 text-zinc-300">{product.description}</p>
                    <p className="mt-4 text-2xl font-semibold text-blue-400">${product.price}</p>
                    <Link href="/cart" className="mt-6 inline-block rounded bg-blue-600 px-4 py-2">Go to Cart</Link>
                </div>
            </section>
            <Footer />
        </main>
    );
}
