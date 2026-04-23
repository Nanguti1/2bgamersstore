import { Link } from '@inertiajs/react';
import { ShoppingCart, Swords } from 'lucide-react';

export function Navbar(): JSX.Element {
    return (
        <header className="border-b border-zinc-800 bg-zinc-950/90">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Link href="/" className="flex items-center gap-2 text-blue-400">
                    <Swords className="size-5" />
                    <span className="font-bold">2bgamersstore</span>
                </Link>
                <div className="flex items-center gap-6 text-sm text-zinc-300">
                    <Link href="/products">Products</Link>
                    <Link href="/cart" className="inline-flex items-center gap-2">
                        <ShoppingCart className="size-4" /> Cart
                    </Link>
                </div>
            </nav>
        </header>
    );
}
