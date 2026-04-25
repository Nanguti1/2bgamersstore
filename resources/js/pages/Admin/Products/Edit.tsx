import { Link, router, useForm } from '@inertiajs/react';

export default function AdminProductsEdit({ product, categories }: { product: any; categories: any[] }): JSX.Element {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        description: product.description || '',
        price: product.price,
        stock: product.stock,
        category_id: product.category_id,
        is_active: product.is_active,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        put(`/admin/products/${product.id}`);
    };

    return (
        <main className="min-h-screen bg-[#f3f4f6] p-6 md:p-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6">
                    <Link href="/admin/products" className="text-blue-600 hover:text-blue-800">
                        ← Back to Products
                    </Link>
                </div>
                <h1 className="text-3xl font-semibold text-slate-900 mb-6">Edit Product</h1>
                <form onSubmit={submit} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                            <input
                                value={data.name}
                                onChange={(event) => setData('name', event.target.value)}
                                className="w-full rounded-lg border border-zinc-300 px-3 py-2"
                            />
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.price}
                                onChange={(event) => setData('price', event.target.value)}
                                className="w-full rounded-lg border border-zinc-300 px-3 py-2"
                            />
                            {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Stock</label>
                            <input
                                type="number"
                                value={data.stock}
                                onChange={(event) => setData('stock', Number(event.target.value))}
                                className="w-full rounded-lg border border-zinc-300 px-3 py-2"
                            />
                            {errors.stock && <p className="text-xs text-red-500 mt-1">{errors.stock}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                            <select
                                value={data.category_id}
                                onChange={(event) => setData('category_id', Number(event.target.value))}
                                className="w-full rounded-lg border border-zinc-300 px-3 py-2"
                            >
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            {errors.category_id && <p className="text-xs text-red-500 mt-1">{errors.category_id}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(event) => setData('description', event.target.value)}
                                rows={4}
                                className="w-full rounded-lg border border-zinc-300 px-3 py-2"
                            />
                            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(event) => setData('is_active', event.target.checked)}
                                    className="rounded border-zinc-300"
                                />
                                <span className="text-sm font-medium text-slate-700">Active</span>
                            </label>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <Link
                            href="/admin/products"
                            className="rounded-lg bg-gray-200 px-4 py-2 font-medium text-slate-900 hover:bg-gray-300"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
