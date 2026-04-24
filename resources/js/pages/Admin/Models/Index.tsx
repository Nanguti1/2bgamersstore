import { router, useForm } from '@inertiajs/react';

type Category = {
    id: number;
    name: string;
};

type HardwareModel = {
    id: number;
    name: string;
    description: string | null;
    category: Category;
};

export default function AdminModelsIndex({ models, categories }: { models: { data: HardwareModel[] }; categories: Category[] }): JSX.Element {
    const { data, setData, post, processing, errors, reset } = useForm({
        category_id: categories[0]?.id ?? '',
        name: '',
        description: '',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        post('/admin/models', {
            onSuccess: () => reset('name', 'description'),
        });
    };

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">Manage Models</h1>

            <form onSubmit={submit} className="mt-4 grid gap-2 rounded border p-4 md:grid-cols-4 md:items-end">
                <div className="grid gap-1">
                    <label className="text-sm font-medium">Category</label>
                    <select value={data.category_id} onChange={(event) => setData('category_id', Number(event.target.value))} className="rounded border p-2">
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="grid gap-1">
                    <label className="text-sm font-medium">Name</label>
                    <input value={data.name} onChange={(event) => setData('name', event.target.value)} className="rounded border p-2" />
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>
                <div className="grid gap-1">
                    <label className="text-sm font-medium">Description</label>
                    <input value={data.description} onChange={(event) => setData('description', event.target.value)} className="rounded border p-2" />
                </div>
                <button className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-60" disabled={processing}>Add Model</button>
            </form>

            <div className="mt-4 overflow-hidden rounded border">
                <table className="min-w-full text-sm">
                    <thead className="bg-zinc-50 text-left">
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {models.data.map((item) => (
                            <tr key={item.id} className="border-t">
                                <td className="px-4 py-2 font-medium">{item.name}</td>
                                <td className="px-4 py-2">{item.category.name}</td>
                                <td className="px-4 py-2 text-zinc-500">{item.description ?? 'No description'}</td>
                                <td className="px-4 py-2 text-right">
                                    <button type="button" className="text-red-600" onClick={() => router.delete(`/admin/models/${item.id}`)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
