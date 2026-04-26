import { Footer } from '@/components/store/footer';
import { Navbar } from '@/components/store/navbar';
import { ThinHero } from '@/components/store/thin-hero';
import { Link } from '@inertiajs/react';

export default function StoreInfo({ title }: { title: string }): JSX.Element {
    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100">
            <Navbar />
            <ThinHero title={title} />
            <section className="mx-auto max-w-5xl px-6 py-16 text-center">
                <p className="mx-auto mt-4 max-w-2xl text-zinc-300">
                    This page is now available and connected from the main navigation. More detailed content can be added here anytime.
                </p>
                <Link href="/products" className="mt-8 inline-flex rounded bg-blue-600 px-6 py-3 font-semibold text-white">
                    Browse Products
                </Link>
            </section>
            <Footer />
        </main>
    );
}
