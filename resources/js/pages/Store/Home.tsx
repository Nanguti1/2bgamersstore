import { Footer } from '@/components/store/footer';
import { HeroSection } from '@/components/store/hero-section';
import { Navbar } from '@/components/store/navbar';
import { ProductCard } from '@/components/store/product-card';
import { StatsSection } from '@/components/store/stats-section';
import { TestimonialsSection } from '@/components/store/testimonials-section';
import { CtaSection } from '@/components/store/cta-section';
import { ProductHeadingSection } from '@/components/store/product-heading-section';
import { Link } from '@inertiajs/react';

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
    return (
        <main className="min-h-screen bg-gray-950 text-gray-100">
            <Navbar />
            <HeroSection />

            {/* Stats Section */}
            <StatsSection />
Product Heading Section */}
            <ProductHeadingSection />

            {/* 
            {/* Featured Products Section */}
            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <p className="text-sm font-semibold text-blue-400">EXPLORE OUR COLLECTION</p>
                        <h2 className="mt-2 text-3xl font-bold md:text-4xl">Premium Gaming Products</h2>
                    </div>
                    <Link
                        href="/products"
                        className="hidden text-blue-400 hover:text-blue-300 font-semibold md:block"
                    >
                        View All →
                    </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {featuredProducts.map((product) => (
                        <ProductCard key={(product as any).id} product={product as any} />
                    ))}
                </div>

                {/* Load More Button */}
                <div className="mt-12 text-center">
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 rounded-lg font-bold text-white transition hover:shadow-lg hover:shadow-blue-500/50"
                    >
                        Load More Products
                    </Link>
                </div>
            </section>

            {/* Testimonials Section */}
            <TestimonialsSection testimonials={testimonials} />

            {/* CTA Section */}
            <CtaSection />

            <Footer />
        </main>
    );
}
