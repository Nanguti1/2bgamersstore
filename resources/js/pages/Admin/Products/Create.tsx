import { useForm } from '@inertiajs/react';

type Category = {
    id: number;
    name: string;
};

type ProductFormData = {
    category_id: number | '';
    name: string;
    slug: string;
    description: string;
    price: string;
    stock: string;
    image: File | null;
    gallery: File[];
    is_active: boolean;
};

const MAX_GALLERY_ITEMS = 4;

export default function AdminProductsCreate({ categories }: { categories: Category[] }): JSX.Element {
    const { data, setData, post, processing, errors } = useForm<ProductFormData>({
        category_id: categories[0]?.id ?? '',
        name: '',
        slug: '',
        description: '',
        price: '',
        stock: '',
        image: null,
        gallery: [],
        is_active: true,
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

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">Create Product</h1>
            <p className="mt-1 text-sm text-zinc-500">Upload a primary image and up to 4 gallery images.</p>

            <form onSubmit={submit} className="mt-4 grid max-w-3xl gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-1">
                        <label className="text-sm font-medium">Category</label>
                        <select
                            value={data.category_id}
                            onChange={(event) => setData('category_id', Number(event.target.value))}
                            className="rounded border p-2"
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && <p className="text-xs text-red-500">{errors.category_id}</p>}
                    </div>

                    <div className="grid gap-1">
                        <label className="text-sm font-medium">Name</label>
                        <input value={data.name} onChange={(event) => setData('name', event.target.value)} className="rounded border p-2" placeholder="Name" />
                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>

                    <div className="grid gap-1">
                        <label className="text-sm font-medium">Slug</label>
                        <input value={data.slug} onChange={(event) => setData('slug', event.target.value)} className="rounded border p-2" placeholder="Slug" />
                        {errors.slug && <p className="text-xs text-red-500">{errors.slug}</p>}
                    </div>

                    <div className="grid gap-1">
                        <label className="text-sm font-medium">Price</label>
                        <input value={data.price} onChange={(event) => setData('price', event.target.value)} className="rounded border p-2" placeholder="79.99" />
                        {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
                    </div>

                    <div className="grid gap-1">
                        <label className="text-sm font-medium">Stock</label>
                        <input value={data.stock} onChange={(event) => setData('stock', event.target.value)} className="rounded border p-2" placeholder="20" />
                        {errors.stock && <p className="text-xs text-red-500">{errors.stock}</p>}
                    </div>

                    <div className="grid gap-1">
                        <label className="text-sm font-medium">Primary Image</label>
                        <input type="file" accept="image/*" onChange={(event) => setData('image', event.target.files?.[0] ?? null)} className="rounded border p-2" />
                        {errors.image && <p className="text-xs text-red-500">{errors.image}</p>}
                    </div>
                </div>

                <div className="grid gap-1">
                    <label className="text-sm font-medium">Description</label>
                    <textarea value={data.description} onChange={(event) => setData('description', event.target.value)} className="min-h-28 rounded border p-2" placeholder="Description" />
                    {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                </div>

                <div className="rounded border p-4">
                    <p className="text-sm font-semibold">Gallery Images (max {MAX_GALLERY_ITEMS})</p>
                    <input type="file" accept="image/*" multiple onChange={onGalleryChange} className="mt-2 rounded border p-2" />
                    {errors.gallery && <p className="mt-2 text-xs text-red-500">{errors.gallery}</p>}
                    <p className="mt-2 text-xs text-zinc-500">Selected: {data.gallery.length} files</p>
                </div>

                <label className="inline-flex items-center gap-2 text-sm font-medium">
                    <input type="checkbox" checked={data.is_active} onChange={(event) => setData('is_active', event.target.checked)} />
                    Active Product
                </label>

                <button disabled={processing} className="w-fit rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-60">
                    Save
                </button>
            </form>
        </main>
    );
}
