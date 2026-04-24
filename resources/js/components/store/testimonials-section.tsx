import { Star } from 'lucide-react';

interface Testimonial {
    id: number;
    author: string;
    role: string;
    avatar: string;
    content: string;
    rating: number;
}

export function TestimonialsSection({ testimonials = [] }: { testimonials: Testimonial[] }) {
    const defaultTestimonials: Testimonial[] = [
        {
            id: 1,
            author: 'James Thompson',
            role: 'Gaming Enthusiast',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
            content: 'Absolutely incredible selection of gaming products! The quality and customer service exceeded my expectations. Highly recommend!',
            rating: 5,
        },
        {
            id: 2,
            author: 'Sarah Mitchell',
            role: 'Competitive Gamer',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
            content: 'Fast shipping, genuine products, and excellent support. This is my go-to gaming store. They really understand gamers!',
            rating: 5,
        },
        {
            id: 3,
            author: 'David Chen',
            role: 'PC Builder',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
            content: 'The variety and expertise here is unmatched. Their staff knows their stuff and helped me build my dream gaming setup.',
            rating: 5,
        },
    ];

    const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

    return (
        <section className="mx-auto max-w-7xl px-6 py-16">
            <div className="text-center">
                <p className="text-sm font-semibold text-blue-400">WHAT GAMERS SAY</p>
                <h2 className="mt-2 text-3xl font-bold md:text-4xl">Trusted by Gaming Community</h2>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
                {displayTestimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="flex flex-col rounded-lg border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-950 p-6"
                    >
                        <div className="mb-4 flex gap-1">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                                <Star
                                    key={i}
                                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                />
                            ))}
                        </div>

                        <p className="mb-6 flex-1 text-gray-300">{testimonial.content}</p>

                        <div className="flex items-center gap-3">
                            <img
                                src={testimonial.avatar}
                                alt={testimonial.author}
                                className="h-10 w-10 rounded-full bg-gray-700"
                            />
                            <div>
                                <p className="font-semibold text-white">{testimonial.author}</p>
                                <p className="text-sm text-gray-400">{testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
