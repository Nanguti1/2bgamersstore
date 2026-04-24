import { useState } from 'react';

export function ProductHeadingSection(): JSX.Element {
    const [activeTab, setActiveTab] = useState('featured');

    return (
        <section className="bg-gray-950 py-12">
            <div className="mx-auto max-w-7xl px-6">
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
                        <button
                            onClick={() => setActiveTab('featured')}
                            className={`px-6 py-3 rounded-sm text-sm md:text-lg font-medium transition ${
                                activeTab === 'featured'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            Featured Products
                        </button>
                        <button
                            onClick={() => setActiveTab('setups')}
                            className={`px-6 py-3 rounded-sm text-sm md:text-lg font-medium transition ${
                                activeTab === 'setups'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            Complete Setups
                        </button>
                        <button
                            onClick={() => setActiveTab('experience')}
                            className={`px-6 py-3 rounded-sm text-sm md:text-lg font-medium transition ${
                                activeTab === 'experience'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            Store Experience
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
