import { Link } from '@inertiajs/react';
import { Facebook, MessageCircle, Instagram, Twitter, Linkedin, Play, Apple } from 'lucide-react';

export function Footer(): JSX.Element {
    return (
        <footer className="bg-zinc-950">
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
                        <h3 className="text-lg font-bold text-white mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-blue-400 transition text-sm">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/account" className="text-gray-400 hover:text-blue-400 transition text-sm">
                                    Account
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-gray-400 hover:text-blue-400 transition text-sm">
                                    Career
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-gray-400 hover:text-blue-400 transition text-sm">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Account Section */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Account</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/help" className="text-gray-400 hover:text-blue-400 transition text-sm">
                                    Help Ticket
                                </Link>
                            </li>
                            <li>
                                <Link href="/track-order" className="text-gray-400 hover:text-blue-400 transition text-sm">
                                    Track My Order
                                </Link>
                            </li>
                            <li>
                                <Link href="/cart" className="text-gray-400 hover:text-blue-400 transition text-sm">
                                    View Cart
                                </Link>
                            </li>
                            <li>
                                <Link href="/wishlist" className="text-gray-400 hover:text-blue-400 transition text-sm">
                                    Wishlist
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Install Apps Section */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Install Apps</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Download App on Mobile: <span className="text-green-400 font-semibold">15% Discount</span>
                        </p>
                        <div className="space-y-3">
                            <a
                                href="#"
                                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg px-4 py-2 transition"
                            >
                                <Play className="size-5" />
                                <div>
                                    <p className="text-xs text-gray-400">GET IT ON</p>
                                    <p className="text-sm font-semibold text-white">Google Play</p>
                                </div>
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg px-4 py-2 transition"
                            >
                                <Apple className="size-5" />
                                <div>
                                    <p className="text-xs text-gray-400">Download on the</p>
                                    <p className="text-sm font-semibold text-white">App Store</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-zinc-800 bg-zinc-900/50">
                <div className="mx-auto max-w-screen-2xl px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <p className="text-sm text-gray-400">
                            Copyright © {new Date().getFullYear()} 2B Gamers Entertainment. All rights reserved.
                        </p>

                        {/* Payment Methods */}
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="font-semibold text-white">Payment:</span>
                            <span>Cash</span>
                            <span className="text-gray-600">|</span>
                            <span>Bank</span>
                            <span className="text-gray-600">|</span>
                            <span className="text-green-400 font-semibold">Mpesa</span>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex items-center gap-3">
                            <a href="https://web.facebook.com/2bgamesent/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition">
                                <Facebook className="size-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-500 transition">
                                <MessageCircle className="size-5" />
                            </a>
                            <a href="https://www.instagram.com/2bgamerssto/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition">
                                <Instagram className="size-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                                <Twitter className="size-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-700 transition">
                                <Linkedin className="size-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
