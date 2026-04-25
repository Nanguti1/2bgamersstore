import { router } from '@inertiajs/react';

export default function AdminOrdersShow({ order }: { order: any }): JSX.Element {
    return (
        <main className="min-h-screen bg-[#f3f4f6] p-6 md:p-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6">
                    <button
                        onClick={() => router.visit('/admin/orders')}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        ← Back to Orders
                    </button>
                </div>
                <h1 className="text-3xl font-semibold text-slate-900 mb-6">Order Details</h1>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">Order Information</h2>
                        <div className="space-y-3">
                            <div>
                                <h3 className="font-semibold text-slate-700">Order ID</h3>
                                <p className="text-slate-900">#{order.id}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-700">Status</h3>
                                <p className="text-slate-900">{order.status}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-700">Payment Status</h3>
                                <p className="text-slate-900">{order.payment_status}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-700">Total Amount</h3>
                                <p className="text-slate-900">{order.total_amount}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-700">Payment Method</h3>
                                <p className="text-slate-900">{order.payment_method}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">Customer Information</h2>
                        <div className="space-y-3">
                            <div>
                                <h3 className="font-semibold text-slate-700">Name</h3>
                                <p className="text-slate-900">{order.first_name} {order.last_name}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-700">Email</h3>
                                <p className="text-slate-900">{order.email}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-700">Phone</h3>
                                <p className="text-slate-900">{order.phone}</p>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">Order Items</h2>
                        <div className="space-y-3">
                            {order.items?.map((item: any) => (
                                <div key={item.id} className="flex justify-between border-b border-zinc-200 pb-3">
                                    <div>
                                        <p className="font-medium text-slate-900">{item.product?.name}</p>
                                        <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="text-slate-900">{item.line_total}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
