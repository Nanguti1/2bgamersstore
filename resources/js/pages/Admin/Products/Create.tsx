import { Link, useForm } from '@inertiajs/react';
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
];

type Category = {
    id: number;
    name: string;
};

type ProductFormData = {
    category_id: number | '';
    name: string;
    slug: string;
    description: string;
    specifications: string;
    price: string;
    stock: string;
    image: File | null;
    gallery: File[];
    is_active: boolean;
    featured: boolean;
};

const MAX_GALLERY_ITEMS = 4;

export default function AdminProductsCreate({ categories }: { categories: Category[] }): JSX.Element {
    const [currentTab, setCurrentTab] = useState('general');

    const { data, setData, post, processing, errors } = useForm<ProductFormData>({
        category_id: categories[0]?.id ?? '',
        name: '',
        slug: '',
        description: '',
        specifications: '',
        price: '',
        stock: '',
        image: null,
        gallery: [],
        is_active: true,
        featured: false,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        post('/admin/products', {
            forceFormData: true,
        });
    };

    const onGalleryChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const files = Array.from(event.target.files ?? []).slice(0, MAX_GALLERY_ITEMS);
        setData('gallery', files);
    };

    const primaryImagePreview = useMemo(() => {
        if (!data.image) {
            return null;
        }

        return URL.createObjectURL(data.image);
    }, [data.image]);

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
                <h1 className="text-3xl font-semibold text-slate-900 mb-6">Create Product</h1>

                {/* Tab Navigation */}
                <div className="mb-6 border-b border-zinc-200">
                    <nav className="flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setCurrentTab(tab.id)}
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
                                    <img src={primaryImagePreview} alt="Primary preview" className="mt-2 h-24 w-24 rounded border object-cover" />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => setData('image', event.target.files?.[0] ?? null)}
                                    className="mt-3 w-full rounded-lg border border-zinc-300 px-3 py-2"
                                />
                                {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image}</p>}
                            </div>
                            <div className="rounded-lg border border-zinc-200 p-4">
                                <p className="text-sm font-medium text-slate-700">Gallery Images (max {MAX_GALLERY_ITEMS})</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={onGalleryChange}
                                    className="mt-3 w-full rounded-lg border border-zinc-300 px-3 py-2"
                                />
                                {errors.gallery && <p className="text-xs text-red-500 mt-1">{errors.gallery}</p>}
                                <p className="mt-2 text-xs text-zinc-500">Selected: {data.gallery.length} files</p>
                                {galleryPreviews.length > 0 && (
                                    <div className="mt-3 grid grid-cols-4 gap-2">
                                        {galleryPreviews.map((preview, index) => (
                                            <img key={`${preview}-${index}`} src={preview} alt={`Gallery preview ${index + 1}`} className="h-20 w-full rounded border object-cover" />
                                        ))}
                                    </div>
                                )}
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
                </div>
            </div>
        </main>
    );
}
