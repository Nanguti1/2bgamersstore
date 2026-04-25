const formatLabel = (label: string): string => {
    return label
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function AdminDashboard({ stats }: { stats: Record<string, number> }): JSX.Element {
    return (
        <main className="min-h-screen bg-[#f3f4f6] p-6 md:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <section className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm">
                    <p className="text-sm tracking-[0.35em] text-slate-500 uppercase">Platform Overview</p>
                    <div className="mt-4 flex items-center justify-between gap-4">
                        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Admin Dashboard</h1>
                        <div className="rounded-2xl bg-slate-800 p-4 text-white shadow-lg">
                            <div className="grid grid-cols-2 gap-1.5">
                                <span className="h-2.5 w-2.5 rounded-sm border border-white/80" />
                                <span className="h-2.5 w-2.5 rounded-sm border border-white/80" />
                                <span className="h-2.5 w-2.5 rounded-sm border border-white/80" />
                                <span className="h-2.5 w-2.5 rounded-sm border border-white/80" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {Object.entries(stats).map(([label, value]) => (
                        <article key={label} className="rounded-2xl border border-zinc-200 bg-zinc-100 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
                            <p className="text-xs font-medium tracking-[0.22em] text-slate-500 uppercase">{formatLabel(label)}</p>
                            <p className="mt-4 text-5xl leading-none font-semibold text-slate-950">{value}</p>
                        </article>
                    ))}
                </section>
            </div>
        </main>
    );
}
