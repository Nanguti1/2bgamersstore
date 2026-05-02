import { router } from '@inertiajs/react';

type Order = {
    id: number;
    total_amount: string;
    status: string;
    payment_method: string;
    payment_status: string;
    mpesa_receipt_number: string | null;
    paid_at: string | null;
    user?: {
        name: string;
        email: string;
    };
};

const formatKes = (value: number): string => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(value);
};

type PaginatedOrders = {
    data: Order[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
};

export default function AdminOrdersIndex({ orders, statuses }: { orders: PaginatedOrders; statuses: string[] }): JSX.Element {
    return (
        <main className="min-h-screen bg-[#f3f4f6] p-6 md:p-8">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-3xl font-semibold text-slate-900">Manage Orders</h1>

                <div className="mt-6 overflow-x-auto overflow-y-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                    <table className="min-w-[760px] w-full text-left text-base text-slate-900">
                        <thead className="bg-[#053354] text-white">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Order #</th>
                                <th className="px-6 py-3 font-semibold">Customer</th>
                                <th className="px-6 py-3 font-semibold">Total</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                                <th className="px-6 py-3 font-semibold">Payment</th>
                                <th className="px-6 py-3 text-right font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.data.map((order, index) => (
                                <tr key={order.id} className={index % 2 === 0 ? 'bg-white' : 'bg-rose-50/40'}>
                                    <td className="px-6 py-3 font-semibold">#{order.id}</td>
                                    <td className="px-6 py-3">
                                        <p>{order.user?.name ?? 'Guest'}</p>
                                        <p className="text-sm text-slate-500">{order.user?.email ?? '-'}</p>
                                    </td>
                                    <td className="px-6 py-3">{formatKes(Number(order.total_amount))}</td>
                                    <td className="px-6 py-3">
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
                                    <td className="px-6 py-3 text-sm text-slate-700">
                                        <p className="font-medium uppercase">{order.payment_method}</p>
                                        <p>{order.payment_status}</p>
                                        {order.payment_method === 'mpesa' && order.mpesa_receipt_number && <p>Receipt: {order.mpesa_receipt_number}</p>}
                                    </td>
                                    <td className="px-6 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                type="button"
                                                className="cursor-pointer rounded-lg bg-blue-600 px-2 py-1 text-xs font-medium text-white hover:bg-blue-700"
                                                onClick={() => router.visit(`/admin/orders/${order.id}`)}
                                            >
                                                Show
                                            </button>
                                            <button
                                                type="button"
                                                className="cursor-pointer rounded-lg bg-green-600 px-2 py-1 text-xs font-medium text-white hover:bg-green-700"
                                                onClick={() => router.visit(`/admin/orders/${order.id}/edit`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="cursor-pointer rounded-lg bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700"
                                                onClick={() => router.delete(`/admin/orders/${order.id}`)}
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
                    {orders.links.map((link, index) => (
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
