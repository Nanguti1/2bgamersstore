import { Link, router, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';

interface Tab {
    id: string;
    label: string;
}

const tabs: Tab[] = [
    { id: 'general', label: 'General' },
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'media', label: 'Media' },
    { id: 'variants', label: 'Variants' },
];

export default function AdminProductsEdit({ product, categories, activeTab }: { product: any; categories: any[]; activeTab: string }): JSX.Element {
    const [currentTab, setCurrentTab] = useState(activeTab || 'general');
    const [variants, setVariants] = useState<Array<{ id?: number; name: string; sku: string; price: string; stock: string; is_active: boolean }>>(
        product.variants?.map((v: any) => ({
            id: v.id,
            name: v.name,
            sku: v.sku,
            price: v.price,
            stock: v.stock,
            is_active: v.is_active,
        })) || []
    );

    const { data, setData, patch, processing, errors } = useForm({
        slug: product.slug,
        name: product.name,
        description: product.description || '',
        specifications: product.specifications || '',
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

    const saveVariants = (): void => {
        router.patch(`/admin/products/${product.id}/variants`, { variants });
    };

    const addVariant = (): void => {
        setVariants([...variants, { name: '', sku: '', price: '', stock: '', is_active: true }]);
    };

    const removeVariant = (index: number): void => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    const updateVariant = (index: number, field: string, value: any): void => {
        const newVariants = [...variants];
        newVariants[index] = { ...newVariants[index], [field]: value };
        setVariants(newVariants);
    };

    const galleryPreviews = useMemo(() => {
        return data.gallery.map((file) => URL.createObjectURL(file));
    }, [data.gallery]);

    const primaryImagePreview = useMemo(() => {
        if (data.image) {
            return URL.createObjectURL(data.image);
        }

        if (!data.remove_primary_image) {
            return product.image;
        }

        return null;
    }, [data.image, data.remove_primary_image, product.image]);

    const switchTab = (tabId: string): void => {
        setCurrentTab(tabId);
        router.get(`/admin/products/${product.id}/edit`, { tab: tabId }, { preserveState: true });
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

                {/* Tab Navigation */}
                <div className="mb-6 border-b border-zinc-200">
                    <nav className="flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => switchTab(tab.id)}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                    currentTab === tab.id
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                    {currentTab === 'general' && (
                        <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
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
                                <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
                                <input
                                    value={data.slug}
                                    onChange={(event) => setData('slug', event.target.value)}
                                    className="w-full rounded-lg border border-zinc-300 px-3 py-2"
                                />
                                {errors.slug && <p className="text-xs text-red-500 mt-1">{errors.slug}</p>}
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
                            <div>
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
                            <div>
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
                            <div className="md:col-span-2 flex justify-end gap-3">
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
                    )}

                    {currentTab === 'description' && (
                        <form onSubmit={submit} className="grid gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea
                                    id="description-editor"
                                    value={data.description}
                                    onChange={(event) => setData('description', event.target.value)}
                                    rows={12}
                                    className="w-full rounded-lg border border-zinc-300 px-3 py-2"
                                    placeholder="Enter product description (HTML supported)"
                                />
                                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                            </div>
                            <div className="flex justify-end gap-3">
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
                    )}

                    {currentTab === 'specifications' && (
                        <form onSubmit={submit} className="grid gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Specifications</label>
                                <p className="text-xs text-zinc-500 mb-2">Enter product specifications in HTML format. Use tables, lists, or any HTML formatting.</p>
                                <textarea
                                    id="specifications-editor"
                                    value={data.specifications}
                                    onChange={(event) => setData('specifications', event.target.value)}
                                    rows={12}
                                    className="w-full rounded-lg border border-zinc-300 px-3 py-2"
                                    placeholder="Enter product specifications (HTML supported)"
                                />
                                {errors.specifications && <p className="text-xs text-red-500 mt-1">{errors.specifications}</p>}
                            </div>
                            <div className="flex justify-end gap-3">
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
                    )}

                    {currentTab === 'media' && (
                        <form onSubmit={submit} className="grid gap-4">
                            <div className="rounded-lg border border-zinc-200 p-4">
                                <p className="text-sm font-medium text-slate-700">Primary Image</p>
                                {primaryImagePreview && (
                                    <img src={primaryImagePreview} alt={product.name} className="mt-2 h-24 w-24 rounded border object-cover" />
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
                            <div className="rounded-lg border border-zinc-200 p-4">
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
                            <div className="flex justify-end gap-3">
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
                    )}

                    {currentTab === 'variants' && (
                        <div className="grid gap-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-slate-900">Product Variants</h3>
                                <button
                                    type="button"
                                    onClick={addVariant}
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                >
                                    + Add Variant
                                </button>
                            </div>

                            {variants.length === 0 ? (
                                <p className="text-sm text-zinc-500">No variants added yet.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-zinc-200">
                                        <thead className="bg-zinc-50">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-zinc-500 uppercase">Name</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-zinc-500 uppercase">SKU</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-zinc-500 uppercase">Price</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-zinc-500 uppercase">Stock</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-zinc-500 uppercase">Active</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-zinc-500 uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-200">
                                            {variants.map((variant, index) => (
                                                <tr key={index}>
                                                    <td className="px-4 py-2">
                                                        <input
                                                            type="text"
                                                            value={variant.name}
                                                            onChange={(e) => updateVariant(index, 'name', e.target.value)}
                                                            className="w-full rounded border border-zinc-300 px-2 py-1 text-sm"
                                                            placeholder="e.g., Red - Large"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <input
                                                            type="text"
                                                            value={variant.sku}
                                                            onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                                                            className="w-full rounded border border-zinc-300 px-2 py-1 text-sm"
                                                            placeholder="SKU-001"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            value={variant.price}
                                                            onChange={(e) => updateVariant(index, 'price', e.target.value)}
                                                            className="w-full rounded border border-zinc-300 px-2 py-1 text-sm"
                                                            placeholder="0.00"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <input
                                                            type="number"
                                                            value={variant.stock}
                                                            onChange={(e) => updateVariant(index, 'stock', e.target.value)}
                                                            className="w-full rounded border border-zinc-300 px-2 py-1 text-sm"
                                                            placeholder="0"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={variant.is_active}
                                                            onChange={(e) => updateVariant(index, 'is_active', e.target.checked)}
                                                            className="rounded border-zinc-300"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeVariant(index)}
                                                            className="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200"
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            <div className="flex justify-end gap-3">
                                <Link
                                    href="/admin/products"
                                    className="rounded-lg bg-gray-200 px-4 py-2 font-medium text-slate-900 hover:bg-gray-300"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="button"
                                    onClick={saveVariants}
                                    className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                                >
                                    Save Variants
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
