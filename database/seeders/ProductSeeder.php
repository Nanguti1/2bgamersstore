<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Create or update categories
        $categories = [
            ['name' => 'Controllers', 'slug' => 'controllers'],
            ['name' => 'Headsets', 'slug' => 'headsets'],
            ['name' => 'Keyboards', 'slug' => 'keyboards'],
            ['name' => 'Mice', 'slug' => 'mice'],
            ['name' => 'Monitors', 'slug' => 'monitors'],
            ['name' => 'Gaming PCs', 'slug' => 'gaming-pcs'],
            ['name' => 'Laptops', 'slug' => 'laptops'],
        ];

        $categoryMap = [];
        foreach ($categories as $category) {
            $cat = Category::firstOrCreate(
                ['slug' => $category['slug']],
                ['name' => $category['name']]
            );
            $categoryMap[$category['name']] = $cat->id;
        }

        // Create products
        $products = [
            [
                'name' => 'Pro Gaming Controller X',
                'slug' => 'pro-gaming-controller-x',
                'category_id' => $categoryMap['Controllers'],
                'description' => 'High-performance gaming controller with customizable buttons and ergonomic design.',
                'price' => 79.99,
                'stock' => 50,
                'image' => 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=500',
                'is_active' => true,
            ],
            [
                'name' => 'Wireless Gaming Headset',
                'slug' => 'wireless-gaming-headset',
                'category_id' => $categoryMap['Headsets'],
                'description' => 'Premium wireless headset with 7.1 surround sound and noise cancellation.',
                'price' => 149.99,
                'stock' => 30,
                'image' => 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
                'is_active' => true,
            ],
            [
                'name' => 'Mechanical RGB Keyboard',
                'slug' => 'mechanical-rgb-keyboard',
                'category_id' => $categoryMap['Keyboards'],
                'description' => 'Mechanical keyboard with RGB lighting and Cherry MX switches.',
                'price' => 129.99,
                'stock' => 45,
                'image' => 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500',
                'is_active' => true,
            ],
            [
                'name' => 'Gaming Mouse Pro',
                'slug' => 'gaming-mouse-pro',
                'category_id' => $categoryMap['Mice'],
                'description' => 'High-precision gaming mouse with customizable DPI and ergonomic shape.',
                'price' => 59.99,
                'stock' => 60,
                'image' => 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
                'is_active' => true,
            ],
            [
                'name' => '4K Gaming Monitor',
                'slug' => '4k-gaming-monitor',
                'category_id' => $categoryMap['Monitors'],
                'description' => '27-inch 4K monitor with 144Hz refresh rate and HDR support.',
                'price' => 449.99,
                'stock' => 20,
                'image' => 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
                'is_active' => true,
            ],
            [
                'name' => 'Elite Controller Elite',
                'slug' => 'elite-controller-elite',
                'category_id' => $categoryMap['Controllers'],
                'description' => 'Premium controller with paddle buttons and adjustable tension sticks.',
                'price' => 179.99,
                'stock' => 25,
                'image' => 'https://images.unsplash.com/photo-1593305841991-05c29736cec7?w=500',
                'is_active' => true,
            ],
            [
                'name' => 'USB Gaming Headset',
                'slug' => 'usb-gaming-headset',
                'category_id' => $categoryMap['Headsets'],
                'description' => 'Wired gaming headset with crystal clear audio and comfortable fit.',
                'price' => 69.99,
                'stock' => 40,
                'image' => 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500',
                'is_active' => true,
            ],
            [
                'name' => 'Compact Gaming Keyboard',
                'slug' => 'compact-gaming-keyboard',
                'category_id' => $categoryMap['Keyboards'],
                'description' => '60% mechanical keyboard with hot-swappable switches.',
                'price' => 99.99,
                'stock' => 35,
                'image' => 'https://images.unsplash.com/photo-1587829741301-dc798b91add1?w=500',
                'is_active' => true,
            ],
            [
                'name' => 'Ultra Gaming Mouse',
                'slug' => 'ultra-gaming-mouse',
                'category_id' => $categoryMap['Mice'],
                'description' => 'Lightweight gaming mouse with 16000 DPI sensor.',
                'price' => 89.99,
                'stock' => 55,
                'image' => 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
                'is_active' => true,
            ],
            [
                'name' => 'Curved Gaming Monitor',
                'slug' => 'curved-gaming-monitor',
                'category_id' => $categoryMap['Monitors'],
                'description' => '34-inch curved monitor with 165Hz refresh rate.',
                'price' => 599.99,
                'stock' => 15,
                'image' => 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=500',
                'is_active' => true,
            ],
            [
                'name' => 'Gaming PC Ultimate',
                'slug' => 'gaming-pc-ultimate',
                'category_id' => $categoryMap['Gaming PCs'],
                'description' => 'High-end gaming PC with RTX 4080 and Intel i9.',
                'price' => 2499.99,
                'stock' => 10,
                'image' => 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500',
                'is_active' => true,
            ],
            [
                'name' => 'Gaming Laptop Pro',
                'slug' => 'gaming-laptop-pro',
                'category_id' => $categoryMap['Laptops'],
                'description' => '15-inch gaming laptop with RTX 4070 and 144Hz display.',
                'price' => 1899.99,
                'stock' => 12,
                'image' => 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
                'is_active' => true,
            ],
            [
                'name' => 'Wireless Controller Plus',
                'slug' => 'wireless-controller-plus',
                'category_id' => $categoryMap['Controllers'],
                'description' => 'Wireless controller with haptic feedback.',
                'price' => 99.99,
                'stock' => 40,
                'image' => 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500',
                'is_active' => true,
            ],
            [
                'name' => 'Gaming Headset 7.1',
                'slug' => 'gaming-headset-7-1',
                'category_id' => $categoryMap['Headsets'],
                'description' => 'Surround sound gaming headset with RGB lighting.',
                'price' => 119.99,
                'stock' => 35,
                'image' => 'https://images.unsplash.com/photo-1599669454699-248893623440?w=500',
                'is_active' => true,
            ],
            [
                'name' => 'Gaming Keyboard RGB',
                'slug' => 'gaming-keyboard-rgb',
                'category_id' => $categoryMap['Keyboards'],
                'description' => 'Full-size gaming keyboard with programmable keys.',
                'price' => 149.99,
                'stock' => 30,
                'image' => 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500',
                'is_active' => true,
            ],
            [
                'name' => 'Gaming Mouse Wireless',
                'slug' => 'gaming-mouse-wireless',
                'category_id' => $categoryMap['Mice'],
                'description' => 'Wireless gaming mouse with long battery life.',
                'price' => 79.99,
                'stock' => 45,
                'image' => 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500',
                'is_active' => true,
            ],
            [
                'name' => 'Gaming Monitor 144Hz',
                'slug' => 'gaming-monitor-144hz',
                'category_id' => $categoryMap['Monitors'],
                'description' => '24-inch gaming monitor with 1ms response time.',
                'price' => 299.99,
                'stock' => 25,
                'image' => 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
                'is_active' => true,
            ],
            [
                'name' => 'Gaming PC Starter',
                'slug' => 'gaming-pc-starter',
                'category_id' => $categoryMap['Gaming PCs'],
                'description' => 'Entry-level gaming PC with RTX 3060.',
                'price' => 1299.99,
                'stock' => 15,
                'image' => 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500',
                'is_active' => true,
            ],
            [
                'name' => 'Gaming Laptop Air',
                'slug' => 'gaming-laptop-air',
                'category_id' => $categoryMap['Laptops'],
                'description' => 'Thin and light gaming laptop.',
                'price' => 1599.99,
                'stock' => 18,
                'image' => 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
                'is_active' => true,
            ],
            [
                'name' => 'Pro Gaming Mouse',
                'slug' => 'pro-gaming-mouse',
                'category_id' => $categoryMap['Mice'],
                'description' => 'Professional gaming mouse with adjustable weight.',
                'price' => 69.99,
                'stock' => 50,
                'image' => 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
                'is_active' => true,
            ],
        ];

        foreach ($products as $product) {
            Product::firstOrCreate(
                ['slug' => $product['slug']],
                $product
            );
        }
    }
}
