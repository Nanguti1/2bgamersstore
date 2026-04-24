type ProductModel = {
    id: number;
    name: string;
    category?: {
        name: string;
    };
};

export default function AdminModelsIndex({ products }: { products: { data: ProductModel[] } }): JSX.Element {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">Manage Models</h1>
            <p className="mt-1 text-sm text-zinc-500">Product models are currently represented by products and categories.</p>

            <div className="mt-4 space-y-2">
                {products.data.map((product) => (
                    <div key={product.id} className="rounded border p-3">
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-zinc-500">{product.category?.name ?? 'Uncategorized model'}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}
