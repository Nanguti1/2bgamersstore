import { CtaSection } from '@/components/store/cta-section';
import { Footer } from '@/components/store/footer';
import { HeroSection } from '@/components/store/hero-section';
import { Navbar } from '@/components/store/navbar';
import { ProductCard } from '@/components/store/product-card';
import { ProductHeadingSection } from '@/components/store/product-heading-section';
import { StatsSection } from '@/components/store/stats-section';
import { TestimonialsSection } from '@/components/store/testimonials-section';
import { Link } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { usePage } from '@inertiajs/react';

interface Testimonial {
    id: number;
    author: string;
    role: string;
    avatar: string;
    content: string;
    rating: number;
}

export default function Home({
    featuredProducts = [],
    testimonials = [],
}: {
    featuredProducts: Array<Record<string, never>>;
    testimonials: Testimonial[];
}): JSX.Element {
    const { props } = usePage();

    // Show success message if redirected from successful checkout
    useEffect(() => {
        const flash = props as any;
        if (flash.flash?.success) {
            toast.success(flash.flash.success);
        }
    }, [props]);
    return (
        <main className="min-h-screen bg-gray-950 text-gray-100">
            <Navbar showHomepageStoreName />
            <HeroSection />

            <StatsSection />
            <ProductHeadingSection />

            <section className="mx-auto max-w-screen-2xl px-8 pt-2 pb-16">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h3 className="text-2xl font-bold md:text-3xl">Featured Products</h3>
                        <p className="mt-2 text-sm text-zinc-400">20 premium gaming products</p>
                    </div>
                    <Link
                        href="/products"
                        className="hidden font-semibold text-blue-400 hover:text-blue-300 md:block"
                    >
                        View All →
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {featuredProducts.map((product) => (
                        <ProductCard key={(product as any).id} product={product as any} />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 font-bold text-white transition hover:shadow-lg hover:shadow-blue-500/50"
                    >
                        Load More Products
                    </Link>
                </div>
            </section>

            <TestimonialsSection testimonials={testimonials} />
            <CtaSection />
            <Footer />
        </main>
    );
}
