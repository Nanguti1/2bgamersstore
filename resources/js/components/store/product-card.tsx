import { Link } from '@inertiajs/react';

type Product = {
    id: number;
    name: string;
    slug: string;
    price: string;
    image: string | null;
};

export function ProductCard({ product }: { product: Product }): JSX.Element {
    return (
        <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <img src={product.image ?? 'https://placehold.co/400x300'} alt={product.name} className="h-44 w-full rounded-md object-cover" />
            <h3 className="mt-3 font-semibold text-white">{product.name}</h3>
            <p className="text-blue-400">${product.price}</p>
            <Link href={`/products/${product.slug}`} className="mt-3 inline-block rounded bg-blue-600 px-3 py-2 text-sm text-white">View Details</Link>
        </article>
    );
}
