import { Link, router } from '@inertiajs/react';
import { ArrowRight, ChevronDown, Gamepad2, Headphones, Laptop, Menu, Monitor, Search, ShoppingCart, X } from 'lucide-react';
import { type FormEvent, useEffect, useState } from 'react';
import { useCart } from '@/contexts/CartContext';

export function Navbar({ showHomepageStoreName = false }: { showHomepageStoreName?: boolean }): JSX.Element {
    const [exploreDropdown, setExploreDropdown] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileExploreOpen, setMobileExploreOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { cartCount, updateCartCount } = useCart();

    useEffect(() => {
        fetch('/cart-count')
            .then((res) => res.json())
            .then((data) => updateCartCount(data.count))
            .catch(() => {});
    }, [updateCartCount]);

    const categories = [
        { name: 'Gaming PCs', icon: Monitor },
        { name: 'Gaming Laptops', icon: Laptop },
        { name: 'Consoles', icon: Gamepad2 },
        { name: 'Gaming Monitors', icon: Monitor },
        { name: 'Gaming Headsets', icon: Headphones },
    ];

    const submitSearch = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        router.get(
            '/products',
            {
                search: searchTerm.trim() === '' ? undefined : searchTerm.trim(),
            },
            {
                preserveState: false,
                preserveScroll: false,
            },
        );
    };

    const closeMobileMenu = (): void => {
        setMobileMenuOpen(false);
        setMobileExploreOpen(false);
    };

    return (
        <>
            <div className="border-b border-blue-100 bg-gradient-to-r from-blue-600 to-blue-500 py-2 text-xs text-white">
                <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-8">
                    <div className="flex items-center gap-4">
                        <span className="font-semibold">VISIT OUR STORE:</span>
                        <span>Luthuli Avenue Gaberone Plaza, First Floor Luthuli Ave, Nairobi</span>
                    </div>
                    <div className="hidden items-center gap-4 md:flex">
                        <span className="rounded bg-yellow-500 px-3 py-1 font-semibold text-black">
                            FREE SETUP CONSULTATION FOR ALL VISITORS!
                        </span>
                    </div>
                </div>
            </div>

            <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
                <nav className="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <div className="flex h-16 items-center justify-between gap-3">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-2xl font-black tracking-tight text-slate-900">{showHomepageStoreName ? '2B Gamers Store' : '2B Gamers'}</span>
                        </Link>

                        <div className="hidden items-center gap-8 lg:flex">
                            <Link href="/" className="font-medium text-slate-600 transition hover:text-slate-900">
                                Home
                            </Link>

                            <div
                                className="relative"
                                onMouseEnter={() => setExploreDropdown(true)}
                                onMouseLeave={() => setExploreDropdown(false)}
                            >
                                <button className="flex items-center gap-1 font-medium text-slate-600 transition hover:text-slate-900">
                                    Explore Products
                                    <ChevronDown className="size-4" />
                                </button>

                                {exploreDropdown && (
                                    <div className="absolute top-full left-0 -mt-0.5 w-72 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl">
                                        {categories.map((category) => {
                                            const Icon = category.icon;

                                            return (
                                                <Link
                                                    key={category.name}
                                                    href={`/products?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                                                    className="flex items-center justify-between border-b border-slate-200 px-4 py-3 transition hover:bg-slate-50 last:border-0"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Icon className="size-5 text-blue-400" />
                                                        <span className="text-slate-700">{category.name}</span>
                                                    </div>
                                                    <ArrowRight className="size-4 text-slate-400" />
                                                </Link>
                                            );
                                        })}
                                        <div className="bg-slate-50 px-4 py-3">
                                            <Link
                                                href="/products"
                                                className="text-sm font-medium text-blue-400 hover:text-blue-300"
                                            >
                                                View all our store →
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link href="/store" className="font-medium text-slate-600 transition hover:text-slate-900">
                                Visit Store
                            </Link>
                            <Link href="/consultation" className="font-medium text-slate-600 transition hover:text-slate-900">
                                Setup Consultation
                            </Link>
                            <Link href="/community" className="font-medium text-slate-600 transition hover:text-slate-900">
                                Community
                            </Link>
                        </div>

                        <div className="flex items-center gap-2 md:gap-4">
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen((open) => !open)}
                                className="rounded-md p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
                                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={mobileMenuOpen}
                            >
                                {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                            </button>
                            <form onSubmit={submitSearch} className="hidden items-center rounded-lg border border-slate-300 bg-slate-50 px-2 md:flex">
                                <Search className="size-4 text-slate-400" />
                                <input
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Search products"
                                    className="w-36 bg-transparent px-2 py-1.5 text-sm text-slate-900 outline-none lg:w-44"
                                />
                            </form>
                            <Link
                                href="/events"
                                className="hidden items-center rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 font-semibold text-white transition hover:shadow-lg hover:shadow-green-500/50 md:inline-flex"
                            >
                                Today's Events
                            </Link>
                            <Link href="/cart" className="relative p-2 text-slate-600 transition hover:text-slate-900">
                                <ShoppingCart className="size-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>

                    <form onSubmit={submitSearch} className="flex pb-4 md:hidden">
                        <div className="flex w-full items-center rounded-lg border border-slate-300 bg-slate-50 px-3">
                            <Search className="size-4 text-slate-400" />
                            <input
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Search products"
                                className="w-full bg-transparent px-2 py-2 text-sm text-slate-900 outline-none"
                            />
                        </div>
                    </form>

                    {mobileMenuOpen && (
                        <div className="space-y-2 border-t border-slate-200 pb-4 lg:hidden">
                            <Link
                                href="/"
                                onClick={closeMobileMenu}
                                className="block rounded-md px-3 py-2 font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                            >
                                Home
                            </Link>

                            <div className="rounded-md bg-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setMobileExploreOpen((open) => !open)}
                                    className="flex w-full items-center justify-between px-3 py-2 font-medium text-slate-700 transition hover:text-slate-900"
                                    aria-expanded={mobileExploreOpen}
                                >
                                    Explore Products
                                    <ChevronDown className={`size-4 transition ${mobileExploreOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {mobileExploreOpen && (
                                    <div className="space-y-1 px-2 pb-2">
                                        {categories.map((category) => {
                                            const Icon = category.icon;

                                            return (
                                                <Link
                                                    key={category.name}
                                                    href={`/products?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                                                    onClick={closeMobileMenu}
                                                    className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-slate-700 transition hover:bg-slate-200 hover:text-slate-900"
                                                >
                                                    <Icon className="size-4 text-blue-400" />
                                                    <span>{category.name}</span>
                                                </Link>
                                            );
                                        })}
                                        <Link
                                            href="/products"
                                            onClick={closeMobileMenu}
                                            className="block px-2 py-2 text-sm font-medium text-blue-400 hover:text-blue-300"
                                        >
                                            View all our store →
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Link
                                href="/store"
                                onClick={closeMobileMenu}
                                className="block rounded-md px-3 py-2 font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                            >
                                Visit Store
                            </Link>
                            <Link
                                href="/consultation"
                                onClick={closeMobileMenu}
                                className="block rounded-md px-3 py-2 font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                            >
                                Setup Consultation
                            </Link>
                            <Link
                                href="/community"
                                onClick={closeMobileMenu}
                                className="block rounded-md px-3 py-2 font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                            >
                                Community
                            </Link>
                            <Link
                                href="/events"
                                onClick={closeMobileMenu}
                                className="block rounded-md bg-gradient-to-r from-green-500 to-green-600 px-3 py-2 font-semibold text-white"
                            >
                                Today's Events
                            </Link>
                        </div>
                    )}
                </nav>
            </header>
        </>
    );
}
