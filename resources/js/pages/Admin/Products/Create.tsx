import { useForm } from '@inertiajs/react';

export default function AdminProductsCreate({ categories }: { categories: any[] }): JSX.Element {
    const { data, setData, post } = useForm({ category_id: categories[0]?.id ?? '', name: '', slug: '', description: '', price: '', stock: '', image: '', is_active: true });

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">Create Product</h1>
            <form onSubmit={(e) => { e.preventDefault(); post('/admin/products'); }} className="mt-4 grid max-w-2xl gap-3">
                <input value={data.name} onChange={(e) => setData('name', e.target.value)} className="rounded border p-2" placeholder="Name" />
                <button className="rounded bg-blue-600 px-4 py-2 text-white">Save</button>
            </form>
        </main>
    );
}
