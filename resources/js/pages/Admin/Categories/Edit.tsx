import { Link, router, useForm } from '@inertiajs/react';

export default function AdminCategoriesEdit({ category }: { category: any }): JSX.Element {
    const { data, setData, patch, processing, errors } = useForm({
        name: category.name,
        description: category.description || '',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        patch(`/admin/categories/${category.id}`);
    };

    return (
        <main className="min-h-screen bg-[#f3f4f6] p-6 md:p-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6">
                    <Link href="/admin/categories" className="text-blue-600 hover:text-blue-800">
                        ← Back to Categories
                    </Link>
                </div>
                <h1 className="text-3xl font-semibold text-slate-900 mb-6">Edit Category</h1>
                <form onSubmit={submit} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <div className="grid gap-4">
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
                            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(event) => setData('description', event.target.value)}
                                rows={4}
                                className="w-full rounded-lg border border-zinc-300 px-3 py-2"
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <Link
                            href="/admin/categories"
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
