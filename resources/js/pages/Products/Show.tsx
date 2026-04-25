import { Footer } from '@/components/store/footer';
import { Navbar } from '@/components/store/navbar';
import { Link, useForm } from '@inertiajs/react';

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

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
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
}: {
    product: Product;
    reviews: Review[];
    reviewStats: { average_rating: number; total_reviews: number };
}): JSX.Element {
    const addToCartForm = useForm({ product_id: product.id, quantity: 1 });
    const reviewForm = useForm({ rating: 5, comment: '' });

    return (
        <main className="min-h-screen bg-[#f4f4f5] text-[#111827]">
            <Navbar />

            <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-2">
                <img src={product.image ?? 'https://placehold.co/700x500'} alt={product.name} className="w-full rounded-xl border border-zinc-200 object-cover" />
                <div>
                    <h1 className="text-4xl font-bold">{product.name}</h1>
                    <p className="mt-3 text-zinc-600">{product.description}</p>
                    <p className="mt-4 text-2xl font-semibold text-indigo-600">{formatKes(Number(product.price))}</p>
                    <p className="mt-2 text-sm text-zinc-500">
                        {reviewStats.average_rating > 0 ? `${reviewStats.average_rating}/5` : 'No rating yet'} • {reviewStats.total_reviews} reviews
                    </p>

                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            addToCartForm.post('/cart');
                        }}
                        className="mt-6 flex items-center gap-3"
                    >
                        <input
                            type="number"
                            min={1}
                            max={10}
                            value={addToCartForm.data.quantity}
                            onChange={(event) => addToCartForm.setData('quantity', Number(event.target.value))}
                            className="w-24 rounded-md border border-zinc-300 px-3 py-2"
                        />
                        <button className="rounded-md bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-500">Add to Cart</button>
                    </form>

                    <Link href="/cart" className="mt-4 inline-block text-sm text-indigo-600 hover:text-indigo-700">
                        Go to Cart
                    </Link>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 pb-14">
                <h2 className="text-2xl font-semibold">Customer Reviews</h2>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        reviewForm.post(`/products/${product.id}/reviews`, {
                            preserveScroll: true,
                            onSuccess: () => reviewForm.reset('comment'),
                        });
                    }}
                    className="mt-5 rounded-xl border border-zinc-200 bg-white p-5"
                >
                    <div className="grid gap-3 md:grid-cols-[160px_1fr] md:items-start">
                        <select
                            value={reviewForm.data.rating}
                            onChange={(event) => reviewForm.setData('rating', Number(event.target.value))}
                            className="rounded-md border border-zinc-300 px-3 py-2"
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
                            className="w-full rounded-md border border-zinc-300 px-3 py-2"
                        />
                    </div>
                    <button className="mt-3 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">Submit Review</button>
                </form>

                <div className="mt-6 space-y-4">
                    {reviews.length === 0 && <p className="text-zinc-500">No reviews yet. Be the first to review this product.</p>}
                    {reviews.map((review) => (
                        <article key={review.id} className="rounded-xl border border-zinc-200 bg-white p-5">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold">{review.user.name}</p>
                                <p className="text-sm text-zinc-500">{new Date(review.created_at).toLocaleDateString()}</p>
                            </div>
                            <p className="mt-1 text-sm text-amber-600">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                            <p className="mt-3 text-zinc-700">{review.comment}</p>
                        </article>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
