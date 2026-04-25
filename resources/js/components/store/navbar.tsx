import { Link } from '@inertiajs/react';
import { ShoppingCart, Search, ChevronDown, Monitor, Laptop, Gamepad2, Headphones, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export function Navbar(): JSX.Element {
    const [exploreDropdown, setExploreDropdown] = useState(false);

    const categories = [
        { name: 'Gaming PCs', icon: Monitor },
        { name: 'Gaming Laptops', icon: Laptop },
        { name: 'Consoles', icon: Gamepad2 },
        { name: 'Gaming Monitors', icon: Monitor },
        { name: 'Gaming Headsets', icon: Headphones },
    ];

    return (
        <>
            {/* Top Bar */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white text-xs py-2">
                <div className="mx-auto max-w-screen-2xl px-8 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <span className="font-semibold">VISIT OUR STORE:</span>
                        <span>Luthuli Avenue Gaberone Plaza, First Floor Luthuli Ave, Nairobi</span>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <span className="bg-yellow-500 text-black px-3 py-1 rounded font-semibold">
                            FREE SETUP CONSULTATION FOR ALL VISITORS!
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <header className="border-b border-zinc-800 bg-zinc-950 sticky top-0 z-50">
                <nav className="mx-auto max-w-screen-2xl px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-2xl font-black text-white tracking-tight">2B Gamers</span>
                        </Link>

                        {/* Navigation Links */}
                        <div className="hidden lg:flex items-center gap-8">
                            <Link href="/" className="text-gray-300 hover:text-white transition font-medium">
                                Home
                            </Link>

                            {/* Explore Products Dropdown */}
                            <div 
                                className="relative"
                                onMouseEnter={() => setExploreDropdown(true)}
                                onMouseLeave={() => setExploreDropdown(false)}
                            >
                                <button className="flex items-center gap-1 text-gray-300 hover:text-white transition font-medium">
                                    Explore Products
                                    <ChevronDown className="size-4" />
                                </button>

                                {exploreDropdown && (
                                    <div className="absolute top-full left-0 mt-2 w-72 bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl overflow-hidden">
                                        {categories.map((category) => {
                                            const Icon = category.icon;
                                            return (
                                                <Link
                                                    key={category.name}
                                                    href={`/products?category=${category.name.toLowerCase().replace(' ', '-')}`}
                                                    className="flex items-center justify-between px-4 py-3 hover:bg-zinc-800 transition border-b border-zinc-800 last:border-0"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Icon className="size-5 text-blue-400" />
                                                        <span className="text-gray-300">{category.name}</span>
                                                    </div>
                                                    <ArrowRight className="size-4 text-gray-500" />
                                                </Link>
                                            );
                                        })}
                                        <div className="px-4 py-3 bg-zinc-800/50">
                                            <Link
                                                href="/products"
                                                className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                                            >
                                                View all our store →
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link href="/store" className="text-gray-300 hover:text-white transition font-medium">
                                Visit Store
                            </Link>
                            <Link href="/consultation" className="text-gray-300 hover:text-white transition font-medium">
                                Setup Consultation
                            </Link>
                            <Link href="/community" className="text-gray-300 hover:text-white transition font-medium">
                                Community
                            </Link>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-4">
                            <button className="p-2 text-gray-300 hover:text-white transition">
                                <Search className="size-5" />
                            </button>
                            <Link
                                href="/events"
                                className="hidden md:inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition"
                            >
                                Today's Events
                            </Link>
                            <Link href="/cart" className="relative p-2 text-gray-300 hover:text-white transition">
                                <ShoppingCart className="size-5" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    0
                                </span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}
