import { useState } from 'react';

const tabs = [
    { id: 'featured', label: 'Featured Products' },
    { id: 'setups', label: 'Complete Setups' },
    { id: 'experience', label: 'Store Experience' },
] as const;

export function ProductHeadingSection(): JSX.Element {
    const [activeTab, setActiveTab] = useState('featured');

    return (
        <section className="bg-gray-950 pt-12 pb-2">
            <div className="mx-auto max-w-screen-2xl px-8 pt-12 pb-2">
                {/* Centered heading */}
                <div className="text-center mb-12">
                    <span className="text-blue-400 font-semibold">EXPLORE OUR COLLECTION</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white">Premium Gaming Products</h2>
                    <p className="text-[#B0B0B0] mt-4 max-w-2xl mx-auto">
                        Visit our store to experience these products firsthand with expert guidance
                    </p>
                </div>

                {/* Tab buttons */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex rounded-sm bg-[#252525] p-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 rounded-sm text-sm md:text-lg font-medium transition ${
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
            </div>
        </section>
    );
}
