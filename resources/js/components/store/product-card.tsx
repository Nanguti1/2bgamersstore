import { Link, router } from '@inertiajs/react';
import { Heart, MessageCircle, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

type Product = {
    id: number;
    name: string;
    slug: string;
    price: number;
    image: string | null;
};

const formatKes = (value: number): string => {
    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        minimumFractionDigits: 2,
    }).format(value);
};

export function ProductCard({ product }: { product: Product }): JSX.Element {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const { incrementCart } = useCart();

    const handleInquire = () => {
        const message = `Hi, I'm interested in ${product.name}. Can you provide more details?`;
        const whatsappUrl = `https://wa.me/254702898605?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleAddToCart = () => {
        setIsAdding(true);
        router.post(
            '/cart',
            { product_id: product.id, quantity: 1 },
            {
                onFinish: () => {
                    setIsAdding(false);
                    incrementCart();
                },
                preserveScroll: true,
                onError: () => {
                    window.location.href = '/login';
                },
            },
        );
    };

    return (
        <article className="group relative overflow-hidden rounded-lg border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-950 transition hover:border-blue-500/50">
            <div className="relative overflow-hidden bg-gray-800">
                <img
                    src={product.image ?? 'https://placehold.co/400x300'}
                    alt={product.name}
                    className="h-48 w-full object-cover transition duration-300 group-hover:scale-110"
                />

                <div className="absolute top-3 right-3 rounded-full bg-red-500/90 px-3 py-1 text-xs font-semibold text-white">
                    Sale
                </div>

                <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="absolute top-3 left-3 rounded-full bg-gray-900/80 p-2 transition hover:bg-gray-900"
                >
                    <Heart
                        className={`h-5 w-5 transition ${
                            isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-300'
                        }`}
                    />
                </button>
            </div>

            <div className="p-4">
                <h3 className="line-clamp-2 font-semibold text-white transition group-hover:text-blue-400">
                    {product.name}
                </h3>

                <div className="mt-3 flex items-center gap-2">
                    <span className="text-lg font-bold text-green-400">{formatKes(Number(product.price))}</span>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                    <Link
                        href={`/products/${product.slug}`}
                        className="w-full rounded-lg border border-blue-500 bg-transparent px-3 py-2 text-center text-sm font-semibold text-blue-400 transition hover:bg-blue-500/10"
                    >
                        View Details
                    </Link>
                    <div className="flex gap-2">
                        <button
                            onClick={handleInquire}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                        >
                            <MessageCircle className="h-4 w-4" />
                            <span className="hidden sm:inline">Inquire</span>
                        </button>
                        <button
                            onClick={handleAddToCart}
                            disabled={isAdding}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            <span className="hidden sm:inline">{isAdding ? 'Adding...' : 'Add to Cart'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
