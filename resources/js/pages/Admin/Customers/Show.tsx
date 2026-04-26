import { router } from '@inertiajs/react';

export default function AdminCustomersShow({ customer }: { customer: any }): JSX.Element {
    return (
        <main className="min-h-screen bg-[#f3f4f6] p-6 md:p-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6">
                    <button
                        onClick={() => router.visit('/admin/customers')}
                        className="cursor-pointer text-blue-600 hover:text-blue-800"
                    >
                        ← Back to Customers
                    </button>
                </div>
                <button
                    type="button"
                    onClick={() => router.visit(`/admin/customers/${customer.id}/edit`)}
                    className="mb-6 cursor-pointer rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                    Edit Customer
                </button>
                <h1 className="text-3xl font-semibold text-slate-900 mb-6">Customer Details</h1>
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <div className="grid gap-4">
                        <div>
                            <h3 className="font-semibold text-slate-700">Name</h3>
                            <p className="text-slate-900">{customer.name}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-700">Email</h3>
                            <p className="text-slate-900">{customer.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
