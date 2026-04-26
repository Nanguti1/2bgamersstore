<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->unique()->words(3, true);

        return [
            'category_id' => Category::factory(),
            'name' => Str::title($name),
            'slug' => Str::slug($name),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 20, 300),
            'stock' => fake()->numberBetween(5, 100),
            'image' => 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
            'gallery' => [
                'https://images.unsplash.com/photo-1560253023-3ec5d502959f',
                'https://images.unsplash.com/photo-1598550476439-6847785fcea6',
            ],
            'is_active' => true,
            'featured' => false,
        ];
    }
}
