import { router, useForm } from '@inertiajs/react';

type Customer = {
    id: number;
    name: string;
    email: string;
};

export default function AdminCustomersIndex({ customers }: { customers: { data: Customer[] } }): JSX.Element {
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
        <main className="p-6">
            <h1 className="text-2xl font-bold">Manage Customers</h1>

            <form onSubmit={submit} className="mt-4 grid gap-2 rounded border p-4 md:grid-cols-4 md:items-end">
                <div className="grid gap-1">
                    <label className="text-sm font-medium">Name</label>
                    <input value={data.name} onChange={(event) => setData('name', event.target.value)} className="rounded border p-2" />
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>
                <div className="grid gap-1">
                    <label className="text-sm font-medium">Email</label>
                    <input value={data.email} onChange={(event) => setData('email', event.target.value)} className="rounded border p-2" />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>
                <div className="grid gap-1">
                    <label className="text-sm font-medium">Password</label>
                    <input type="password" value={data.password} onChange={(event) => setData('password', event.target.value)} className="rounded border p-2" />
                    {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                </div>
                <button className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-60" disabled={processing}>Add Customer</button>
            </form>

            <div className="mt-4 overflow-hidden rounded border">
                <table className="min-w-full text-sm">
                    <thead className="bg-zinc-50 text-left">
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.data.map((customer) => (
                            <tr key={customer.id} className="border-t">
                                <td className="px-4 py-2 font-medium">{customer.name}</td>
                                <td className="px-4 py-2 text-zinc-500">{customer.email}</td>
                                <td className="px-4 py-2 text-right">
                                    <button type="button" className="text-red-600" onClick={() => router.delete(`/admin/customers/${customer.id}`)}>
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
