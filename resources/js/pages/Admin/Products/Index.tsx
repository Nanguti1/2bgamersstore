export default function AdminProductsIndex({ products }: { products: { data: any[] } }): JSX.Element {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">Manage Products</h1>
            <div className="mt-4 space-y-2">
                {products.data.map((product) => <div key={product.id} className="rounded border p-3">{product.name}</div>)}
            </div>
        </main>
    );
}
