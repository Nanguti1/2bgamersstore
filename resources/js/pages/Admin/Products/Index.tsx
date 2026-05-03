import { Link, router } from '@inertiajs/react';

type Product = {
    id: number;
    name: string;
    price: string;
    stock: number;
    is_active: boolean;
    featured: boolean;
    category?: {
        name: string;
    };
};

const formatKes = (value: number): string => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(value);
};

type PaginatedProducts = {
    data: Product[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
};

export default function AdminProductsIndex({ products }: { products: PaginatedProducts }): JSX.Element {
    return (
        <main className="min-h-screen bg-[#f3f4f6] p-6 md:p-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-semibold text-slate-900">Manage Products</h1>
                    <Link href="/admin/products/create" className="rounded-xl bg-pink-200 px-5 py-2.5 font-medium text-slate-900 hover:bg-pink-300">
                        + New Product
                    </Link>
                </div>

                <div className="mt-6 overflow-x-auto overflow-y-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                    <table className="min-w-[760px] w-full text-left text-base text-slate-900">
                        <thead className="bg-[#053354] text-white">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Name</th>
                                <th className="px-6 py-3 font-semibold">Category</th>
                                <th className="px-6 py-3 font-semibold">Price</th>
                                <th className="px-6 py-3 font-semibold">Stock</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                                <th className="px-6 py-3 font-semibold">Featured</th>
                                <th className="px-6 py-3 text-right font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.data.map((product, index) => (
                                <tr key={product.id} className={index % 2 === 0 ? 'bg-white' : 'bg-rose-50/40'}>
                                    <td className="px-6 py-3 font-medium">{product.name}</td>
                                    <td className="px-6 py-3">{product.category?.name ?? 'N/A'}</td>
                                    <td className="px-6 py-3">{formatKes(Number(product.price))}</td>
                                    <td className="px-6 py-3">{product.stock}</td>
                                    <td className="px-6 py-3">
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${product.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-200 text-zinc-700'}`}>
                                            {product.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3">
                                        <button
                                            type="button"
                                            className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold ${product.featured ? 'bg-yellow-100 text-yellow-700' : 'bg-zinc-200 text-zinc-700'}`}
                                            onClick={() => router.patch(`/admin/products/${product.id}/featured`, { featured: !product.featured })}
                                        >
                                            {product.featured ? 'Featured' : 'Not Featured'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                type="button"
                                                className="cursor-pointer rounded-lg bg-blue-600 px-2 py-1 text-xs font-medium text-white hover:bg-blue-700"
                                                onClick={() => router.visit(`/admin/products/${product.id}`)}
                                            >
                                                Show
                                            </button>
                                            <button
                                                type="button"
                                                className="cursor-pointer rounded-lg bg-green-600 px-2 py-1 text-xs font-medium text-white hover:bg-green-700"
                                                onClick={() => router.visit(`/admin/products/${product.id}/edit`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="cursor-pointer rounded-lg bg-violet-600 px-2 py-1 text-xs font-medium text-white hover:bg-violet-700"
                                                onClick={() => router.post(`/admin/products/${product.id}/duplicate`)}
                                            >
                                                Duplicate
                                            </button>
                                            <button
                                                type="button"
                                                className="cursor-pointer rounded-lg bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700"
                                                onClick={() => router.delete(`/admin/products/${product.id}`)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                    {products.links.map((link, index) => (
                        <button
                            key={`${link.label}-${index}`}
                            type="button"
                            className={`cursor-pointer rounded-lg border px-3 py-1 text-sm ${link.active ? 'border-blue-700 bg-blue-700 text-white' : 'border-zinc-300 bg-white text-slate-800'}`}
                            disabled={link.url === null}
                            onClick={() => link.url && router.visit(link.url)}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
