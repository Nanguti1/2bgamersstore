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
                <title>Buy PS5, PS4 & Gaming Accessories in Kenya | 2B Gamers</title>
                <meta name="description" content="Shop authentic PS5, PS4, gaming consoles, and accessories at Kenya's best prices. Original products with warranty. Fast nationwide delivery. Expert gaming gear in Nairobi, Mombasa & beyond." />
                <meta name="keywords" content="PS5 Kenya, PS4 Kenya, gaming accessories, console gaming, Nairobi gaming store" />
                <link rel="canonical" href="https://2bgamersstore.co.ke/" />
                <meta property="og:title" content="Buy PS5, PS4 & Gaming Accessories in Kenya | 2B Gamers" />
                <meta property="og:description" content="Shop authentic gaming consoles and accessories. Original PS5, PS4 at best prices in Kenya. Fast delivery nationwide." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://2bgamersstore.co.ke/" />
                <meta property="og:image" content="https://2bgamersstore.co.ke/images/og-image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Buy PS5, PS4 & Gaming Accessories in Kenya | 2B Gamers" />
                <meta name="twitter:description" content="Authentic gaming consoles and accessories. PS5, PS4 at best Kenya prices with fast delivery." />
                <meta name="twitter:image" content="https://2bgamersstore.co.ke/images/og-image.jpg" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'LocalBusiness',
                            name: '2B Gamers Store',
                            url: 'https://2bgamersstore.co.ke',
                            logo: 'https://2bgamersstore.co.ke/images/logo.png',
                            description: 'Kenya\'s leading gaming store offering authentic PS5, PS4, gaming consoles, and accessories at best prices.',
                            telephone: '+254700000000',
                            address: {
                                '@type': 'PostalAddress',
                                streetAddress: 'Nairobi',
                                addressLocality: 'Nairobi',
                                addressRegion: 'Nairobi',
                                addressCountry: 'KE',
                            },
                            geo: {
                                '@type': 'GeoCoordinates',
                                latitude: '-1.2921',
                                longitude: '36.8219',
                            },
                            areaServed: {
                                '@type': 'Country',
                                name: 'KE',
                            },
                            priceRange: 'KES 5000 - KES 500000',
                            image: 'https://2bgamersstore.co.ke/images/logo.png',
                            sameAs: [
                                'https://www.facebook.com/2bgamersstore',
                                'https://www.instagram.com/2bgamersstore',
                                'https://www.twitter.com/2bgamersstore',
                            ],
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
                            description: 'Shop authentic gaming consoles and accessories in Kenya',
                            potentialAction: {
                                '@type': 'SearchAction',
                                target: 'https://2bgamersstore.co.ke/products?search={search_term_string}',
                                'query-input': 'required name=search_term_string',
                            },
                        }),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'BreadcrumbList',
                            itemListElement: [
                                {
                                    '@type': 'ListItem',
                                    position: 1,
                                    name: 'Home',
                                    item: 'https://2bgamersstore.co.ke',
                                },
                            ],
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
