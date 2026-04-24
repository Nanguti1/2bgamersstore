import { Link, router } from '@inertiajs/react';

type Product = {
    id: number;
    name: string;
    price: string;
    stock: number;
    is_active: boolean;
    category?: {
        name: string;
    };
};

export default function AdminProductsIndex({ products }: { products: { data: Product[] } }): JSX.Element {
    return (
        <main className="p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Manage Products</h1>
                <Link href="/admin/products/create" className="rounded bg-blue-600 px-4 py-2 text-white">
                    Add Product
                </Link>
            </div>

            <div className="mt-4 overflow-hidden rounded border">
                <table className="min-w-full text-sm">
                    <thead className="bg-zinc-50 text-left">
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Stock</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.data.map((product) => (
                            <tr key={product.id} className="border-t">
                                <td className="px-4 py-2 font-medium">{product.name}</td>
                                <td className="px-4 py-2">{product.category?.name ?? 'N/A'}</td>
                                <td className="px-4 py-2">${product.price}</td>
                                <td className="px-4 py-2">{product.stock}</td>
                                <td className="px-4 py-2">{product.is_active ? 'Active' : 'Inactive'}</td>
                                <td className="px-4 py-2 text-right">
                                    <button type="button" className="text-red-600" onClick={() => router.delete(`/admin/products/${product.id}`)}>
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
