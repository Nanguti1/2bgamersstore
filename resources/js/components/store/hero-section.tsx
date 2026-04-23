import { Link } from '@inertiajs/react';

export function HeroSection(): JSX.Element {
    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-zinc-950 via-zinc-900 to-blue-950 px-6 py-20">
            <div className="mx-auto max-w-7xl">
                <p className="text-sm uppercase tracking-[0.2em] text-blue-400">Premium Gaming Gear</p>
                <h1 className="mt-4 max-w-3xl text-5xl font-black text-white">Your Ultimate Gaming Destination</h1>
                <p className="mt-4 max-w-2xl text-zinc-300">Discover consoles, accessories, and legendary titles curated for serious players.</p>
                <div className="mt-8 flex gap-4">
                    <Link href="/products" className="rounded-md bg-blue-600 px-5 py-3 font-semibold text-white">Visit Store</Link>
                    <Link href="/checkout" className="rounded-md border border-zinc-600 px-5 py-3 font-semibold text-zinc-100">Setup Consultation</Link>
                </div>
            </div>
        </section>
    );
}
