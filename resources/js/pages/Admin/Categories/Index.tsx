type Category = {
    id: number;
    name: string;
    description: string | null;
};

export default function AdminCategoriesIndex({ categories }: { categories: { data: Category[] } }): JSX.Element {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">Manage Categories</h1>
            <div className="mt-4 space-y-2">
                {categories.data.map((category) => (
                    <div key={category.id} className="rounded border p-3">
                        <p className="font-semibold">{category.name}</p>
                        <p className="text-sm text-zinc-500">{category.description ?? 'No description'}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}
