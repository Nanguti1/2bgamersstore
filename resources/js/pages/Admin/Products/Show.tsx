import { router } from '@inertiajs/react';

export default function AdminProductsShow({ product }: { product: any }): JSX.Element {
    return (
        <main className="min-h-screen bg-[#f3f4f6] p-6 md:p-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6">
                    <button
                        onClick={() => router.visit('/admin/products')}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        ← Back to Products
                    </button>
                </div>
                <h1 className="text-3xl font-semibold text-slate-900 mb-6">Product Details</h1>
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <div className="grid gap-4">
                        <div>
                            <h3 className="font-semibold text-slate-700">Name</h3>
                            <p className="text-slate-900">{product.name}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-700">Description</h3>
                            <p className="text-slate-900">{product.description || 'No description'}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-700">Price</h3>
                            <p className="text-slate-900">{product.price}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-700">Stock</h3>
                            <p className="text-slate-900">{product.stock}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-700">Category</h3>
                            <p className="text-slate-900">{product.category?.name || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
