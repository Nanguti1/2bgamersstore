import { router, useForm } from '@inertiajs/react';

type Customer = {
    id: number;
    name: string;
    email: string;
};

type PaginatedCustomers = {
    data: Customer[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
};

export default function AdminCustomersIndex({ customers }: { customers: PaginatedCustomers }): JSX.Element {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        post('/admin/customers', {
            onSuccess: () => reset(),
        });
    };

    return (
        <main className="min-h-screen bg-[#f3f4f6] p-6 md:p-8">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-3xl font-semibold text-slate-900">Manage Customers</h1>

                <form onSubmit={submit} className="mt-6 grid gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-4 md:items-end">
                    <div className="grid gap-1">
                        <label className="text-sm font-medium text-slate-700">Name</label>
                        <input value={data.name} onChange={(event) => setData('name', event.target.value)} className="rounded-lg border border-zinc-300 px-3 py-2" />
                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>
                    <div className="grid gap-1">
                        <label className="text-sm font-medium text-slate-700">Email</label>
                        <input value={data.email} onChange={(event) => setData('email', event.target.value)} className="rounded-lg border border-zinc-300 px-3 py-2" />
                        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                    </div>
                    <div className="grid gap-1">
                        <label className="text-sm font-medium text-slate-700">Password</label>
                        <input type="password" value={data.password} onChange={(event) => setData('password', event.target.value)} className="rounded-lg border border-zinc-300 px-3 py-2" />
                        {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                    </div>
                    <button className="cursor-pointer rounded-xl bg-pink-200 px-4 py-2.5 font-medium text-slate-900 hover:bg-pink-300 disabled:opacity-60" disabled={processing}>+ New Client</button>
                </form>

                <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                    <table className="min-w-full text-left text-base text-slate-900">
                        <thead className="bg-[#053354] text-white">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Client</th>
                                <th className="px-6 py-4 font-semibold">Email</th>
                                <th className="px-6 py-4 text-right font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.data.map((customer, index) => (
                                <tr key={customer.id} className={index % 2 === 0 ? 'bg-white' : 'bg-rose-50/40'}>
                                    <td className="px-6 py-5 font-medium">{customer.name}</td>
                                    <td className="px-6 py-5">{customer.email}</td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                type="button"
                                                className="cursor-pointer rounded-lg bg-blue-600 px-2 py-1 text-xs font-medium text-white hover:bg-blue-700"
                                                onClick={() => router.visit(`/admin/customers/${customer.id}`)}
                                            >
                                                Show
                                            </button>
                                            <button
                                                type="button"
                                                className="cursor-pointer rounded-lg bg-green-600 px-2 py-1 text-xs font-medium text-white hover:bg-green-700"
                                                onClick={() => router.visit(`/admin/customers/${customer.id}/edit`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="cursor-pointer rounded-lg bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700"
                                                onClick={() => router.delete(`/admin/customers/${customer.id}`)}
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
                    {customers.links.map((link, index) => (
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
