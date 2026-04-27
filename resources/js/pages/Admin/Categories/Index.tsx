import { router, useForm } from '@inertiajs/react';

type Category = {
    id: number;
    name: string;
    description: string | null;
};

type PaginatedCategories = {
    data: Category[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
};

export default function AdminCategoriesIndex({ categories }: { categories: PaginatedCategories }): JSX.Element {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        post('/admin/categories', {
            onSuccess: () => reset(),
        });
    };

    return (
        <main className="min-h-screen bg-[#f3f4f6] p-6 md:p-8">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-3xl font-semibold text-slate-900">Manage Categories</h1>

                <form onSubmit={submit} className="mt-6 grid gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-3 md:items-end">
                    <div className="grid gap-1">
                        <label className="text-sm font-medium text-slate-700">Name</label>
                        <input value={data.name} onChange={(event) => setData('name', event.target.value)} className="rounded-lg border border-zinc-300 px-3 py-2" />
                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>
                    <div className="grid gap-1">
                        <label className="text-sm font-medium text-slate-700">Description</label>
                        <input value={data.description} onChange={(event) => setData('description', event.target.value)} className="rounded-lg border border-zinc-300 px-3 py-2" />
                    </div>
                    <button className="cursor-pointer rounded-xl bg-pink-200 px-4 py-2.5 font-medium text-slate-900 hover:bg-pink-300 disabled:opacity-60" disabled={processing}>
                        Add Category
                    </button>
                </form>

                <div className="mt-6 overflow-x-auto overflow-y-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                    <table className="min-w-[760px] w-full text-left text-base text-slate-900">
                        <thead className="bg-[#053354] text-white">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Name</th>
                                <th className="px-6 py-3 font-semibold">Description</th>
                                <th className="px-6 py-3 text-right font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.data.map((category, index) => (
                                <tr key={category.id} className={index % 2 === 0 ? 'bg-white' : 'bg-rose-50/40'}>
                                    <td className="px-6 py-3 font-medium">{category.name}</td>
                                    <td className="px-6 py-3">{category.description ?? 'No description'}</td>
                                    <td className="px-6 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                type="button"
                                                className="cursor-pointer rounded-lg bg-blue-600 px-2 py-1 text-xs font-medium text-white hover:bg-blue-700"
                                                onClick={() => router.visit(`/admin/categories/${category.id}`)}
                                            >
                                                Show
                                            </button>
                                            <button
                                                type="button"
                                                className="cursor-pointer rounded-lg bg-green-600 px-2 py-1 text-xs font-medium text-white hover:bg-green-700"
                                                onClick={() => router.visit(`/admin/categories/${category.id}/edit`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="cursor-pointer rounded-lg bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700"
                                                onClick={() => router.delete(`/admin/categories/${category.id}`)}
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
                    {categories.links.map((link, index) => (
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
