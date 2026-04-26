import { Link } from '@inertiajs/react';
import { Box, Gamepad2, Gift, Monitor, Shield, Trophy } from 'lucide-react';
import { ProductCard } from '@/components/store/product-card';
import { useMemo, useState } from 'react';

type Product = {
    id: number;
    name: string;
    slug: string;
    price: number;
    image: string | null;
};

const tabs = [
    { id: 'featured', label: 'Featured Products' },
    { id: 'setups', label: 'Complete Setups' },
    { id: 'experience', label: 'Store Experience' },
] as const;

const setups = [
    {
        icon: Monitor,
        title: 'Streamer Pro Setup',
        price: 'From KES 2,499',
        features: ['4K Webcam', 'Studio Mic', 'Stream Deck', 'RGB Lighting'],
    },
    {
        icon: Trophy,
        title: 'Competitive Esports',
        price: 'From KES 1,899',
        features: ['240Hz Monitor', 'Mechanical Keyboard', 'Pro Gaming Mouse', 'Noise-Cancelling'],
    },
    {
        icon: Gamepad2,
        title: 'Premium Casual',
        price: 'From KES 999',
        features: ['Gaming Console', 'Surround Sound', 'Comfort Chair', '4K Display'],
    },
] as const;

const storeHighlights = [
    {
        icon: Shield,
        title: 'Expert Advice',
        description: 'Get personalized setup recommendations from gaming experts',
    },
    {
        icon: Gift,
        title: 'Free Setup Demo',
        description: 'Try before you buy with our in-store demo stations',
    },
    {
        icon: Trophy,
        title: 'Pro Gamer Events',
        description: 'Exclusive tournaments and meetups at our store',
    },
    {
        icon: Box,
        title: 'Same-Day Pickup',
        description: 'Reserve online, pick up in-store within hours',
    },
] as const;

export function ProductHeadingSection({ featuredProducts }: { featuredProducts: Product[] }): JSX.Element {
    const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['id']>('featured');

    const featuredLabel = useMemo(() => {
        return `${featuredProducts.length} premium gaming products`;
    }, [featuredProducts.length]);

    return (
        <section className="bg-gray-950 pt-12 pb-8">
            <div className="mx-auto max-w-screen-2xl px-5 py-8 md:px-8">
                <div className="mb-9 text-center">
                    <span className="text-base font-semibold text-orange-500">EXPLORE OUR COLLECTION</span>
                    <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">Premium Gaming Products</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-300">
                        Visit our store to experience these products firsthand with expert guidance
                    </p>
                </div>

                <div className="mb-10 flex justify-center">
                    <div className="inline-flex rounded-sm bg-[#252525] p-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`rounded-sm px-5 py-3 text-sm font-medium transition md:px-8 md:text-base ${
                                    activeTab === tab.id
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {activeTab === 'featured' && (
                    <div>
                        <div className="mb-8 rounded-sm border border-[#143360] bg-[#1f1f21] px-5 py-6">
                            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                                <div className="flex items-start gap-4">
                                    <div className="rounded bg-[#0a59ff1a] p-3 text-blue-500">
                                        <Gamepad2 className="size-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">Featured Products</h3>
                                        <p className="text-sm text-zinc-300">{featuredLabel}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 self-stretch md:self-auto">
                                    <div className="rounded-sm bg-[#09152c] px-4 py-2 text-sm text-zinc-300">
                                        Rate: <span className="font-semibold text-white">1 USD ≈ 143 KES</span>
                                    </div>
                                    <div className="flex rounded-sm border border-[#21457a] bg-[#0e1320] p-1 text-sm">
                                        <span className="rounded-sm bg-blue-600 px-4 py-2 font-semibold text-white">KES</span>
                                        <span className="px-4 py-2 text-zinc-400">USD</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <Link
                                href="/products"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-blue-500/50"
                            >
                                Load More Products
                            </Link>
                        </div>
                    </div>
                )}

                {activeTab === 'setups' && (
                    <div className="grid gap-6 lg:grid-cols-3">
                        {setups.map((setup) => {
                            const Icon = setup.icon;

                            return (
                                <article key={setup.title} className="rounded-sm border border-[#184b97] bg-[#1f1f21] p-8">
                                    <Icon className="size-10 text-blue-500" />
                                    <h3 className="mt-8 text-2xl font-semibold text-white">{setup.title}</h3>
                                    <p className="mt-4 text-xl font-semibold text-orange-500">{setup.price}</p>
                                    <ul className="mt-8 space-y-4 text-zinc-300">
                                        {setup.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-3 text-base">
                                                <span className="text-blue-500">✓</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href="/consultation"
                                        className="mt-10 inline-flex w-full items-center justify-center rounded bg-[#142f57] px-4 py-3 text-base font-semibold text-blue-500 transition hover:bg-[#1c3e72]"
                                    >
                                        BOOK SETUP CONSULTATION
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                )}

                {activeTab === 'experience' && (
                    <div className="rounded-sm bg-[#1f1f21] px-8 py-14">
                        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                            {storeHighlights.map((highlight) => {
                                const Icon = highlight.icon;

                                return (
                                    <article key={highlight.title} className="text-center">
                                        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#15305b]">
                                            <Icon className="size-9 text-zinc-200" />
                                        </div>
                                        <h3 className="mt-6 text-2xl font-semibold text-white">{highlight.title}</h3>
                                        <p className="mt-4 text-base text-zinc-300">{highlight.description}</p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
