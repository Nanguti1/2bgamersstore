import { CtaSection } from '@/components/store/cta-section';
import { Footer } from '@/components/store/footer';
import { HeroSection } from '@/components/store/hero-section';
import { Navbar } from '@/components/store/navbar';
import { ProductHeadingSection } from '@/components/store/product-heading-section';
import { StatsSection } from '@/components/store/stats-section';
import { TestimonialsSection } from '@/components/store/testimonials-section';
import { Head } from '@inertiajs/react';
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
        <>
            <Head>
                <title>2B Gamers Store | Buy Original PS5, PS4 & Gaming Accessories in Kenya</title>
                <meta name="description" content="Shop original PS5, PS4, gaming accessories, and iPhones at best prices in Nairobi, Kenya. Genuine products with warranty. Fast delivery nationwide." />
                <link rel="canonical" href="https://2bgamersstore.co.ke/" />
                <meta property="og:title" content="2B Gamers Store | Buy Original PS5, PS4 & Gaming Accessories in Kenya" />
                <meta property="og:description" content="Shop original PS5, PS4, gaming accessories, and iPhones at best prices in Nairobi, Kenya. Genuine products with warranty." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://2bgamersstore.co.ke/" />
                <meta property="og:image" content="https://2bgamersstore.co.ke/images/og-image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="2B Gamers Store | Buy Original PS5, PS4 & Gaming Accessories in Kenya" />
                <meta name="twitter:description" content="Shop original PS5, PS4, gaming accessories, and iPhones at best prices in Nairobi, Kenya." />
                <meta name="twitter:image" content="https://2bgamersstore.co.ke/images/og-image.jpg" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Organization',
                            name: '2B Gamers Store',
                            url: 'https://2bgamersstore.co.ke',
                            logo: 'https://2bgamersstore.co.ke/images/logo.png',
                            description: 'Leading gaming store in Kenya offering original PS5, PS4, gaming accessories, and iPhones at best prices.',
                            address: {
                                '@type': 'PostalAddress',
                                addressLocality: 'Nairobi',
                                addressCountry: 'KE',
                            },
                        }),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            name: '2B Gamers Store',
                            url: 'https://2bgamersstore.co.ke',
                            description: 'Shop original gaming consoles and accessories in Kenya',
                            potentialAction: {
                                '@type': 'SearchAction',
                                target: 'https://2bgamersstore.co.ke/products?search={search_term_string}',
                                'query-input': 'required name=search_term_string',
                            },
                        }),
                    }}
                />
            </Head>
            <main className="min-h-screen bg-slate-50 text-slate-900">
                <Navbar showHomepageStoreName />
                <HeroSection />

                <StatsSection />
                <ProductHeadingSection featuredProducts={featuredProducts} />

                <TestimonialsSection testimonials={testimonials} />
                <CtaSection />
                <Footer />
            </main>
        </>
    );
}
