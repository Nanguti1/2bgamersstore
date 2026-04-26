export function ThinHero({ title }: { title: string }): JSX.Element {
    return (
        <section
            className="border-b border-zinc-800 bg-cover bg-center"
            style={{ backgroundImage: "linear-gradient(rgba(3, 7, 18, 0.82), rgba(3, 7, 18, 0.82)), url('/banners/2b-gamers-store-hero-banner-ps5.jpg')" }}
        >
            <div className="mx-auto max-w-screen-2xl px-8 py-10">
                <h1 className="text-2xl font-bold text-white md:text-3xl">{title}</h1>
            </div>
        </section>
    );
}
