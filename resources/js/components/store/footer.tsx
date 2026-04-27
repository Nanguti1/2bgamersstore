import { Link } from '@inertiajs/react';
import { Facebook, MessageCircle, Instagram, Twitter, Linkedin, Play, Apple } from 'lucide-react';

export function Footer(): JSX.Element {
    return (
        <footer className="border-t border-slate-200 bg-slate-100">
            {/* Main Footer Section */}
            <div className="mx-auto max-w-screen-2xl px-8 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* About Section - Blue Background */}
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white">
                        <h3 className="text-xl font-bold mb-4">2B Gamers Store</h3>
                        <p className="text-sm text-blue-100 leading-relaxed mb-4">
                            Your ultimate gaming destination in Kenya. We offer premium gaming products, professional setup consultations, and exceptional customer service.
                        </p>
                        <div className="space-y-2 text-sm">
                            <p className="font-semibold">Our Location:</p>
                            <p className="text-blue-100">
                                Luthuli Avenue Gaberone Plaza,<br />
                                First Floor Luthuli Ave, Nairobi
                            </p>
                        </div>
                    </div>

                    {/* Company Section */}
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-slate-900">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-sm text-slate-600 transition hover:text-blue-600">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/account" className="text-sm text-slate-600 transition hover:text-blue-600">
                                    Account
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-sm text-slate-600 transition hover:text-blue-600">
                                    Career
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-sm text-slate-600 transition hover:text-blue-600">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Account Section */}
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-slate-900">Account</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/help" className="text-sm text-slate-600 transition hover:text-blue-600">
                                    Help Ticket
                                </Link>
                            </li>
                            <li>
                                <Link href="/track-order" className="text-sm text-slate-600 transition hover:text-blue-600">
                                    Track My Order
                                </Link>
                            </li>
                            <li>
                                <Link href="/cart" className="text-sm text-slate-600 transition hover:text-blue-600">
                                    View Cart
                                </Link>
                            </li>
                            <li>
                                <Link href="/wishlist" className="text-sm text-slate-600 transition hover:text-blue-600">
                                    Wishlist
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Install Apps Section */}
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-slate-900">Install Apps</h3>
                        <p className="mb-4 text-sm text-slate-600">
                            Download App on Mobile: <span className="text-green-400 font-semibold">15% Discount</span>
                        </p>
                        <div className="space-y-3">
                            <a
                                href="#"
                                className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 transition hover:bg-slate-50"
                            >
                                <Play className="size-5" />
                                <div>
                                    <p className="text-xs text-slate-500">GET IT ON</p>
                                    <p className="text-sm font-semibold text-slate-900">Google Play</p>
                                </div>
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 transition hover:bg-slate-50"
                            >
                                <Apple className="size-5" />
                                <div>
                                    <p className="text-xs text-slate-500">Download on the</p>
                                    <p className="text-sm font-semibold text-slate-900">App Store</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-slate-200 bg-white">
                <div className="mx-auto max-w-screen-2xl px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <p className="text-sm text-slate-500">
                            Copyright © {new Date().getFullYear()} 2B Gamers Entertainment. All rights reserved.
                        </p>

                        {/* Payment Methods */}
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span className="font-semibold text-slate-900">Payment:</span>
                            <span>Cash</span>
                            <span className="text-slate-400">|</span>
                            <span>Bank</span>
                            <span className="text-slate-400">|</span>
                            <span className="text-green-400 font-semibold">Mpesa</span>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex items-center gap-3">
                            <a href="https://web.facebook.com/2bgamesent/" target="_blank" rel="noopener noreferrer" className="text-slate-500 transition hover:text-blue-500">
                                <Facebook className="size-5" />
                            </a>
                            <a href="#" className="text-slate-500 transition hover:text-green-500">
                                <MessageCircle className="size-5" />
                            </a>
                            <a href="https://www.instagram.com/2bgamerssto/" target="_blank" rel="noopener noreferrer" className="text-slate-500 transition hover:text-pink-500">
                                <Instagram className="size-5" />
                            </a>
                            <a href="#" className="text-slate-500 transition hover:text-blue-400">
                                <Twitter className="size-5" />
                            </a>
                            <a href="#" className="text-slate-500 transition hover:text-blue-700">
                                <Linkedin className="size-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
