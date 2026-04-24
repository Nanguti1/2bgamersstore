import { Globe } from 'lucide-react';
import { useState } from 'react';

const tabs = [
    { id: 'featured', label: 'Featured Products' },
    { id: 'setups', label: 'Complete Setups' },
    { id: 'experience', label: 'Store Experience' },
] as const;

export function ProductHeadingSection(): JSX.Element {
    const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['id']>('featured');

    return (
        <section className="bg-gray-950 py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <span className="text-sm font-bold tracking-wide text-orange-500">EXPLORE OUR COLLECTION</span>
                    <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">Premium Gaming Products</h2>
                    <p className="mx-auto mt-5 max-w-2xl text-base text-zinc-300">
                        Visit our store to experience these products firsthand with expert guidance
                    </p>
                </div>

                <div className="mb-10 flex justify-center">
                    <div className="inline-flex rounded-sm border border-zinc-800 bg-zinc-900/80 p-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`rounded-sm px-8 py-4 text-base font-semibold transition ${
                                    activeTab === tab.id
                                        ? 'bg-blue-600 text-white'
                                        : 'text-zinc-400 hover:text-white'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-5 rounded-md border border-blue-500/30 bg-zinc-900/70 p-5 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="inline-flex size-11 items-center justify-center rounded bg-blue-600/20 text-blue-400">
                            <Globe className="size-6" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">Featured Products</p>
                            <p className="mt-1 text-sm text-zinc-400">20 premium gaming products</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 md:justify-end">
                        <div className="rounded bg-[#0B1326] px-4 py-2 text-sm text-zinc-300">
                            Rate: <span className="font-semibold text-white">1 USD ≈ 143 KES</span>
                        </div>
                        <div className="inline-flex overflow-hidden rounded border border-blue-500/40 bg-[#0B1326]">
                            <button type="button" className="bg-blue-600 px-5 py-2 text-sm font-semibold text-white">
                                KES
                            </button>
                            <button type="button" className="px-5 py-2 text-sm font-semibold text-zinc-300">
                                USD
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
