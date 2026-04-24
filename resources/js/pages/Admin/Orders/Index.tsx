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

export default function AdminOrdersIndex({ orders, statuses }: { orders: { data: Order[] }; statuses: string[] }): JSX.Element {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">Manage Orders</h1>

            <div className="mt-4 overflow-hidden rounded border">
                <table className="min-w-full text-sm">
                    <thead className="bg-zinc-50 text-left">
                        <tr>
                            <th className="px-4 py-2">Order #</th>
                            <th className="px-4 py-2">Customer</th>
                            <th className="px-4 py-2">Total</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.data.map((order) => (
                            <tr key={order.id} className="border-t">
                                <td className="px-4 py-2 font-medium">#{order.id}</td>
                                <td className="px-4 py-2">
                                    <p>{order.user?.name ?? 'Guest'}</p>
                                    <p className="text-xs text-zinc-500">{order.user?.email ?? '-'}</p>
                                </td>
                                <td className="px-4 py-2">${order.total_amount}</td>
                                <td className="px-4 py-2">
                                    <select
                                        defaultValue={order.status}
                                        className="rounded border px-2 py-1"
                                        onChange={(event) => router.patch(`/admin/orders/${order.id}`, { status: event.target.value })}
                                    >
                                        {statuses.map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-4 py-2 text-right">
                                    <button type="button" className="text-red-600" onClick={() => router.delete(`/admin/orders/${order.id}`)}>
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
