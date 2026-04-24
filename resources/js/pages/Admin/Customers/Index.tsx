type Customer = {
    id: number;
    name: string;
    email: string;
};

export default function AdminCustomersIndex({ customers }: { customers: { data: Customer[] } }): JSX.Element {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">Manage Customers</h1>
            <div className="mt-4 space-y-2">
                {customers.data.map((customer) => (
                    <div key={customer.id} className="rounded border p-3">
                        <p className="font-semibold">{customer.name}</p>
                        <p className="text-sm text-zinc-500">{customer.email}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}
