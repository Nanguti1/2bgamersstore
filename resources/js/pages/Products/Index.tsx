import { Footer } from '@/components/store/footer';
import { Navbar } from '@/components/store/navbar';
import { ProductCard } from '@/components/store/product-card';

export default function ProductIndex({ products }: { products: { data: any[] } }): JSX.Element {
    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100">
            <Navbar />
            <section className="mx-auto max-w-screen-2xl px-8 py-12">
                <h1 className="text-3xl font-bold">Products</h1>
                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {products.data.map((product) => <ProductCard key={product.id} product={product} />)}
                </div>
            </section>
            <Footer />
        </main>
    );
}
