export default function AdminOrdersIndex({ orders }: { orders: { data: any[] } }): JSX.Element {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">Orders</h1>
            <div className="mt-4 space-y-2">
                {orders.data.map((order) => <div key={order.id} className="rounded border p-3">Order #{order.id}</div>)}
            </div>
        </main>
    );
}
