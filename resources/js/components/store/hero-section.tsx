import { Link } from '@inertiajs/react';
import { Play, Shield, Award } from 'lucide-react';

export function HeroSection(): JSX.Element {
    return (
        <section className="relative h-screen min-h-[600px] overflow-hidden">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/banners/2b-gamers-store-hero-banner-ps5.jpg')" }}
            />
            {/* Light overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-blue-50/80 to-white/60" />

            <div className="relative z-10 h-full flex items-center mx-auto px-8">
                <div className="w-full max-w-screen-2xl mx-auto">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        {/* Left side - Content */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    KENYA'S #1 GAMING STORE
                                </span>
                                <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    SINCE 2016
                                </span>
                            </div>

                            <p className="mb-2 text-sm font-semibold tracking-[0.3em] text-blue-600 uppercase">
                                Your Ultimate
                            </p>
                            <h1 className="text-4xl leading-tight font-black text-slate-900 md:text-5xl lg:text-6xl">
                                Gaming
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                                    Destination
                                </span>
                            </h1>

                            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-700">
                                Discover Nairobi's premier gaming hub. From high-performance PCs to the latest consoles, we have everything you need to level up your gaming experience.
                            </p>

                            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                                <Link
                                    href="/store"
                                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 rounded-lg font-bold text-white transition hover:shadow-lg hover:shadow-blue-500/50"
                                >
                                    VISIT OUR STORE
                                </Link>
                                <button className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-slate-300 px-8 py-4 font-semibold text-slate-700 transition hover:bg-white/70">
                                    <Play className="size-5 fill-slate-700" />
                                    Watch Video
                                </button>
                            </div>

                            <div className="mt-10 flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Shield className="size-5 text-green-400" />
                                    <span className="text-sm text-slate-600">Authorized Dealer</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Award className="size-5 text-yellow-400" />
                                    <span className="text-sm text-slate-600">Award Winning</span>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Trust Card */}
                        <div className="hidden lg:flex justify-center">
                            <div className="max-w-md rounded-2xl border border-slate-200 bg-white/90 p-8 shadow-2xl backdrop-blur">
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4">
                                        <span className="text-3xl font-black text-white">10K+</span>
                                    </div>
                                    <h3 className="mb-2 text-2xl font-bold text-slate-900">
                                        Trusted by Gamers
                                    </h3>
                                    <p className="mb-6 text-slate-600">
                                        Join thousands of satisfied customers who trust us for their gaming needs
                                    </p>
                                    <div className="flex justify-center gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <svg
                                                key={i}
                                                className="w-6 h-6 fill-yellow-400 text-yellow-400"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="mt-2 text-sm text-slate-500">4.9/5 Customer Rating</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
