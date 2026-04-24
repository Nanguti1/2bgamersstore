<?php

namespace Database\Factories;

use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Factories\Factory;

class TestimonialFactory extends Factory
{
    protected $model = Testimonial::class;

    public function definition(): array
    {
        $testimonials = [
            [
                'author' => 'James Thompson',
                'role' => 'Gaming Enthusiast',
                'content' => 'Absolutely incredible selection of gaming products! The quality and customer service exceeded my expectations. Highly recommend!',
            ],
            [
                'author' => 'Sarah Mitchell',
                'role' => 'Competitive Gamer',
                'content' => 'Fast shipping, genuine products, and excellent support. This is my go-to gaming store. They really understand gamers!',
            ],
            [
                'author' => 'David Chen',
                'role' => 'PC Builder',
                'content' => 'The variety and expertise here is unmatched. Their staff knows their stuff and helped me build my dream gaming setup.',
            ],
            [
                'author' => 'Emma Rodriguez',
                'role' => 'Console Gamer',
                'content' => 'Best gaming store I\'ve found! Great prices, amazing selection, and they actually care about customer satisfaction.',
            ],
            [
                'author' => 'Michael Park',
                'role' => 'Streamer',
                'content' => 'As a streamer, I rely on quality gear. This store delivers every single time. Definitely my recommendation for all gamers!',
            ],
        ];

        $testimonial = $this->faker->randomElement($testimonials);

        return [
            'author' => $testimonial['author'],
            'role' => $testimonial['role'],
            'avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=' . $testimonial['author'],
            'content' => $testimonial['content'],
            'rating' => $this->faker->numberBetween(4, 5),
            'is_published' => true,
        ];
    }
}
