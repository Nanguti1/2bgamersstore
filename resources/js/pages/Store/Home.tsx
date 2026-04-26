import { CtaSection } from '@/components/store/cta-section';
import { Footer } from '@/components/store/footer';
import { HeroSection } from '@/components/store/hero-section';
import { Navbar } from '@/components/store/navbar';
import { ProductHeadingSection } from '@/components/store/product-heading-section';
import { StatsSection } from '@/components/store/stats-section';
import { TestimonialsSection } from '@/components/store/testimonials-section';
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

interface FeaturedProduct {
    id: number;
    name: string;
    slug: string;
    price: number;
    image: string | null;
}

export default function Home({
    featuredProducts = [],
    testimonials = [],
}: {
    featuredProducts: FeaturedProduct[];
    testimonials: Testimonial[];
}): JSX.Element {
    const { props } = usePage();

    useEffect(() => {
        const flash = props as { flash?: { success?: string } };
        if (flash.flash?.success) {
            toast.success(flash.flash.success);
        }
    }, [props]);

    return (
        <main className="min-h-screen bg-gray-950 text-gray-100">
            <Navbar showHomepageStoreName />
            <HeroSection />

            <StatsSection />
            <ProductHeadingSection featuredProducts={featuredProducts} />

            <TestimonialsSection testimonials={testimonials} />
            <CtaSection />
            <Footer />
        </main>
    );
}
