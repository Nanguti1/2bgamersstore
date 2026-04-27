export function ThinHero({ title }: { title: string }): JSX.Element {
    return (
        <section
            className="border-b border-slate-200 bg-cover bg-center"
            style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.88), rgba(239, 246, 255, 0.88)), url('/banners/2b-gamers-store-hero-banner-ps5.jpg')" }}
        >
            <div className="mx-auto max-w-screen-2xl px-8 py-10">
                <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">{title}</h1>
            </div>
        </section>
    );
}
