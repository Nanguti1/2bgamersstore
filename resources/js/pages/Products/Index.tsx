import { Footer } from '@/components/store/footer';
import { Navbar } from '@/components/store/navbar';
import { ProductCard } from '@/components/store/product-card';
import { ThinHero } from '@/components/store/thin-hero';
import { router } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

type Product = {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    price: number;
};

type ProductPagination = {
    data: Product[];
    current_page: number;
    next_page_url: string | null;
};

interface ProductIndexProps {
    products: ProductPagination;
    filters: {
        search?: string | null;
        category?: string | null;
    };
}

export default function ProductIndex({ products, filters }: ProductIndexProps): JSX.Element {
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>(products.data);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    useEffect(() => {
        if (products.current_page === 1) {
            setDisplayedProducts(products.data);

            return;
        }

        setDisplayedProducts((existingProducts) => {
            const existingProductIds = new Set(existingProducts.map((product) => product.id));
            const uniqueIncomingProducts = products.data.filter((product) => !existingProductIds.has(product.id));

            return [...existingProducts, ...uniqueIncomingProducts];
        });
    }, [products]);

    const hasMoreProducts = useMemo(() => {
        return products.next_page_url !== null;
    }, [products.next_page_url]);

    const loadMore = (): void => {
        if (!hasMoreProducts || isLoadingMore) {
            return;
        }

        setIsLoadingMore(true);

        router.get(
            '/products',
            {
                search: filters.search ?? undefined,
                category: filters.category ?? undefined,
                page: products.current_page + 1,
            },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['products'],
                onFinish: () => {
                    setIsLoadingMore(false);
                },
            },
        );
    };

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100">
            <Navbar />
            <ThinHero title="Products" />
            <section className="mx-auto max-w-screen-2xl px-6 py-12 md:px-8 lg:pb-16">
                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {displayedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {displayedProducts.length === 0 && (
                    <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-10 text-center text-zinc-300">
                        No products found. Try a different search or category.
                    </div>
                )}

                {hasMoreProducts && displayedProducts.length > 0 && (
                    <div className="mt-10 flex justify-center">
                        <button
                            type="button"
                            onClick={loadMore}
                            disabled={isLoadingMore}
                            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isLoadingMore ? 'Loading...' : 'Load More'}
                        </button>
                    </div>
                )}
            </section>
            <Footer />
        </main>
    );
}
