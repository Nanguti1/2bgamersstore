import { router } from '@inertiajs/react';

type Order = {
    id: number;
    total_amount: string;
    status: string;
    user?: {
        name: string;
        email: string;
    };
};

const formatKes = (value: number): string => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(value);
};

export default function AdminOrdersIndex({ orders, statuses }: { orders: { data: Order[] }; statuses: string[] }): JSX.Element {
    return (
        <main className="min-h-screen bg-[#f3f4f6] p-6 md:p-8">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-3xl font-semibold text-slate-900">Manage Orders</h1>

                <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                    <table className="min-w-full text-left text-base text-slate-900">
                        <thead className="bg-[#053354] text-white">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Order #</th>
                                <th className="px-6 py-4 font-semibold">Customer</th>
                                <th className="px-6 py-4 font-semibold">Total</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 text-right font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.data.map((order, index) => (
                                <tr key={order.id} className={index % 2 === 0 ? 'bg-white' : 'bg-rose-50/40'}>
                                    <td className="px-6 py-5 font-semibold">#{order.id}</td>
                                    <td className="px-6 py-5">
                                        <p>{order.user?.name ?? 'Guest'}</p>
                                        <p className="text-sm text-slate-500">{order.user?.email ?? '-'}</p>
                                    </td>
                                    <td className="px-6 py-5">{formatKes(Number(order.total_amount))}</td>
                                    <td className="px-6 py-5">
                                        <select
                                            defaultValue={order.status}
                                            className="rounded-lg border border-slate-300 bg-white px-3 py-2"
                                            onChange={(event) => router.patch(`/admin/orders/${order.id}`, { status: event.target.value })}
                                        >
                                            {statuses.map((status) => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button
                                            type="button"
                                            className="rounded-xl bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
                                            onClick={() => router.delete(`/admin/orders/${order.id}`)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
