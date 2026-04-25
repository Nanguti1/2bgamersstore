import { Link, router } from '@inertiajs/react';

type Product = {
    id: number;
    name: string;
    price: string;
    stock: number;
    is_active: boolean;
    category?: {
        name: string;
    };
};

const formatKes = (value: number): string => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(value);
};

export default function AdminProductsIndex({ products }: { products: { data: Product[] } }): JSX.Element {
    return (
        <main className="min-h-screen bg-[#f3f4f6] p-6 md:p-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-semibold text-slate-900">Manage Products</h1>
                    <Link href="/admin/products/create" className="rounded-xl bg-pink-200 px-5 py-2.5 font-medium text-slate-900 hover:bg-pink-300">
                        + New Product
                    </Link>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                    <table className="min-w-full text-left text-base text-slate-900">
                        <thead className="bg-[#053354] text-white">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Name</th>
                                <th className="px-6 py-4 font-semibold">Category</th>
                                <th className="px-6 py-4 font-semibold">Price</th>
                                <th className="px-6 py-4 font-semibold">Stock</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 text-right font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.data.map((product, index) => (
                                <tr key={product.id} className={index % 2 === 0 ? 'bg-white' : 'bg-rose-50/40'}>
                                    <td className="px-6 py-5 font-medium">{product.name}</td>
                                    <td className="px-6 py-5">{product.category?.name ?? 'N/A'}</td>
                                    <td className="px-6 py-5">{formatKes(Number(product.price))}</td>
                                    <td className="px-6 py-5">{product.stock}</td>
                                    <td className="px-6 py-5">
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${product.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-200 text-zinc-700'}`}>
                                            {product.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                type="button"
                                                className="rounded-lg bg-blue-600 px-2 py-1 text-xs font-medium text-white hover:bg-blue-700"
                                                onClick={() => router.visit(`/admin/products/${product.id}`)}
                                            >
                                                Show
                                            </button>
                                            <button
                                                type="button"
                                                className="rounded-lg bg-green-600 px-2 py-1 text-xs font-medium text-white hover:bg-green-700"
                                                onClick={() => router.visit(`/admin/products/${product.id}/edit`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="rounded-lg bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700"
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
            </div>
        </main>
    );
}
