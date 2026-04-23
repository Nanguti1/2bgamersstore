import { Footer } from '@/components/store/footer';
import { HeroSection } from '@/components/store/hero-section';
import { Navbar } from '@/components/store/navbar';
import { ProductCard } from '@/components/store/product-card';

export default function Home({ featuredProducts = [] }: { featuredProducts: Array<Record<string, never>> }): JSX.Element {
    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100">
            <Navbar />
            <HeroSection />
            <section className="mx-auto max-w-7xl px-6 py-14">
                <h2 className="text-3xl font-bold">Featured Products</h2>
                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {featuredProducts.map((product) => <ProductCard key={(product as any).id} product={product as any} />)}
                </div>
            </section>
            <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-14 md:grid-cols-3">
                <div className="rounded-xl bg-zinc-900 p-6">10,000+ Happy Gamers</div>
                <div className="rounded-xl bg-zinc-900 p-6">98% Satisfaction</div>
                <div className="rounded-xl bg-zinc-900 p-6">2-Hour Setup Support</div>
            </section>
            <Footer />
        </main>
    );
}
