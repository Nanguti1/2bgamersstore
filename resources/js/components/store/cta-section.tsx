import { Link } from '@inertiajs/react';

export function CtaSection() {
    return (
        <section className="mx-auto max-w-screen-2xl px-8 py-16">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-blue-600 px-6 py-16 text-center md:py-24 md:px-8">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,#00ff00,transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,#3b82f6,transparent_50%)]" />
                </div>

                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white md:text-4xl">Ready to Level Up?</h2>
                    <p className="mt-4 text-lg text-gray-100">
                        Join thousands of gamers enjoying premium gaming products and exclusive deals
                    </p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <button className="rounded-lg bg-white px-8 py-3 font-semibold text-gray-900 transition hover:bg-gray-100">
                            JOIN OUR NEWSLETTER
                        </button>
                        <Link
                            href="/products"
                            className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10"
                        >
                            SHOP NOW
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
