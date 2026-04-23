export default function AdminDashboard({ stats }: { stats: Record<string, number> }): JSX.Element {
    return (
        <main className="space-y-4 p-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-3">
                {Object.entries(stats).map(([label, value]) => <div key={label} className="rounded border p-4">{label}: {value}</div>)}
            </div>
        </main>
    );
}
