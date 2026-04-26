import { Link, router, useForm } from '@inertiajs/react';
import { useMemo } from 'react';

export default function AdminProductsEdit({ product, categories }: { product: any; categories: any[] }): JSX.Element {
    const { data, setData, patch, processing, errors } = useForm({
        slug: product.slug,
        name: product.name,
        description: product.description || '',
        price: product.price,
        stock: product.stock,
        category_id: product.category_id,
        image: null as File | null,
        remove_primary_image: false,
        gallery: [] as File[],
        existing_gallery: product.gallery ?? [],
        is_active: product.is_active,
        featured: product.featured,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        patch(`/admin/products/${product.id}`, { forceFormData: true });
    };

    const galleryPreviews = useMemo(() => {
        return data.gallery.map((file) => URL.createObjectURL(file));
    }, [data.gallery]);

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
                        <div className="md:col-span-2 rounded-lg border border-zinc-200 p-4">
                            <p className="text-sm font-medium text-slate-700">Primary Image</p>
                            {product.image && !data.remove_primary_image && (
                                <img src={product.image} alt={product.name} className="mt-2 h-24 w-24 rounded border object-cover" />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(event) => setData('image', event.target.files?.[0] ?? null)}
                                className="mt-3 w-full rounded-lg border border-zinc-300 px-3 py-2"
                            />
                            <label className="mt-3 flex items-center gap-2 text-sm text-slate-700">
                                <input
                                    type="checkbox"
                                    checked={data.remove_primary_image}
                                    onChange={(event) => setData('remove_primary_image', event.target.checked)}
                                    className="rounded border-zinc-300"
                                />
                                Remove current primary image
                            </label>
                            {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image}</p>}
                        </div>
                        <div className="md:col-span-2 rounded-lg border border-zinc-200 p-4">
                            <p className="text-sm font-medium text-slate-700">Gallery Images</p>
                            {data.existing_gallery.length > 0 ? (
                                <div className="mt-3 grid grid-cols-4 gap-2">
                                    {data.existing_gallery.map((image: string) => (
                                        <div key={image} className="relative">
                                            <img src={image} alt="Gallery" className="h-20 w-full rounded border object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setData('existing_gallery', data.existing_gallery.filter((galleryImage: string) => galleryImage !== image))}
                                                className="absolute right-1 top-1 rounded bg-white px-2 py-0.5 text-xs text-red-600"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="mt-2 text-sm text-zinc-500">No existing gallery images.</p>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(event) => setData('gallery', Array.from(event.target.files ?? []).slice(0, 4))}
                                className="mt-3 w-full rounded-lg border border-zinc-300 px-3 py-2"
                            />
                            {galleryPreviews.length > 0 && (
                                <div className="mt-3 grid grid-cols-4 gap-2">
                                    {galleryPreviews.map((preview, index) => (
                                        <img key={`${preview}-${index}`} src={preview} alt={`New gallery ${index + 1}`} className="h-20 w-full rounded border object-cover" />
                                    ))}
                                </div>
                            )}
                            {errors.gallery && <p className="text-xs text-red-500 mt-1">{errors.gallery}</p>}
                            {errors.existing_gallery && <p className="text-xs text-red-500 mt-1">{errors.existing_gallery}</p>}
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
                        <div className="md:col-span-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={data.featured}
                                    onChange={(event) => setData('featured', event.target.checked)}
                                    className="rounded border-zinc-300"
                                />
                                <span className="text-sm font-medium text-slate-700">Featured</span>
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
                            className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
