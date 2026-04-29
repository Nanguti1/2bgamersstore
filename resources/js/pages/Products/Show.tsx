import { Footer } from '@/components/store/footer';
import { Navbar } from '@/components/store/navbar';
import { Link, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { useCart } from '@/contexts/CartContext';

interface Review {
    id: number;
    rating: number;
    comment: string;
    created_at: string;
    user: {
        id: number;
        name: string;
    };
}

interface ProductVariant {
    id: number;
    name: string;
    sku: string;
    price: number;
    stock: number;
    is_active: boolean;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    specifications?: string | null;
    price: number;
    image: string | null;
    gallery?: string[] | null;
    variants?: ProductVariant[];
}

interface RelatedProduct {
    id: number;
    name: string;
    slug: string;
    price: number;
    image: string | null;
}

const formatKes = (value: number): string => {
    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        minimumFractionDigits: 2,
    }).format(value);
};

export default function ProductShow({
    product,
    reviews,
    reviewStats,
    relatedProducts,
}: {
    product: Product;
    reviews: Review[];
    reviewStats: { average_rating: number; total_reviews: number };
    relatedProducts: RelatedProduct[];
}): JSX.Element {
    const addToCartForm = useForm({ product_id: product.id, quantity: 1, variant_id: null as number | null });
    const reviewForm = useForm({ rating: 5, comment: '' });
    const { incrementCart } = useCart();
    const [activeImage, setActiveImage] = useState(product.image || 'https://placehold.co/700x500');
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [activeTab, setActiveTab] = useState('description');

    const productImages = useMemo(() => {
        const images = [product.image, ...(product.gallery ?? [])].filter((image): image is string => Boolean(image));
        return images.length > 0 ? images : ['https://placehold.co/700x500'];
    }, [product.gallery, product.image]);

    const currentPrice = selectedVariant ? selectedVariant.price : product.price;

    const renderStars = (rating: number): JSX.Element => {
        return (
            <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>{star <= rating ? '★' : '☆'}</span>
                ))}
            </div>
        );
    };

    return (
        <main className="min-h-screen bg-slate-100 text-slate-900">
            <Navbar />

            <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
                <div className="grid gap-12 md:grid-cols-2">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                            <img src={activeImage} alt={product.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            {productImages.map((image, index) => (
                                <button
                                    key={`${image}-${index}`}
                                    type="button"
                                    onClick={() => setActiveImage(image)}
                                    className={`overflow-hidden rounded-lg border-2 ${
                                        activeImage === image ? 'border-blue-600' : 'border-slate-200'
                                    }`}
                                >
                                    <img src={image} alt={`${product.name} ${index + 1}`} className="h-20 w-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
                            <div className="mt-2 flex items-center gap-2">
                                {renderStars(reviewStats.average_rating)}
                                <span className="text-sm text-slate-600">
                                    ({reviewStats.total_reviews} reviews)
                                </span>
                            </div>
                        </div>

                        <div className="text-4xl font-bold text-blue-600">{formatKes(currentPrice)}</div>

                        <p className="text-slate-600">{product.description}</p>

                        {/* Variant Selection */}
                        {product.variants && product.variants.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-slate-900">Select Variant</h3>
                                <div className="grid gap-2">
                                    {product.variants
                                        .filter((v) => v.is_active)
                                        .map((variant) => (
                                            <button
                                                key={variant.id}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedVariant(variant);
                                                    addToCartForm.setData('variant_id', variant.id);
                                                }}
                                                className={`rounded-lg border-2 p-4 text-left transition ${
                                                    selectedVariant?.id === variant.id
                                                        ? 'border-blue-600 bg-blue-50'
                                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                                }`}
                                            >
                                                <div className="flex justify-between">
                                                    <span className="font-medium text-slate-900">{variant.name}</span>
                                                    <span className="font-semibold text-slate-900">{formatKes(variant.price)}</span>
                                                </div>
                                                <div className="mt-1 text-sm text-slate-600">
                                                    SKU: {variant.sku} • Stock: {variant.stock}
                                                </div>
                                            </button>
                                        ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity and Add to Cart */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center rounded-lg border border-slate-300 bg-white">
                                <button
                                    type="button"
                                    onClick={() => addToCartForm.setData('quantity', Math.max(1, addToCartForm.data.quantity - 1))}
                                    className="px-4 py-3 text-xl font-semibold text-slate-900 hover:bg-slate-50"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    min={1}
                                    max={10}
                                    value={addToCartForm.data.quantity}
                                    onChange={(event) => addToCartForm.setData('quantity', Number(event.target.value))}
                                    className="w-16 bg-transparent text-center text-lg font-semibold text-slate-900 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => addToCartForm.setData('quantity', Math.min(10, addToCartForm.data.quantity + 1))}
                                    className="px-4 py-3 text-xl font-semibold text-slate-900 hover:bg-slate-50"
                                >
                                    +
                                </button>
                            </div>
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    addToCartForm.post('/cart', {
                                        preserveScroll: true,
                                        onSuccess: () => {
                                            incrementCart();
                                        },
                                    });
                                }}
                            >
                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 transition"
                                >
                                    Add to Cart
                                </button>
                            </form>
                        </div>

                        <Link href="/cart" className="inline-block text-blue-600 hover:text-blue-700">
                            View Cart
                        </Link>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mt-16">
                    <div className="border-b border-slate-200">
                        <nav className="flex space-x-8">
                            {['description', 'specifications', 'reviews'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-4 px-1 border-b-2 font-medium capitalize transition ${
                                        activeTab === tab
                                            ? 'border-blue-600 text-blue-600'
                                            : 'border-transparent text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
                        {activeTab === 'description' && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-slate-900">Product Description</h3>
                                <div className="html-content text-slate-600" dangerouslySetInnerHTML={{ __html: product.description }} />
                            </div>
                        )}

                        {activeTab === 'specifications' && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-slate-900">Specifications</h3>
                                {product.specifications ? (
                                    <div className="html-content text-slate-600" dangerouslySetInnerHTML={{ __html: product.specifications }} />
                                ) : (
                                    <p className="text-slate-500">No specifications available.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-slate-900">Customer Reviews</h3>
                                <form
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        reviewForm.post(`/products/${product.id}/reviews`, {
                                            preserveScroll: true,
                                            onSuccess: () => reviewForm.reset('comment'),
                                        });
                                    }}
                                    className="rounded-lg bg-slate-50 p-4"
                                >
                                    <div className="grid gap-4 md:grid-cols-[200px_1fr]">
                                        <select
                                            value={reviewForm.data.rating}
                                            onChange={(event) => reviewForm.setData('rating', Number(event.target.value))}
                                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900"
                                        >
                                            {[5, 4, 3, 2, 1].map((rating) => (
                                                <option key={rating} value={rating}>
                                                    {rating} Star{rating > 1 ? 's' : ''}
                                                </option>
                                            ))}
                                        </select>
                                        <textarea
                                            value={reviewForm.data.comment}
                                            onChange={(event) => reviewForm.setData('comment', event.target.value)}
                                            rows={4}
                                            placeholder="Share your experience with this product"
                                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400"
                                        />
                                    </div>
                                    <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
                                        Submit Review
                                    </button>
                                </form>

                                <div className="space-y-4">
                                    {reviews.length === 0 && <p className="text-slate-500">No reviews yet. Be the first to review this product.</p>}
                                    {reviews.map((review) => (
                                        <article key={review.id} className="rounded-lg bg-slate-50 p-4">
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold text-slate-900">{review.user.name}</p>
                                                <p className="text-sm text-slate-500">{new Date(review.created_at).toLocaleDateString()}</p>
                                            </div>
                                            <div className="mt-1">{renderStars(review.rating)}</div>
                                            <p className="mt-3 text-slate-700">{review.comment}</p>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold mb-6 text-slate-900">Related Products</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {relatedProducts.map((relatedProduct) => (
                                <Link
                                    key={relatedProduct.id}
                                    href={`/products/${relatedProduct.slug}`}
                                    className="group"
                                >
                                    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                                        <img
                                            src={relatedProduct.image || 'https://placehold.co/400x300'}
                                            alt={relatedProduct.name}
                                            className="h-48 w-full object-cover transition group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition">{relatedProduct.name}</h3>
                                        <p className="mt-1 text-blue-600 font-semibold">{formatKes(relatedProduct.price)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            <Footer />
        </main>
    );
}
