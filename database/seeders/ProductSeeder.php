<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::query()->delete();

        $categories = [
            ['name' => 'Phones', 'slug' => 'phones'],
            ['name' => 'TVs', 'slug' => 'tvs'],
            ['name' => 'Consoles', 'slug' => 'consoles'],
        ];

        $categoryMap = [];
        foreach ($categories as $category) {
            $cat = Category::updateOrCreate(
                ['slug' => $category['slug']],
                ['name' => $category['name']]
            );
            $categoryMap[$category['name']] = $cat->id;
        }

        $products = [
            [
                'name' => 'iPhone 15 128GB (Physical SIM)',
                'slug' => 'iphone-15-128gb-physical-sim',
                'category_id' => $categoryMap['Phones'],
                'description' => 'Brand new iPhone 15 (128GB) with physical SIM support, ideal for Kenyan users who prefer Safaricom, Airtel, or Telkom lines without eSIM setup. Enjoy a bright display, smooth performance, and dependable battery life for daily business, social media, and photography in Nairobi and beyond.',
                'price' => 85000,
                'stock' => 20,
                'image' => 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800',
                'is_active' => true,
            ],
            [
                'name' => 'iPhone 16 128GB (Physical SIM)',
                'slug' => 'iphone-16-128gb-physical-sim',
                'category_id' => $categoryMap['Phones'],
                'description' => 'Brand new iPhone 16 (128GB) physical SIM edition designed for fast 4G/5G connectivity in Kenya. A perfect choice for professionals and students needing reliable performance, excellent camera quality, and secure iOS experience.',
                'price' => 103000,
                'stock' => 18,
                'image' => 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800',
                'is_active' => true,
            ],
            [
                'name' => 'iPhone 16 256GB (Physical SIM)',
                'slug' => 'iphone-16-256gb-physical-sim',
                'category_id' => $categoryMap['Phones'],
                'description' => 'Brand new iPhone 16 (256GB) physical SIM model with extra storage for photos, videos, and business apps. Built for the Kenyan market with smooth multitasking, premium build quality, and all-day usability.',
                'price' => 107000,
                'stock' => 16,
                'image' => 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
                'is_active' => true,
            ],
            [
                'name' => 'iPhone 16 Pro 128GB (Physical SIM)',
                'slug' => 'iphone-16-pro-128gb-physical-sim',
                'category_id' => $categoryMap['Phones'],
                'description' => 'Brand new iPhone 16 Pro (128GB) physical SIM variant with flagship camera features, premium finish, and powerful chip performance. Great for creators, entrepreneurs, and power users across Kenya.',
                'price' => 145000,
                'stock' => 14,
                'image' => 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800',
                'is_active' => true,
            ],
            [
                'name' => 'iPhone 16 Pro Max 256GB (Physical SIM)',
                'slug' => 'iphone-16-pro-max-256gb-physical-sim',
                'category_id' => $categoryMap['Phones'],
                'description' => 'Brand new iPhone 16 Pro Max (256GB) physical SIM model offering immersive display quality, long battery life, and advanced camera controls. A premium option for users seeking top-tier iPhone performance in Kenya.',
                'price' => 170000,
                'stock' => 12,
                'image' => 'https://images.unsplash.com/photo-1678911820864-e62981f08d79?w=800',
                'is_active' => true,
            ],
            [
                'name' => 'iPhone 17 256GB (Physical SIM)',
                'slug' => 'iphone-17-256gb-physical-sim',
                'category_id' => $categoryMap['Phones'],
                'description' => 'Brand new iPhone 17 (256GB) physical SIM version tailored for users who need high storage and smooth day-to-day reliability. Perfect for photography, mobile work, and entertainment on Kenyan mobile networks.',
                'price' => 120000,
                'stock' => 12,
                'image' => 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=800',
                'is_active' => true,
            ],
            [
                'name' => 'iPhone 17 Pro 256GB (Physical SIM)',
                'slug' => 'iphone-17-pro-256gb-physical-sim',
                'category_id' => $categoryMap['Phones'],
                'description' => 'Brand new iPhone 17 Pro (256GB) physical SIM with pro-level camera output and responsive performance. Built for creators and business users who demand speed, clarity, and reliability in the Kenyan market.',
                'price' => 175000,
                'stock' => 10,
                'image' => 'https://images.unsplash.com/photo-1603891128711-11b4b03bb138?w=800',
                'is_active' => true,
            ],
            [
                'name' => 'iPhone 17 Pro Max 256GB (Physical SIM)',
                'slug' => 'iphone-17-pro-max-256gb-physical-sim',
                'category_id' => $categoryMap['Phones'],
                'description' => 'Brand new iPhone 17 Pro Max (256GB) physical SIM delivering premium flagship performance and superior camera detail. A high-end choice for customers in Kenya who want top Apple features and strong battery confidence.',
                'price' => 203000,
                'stock' => 9,
                'image' => 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800',
                'is_active' => true,
            ],
            [
                'name' => 'iPhone 17 Pro Max 512GB (Physical SIM)',
                'slug' => 'iphone-17-pro-max-512gb-physical-sim',
                'category_id' => $categoryMap['Phones'],
                'description' => 'Brand new iPhone 17 Pro Max (512GB) physical SIM with large storage for 4K videos, high-resolution photos, and demanding apps. Excellent for content creators and professionals in Kenya needing more room and premium speed.',
                'price' => 230000,
                'stock' => 8,
                'image' => 'https://images.unsplash.com/photo-1510557880182-3f8f6f8f7f1a?w=800',
                'is_active' => true,
            ],
            [
                'name' => 'iPhone 17 Air 256GB (eSIM)',
                'slug' => 'iphone-17-air-256gb-esim',
                'category_id' => $categoryMap['Phones'],
                'description' => 'Brand new iPhone 17 Air (256GB) eSIM model with a sleek lightweight design for modern mobile lifestyles. Optimized for users in Kenya using eSIM activation on compatible networks for quick setup and travel flexibility.',
                'price' => 130000,
                'stock' => 10,
                'image' => 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
                'is_active' => true,
            ],
            [
                'name' => 'iPhone 16 128GB (eSIM)',
                'slug' => 'iphone-16-128gb-esim',
                'category_id' => $categoryMap['Phones'],
                'description' => 'Brand new iPhone 16 (128GB) eSIM variant that offers smooth iOS performance and digital SIM convenience. Ideal for users in Kenya who want cleaner dual-line setup without a physical SIM tray.',
                'price' => 85000,
                'stock' => 14,
                'image' => 'https://images.unsplash.com/photo-1603898037225-1f06f4f9cc31?w=800',
                'is_active' => true,
            ],
            [
                'name' => 'iPhone 17 256GB (eSIM)',
                'slug' => 'iphone-17-256gb-esim',
                'category_id' => $categoryMap['Phones'],
                'description' => 'Brand new iPhone 17 (256GB) eSIM model with strong battery life, elegant finish, and enough storage for everyday work and media. A dependable premium smartphone for Kenyan professionals and students.',
                'price' => 115000,
                'stock' => 12,
                'image' => 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=800',
                'is_active' => true,
            ],
            [
                'name' => 'iPhone 17 Pro 256GB (eSIM)',
                'slug' => 'iphone-17-pro-256gb-esim',
                'category_id' => $categoryMap['Phones'],
                'description' => 'Brand new iPhone 17 Pro (256GB) eSIM with advanced camera capability and high-performance chip architecture. Suitable for Kenyan users who need premium productivity and professional-grade mobile content capture.',
                'price' => 172000,
                'stock' => 10,
                'image' => 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800',
                'is_active' => true,
            ],
            [
                'name' => 'iPhone 17 Pro 512GB (eSIM)',
                'slug' => 'iphone-17-pro-512gb-esim',
                'category_id' => $categoryMap['Phones'],
                'description' => 'Brand new iPhone 17 Pro (512GB) eSIM for users who store large files, shoot lots of content, and multitask heavily. Designed for premium Kenyan smartphone buyers seeking storage headroom and smooth top-end performance.',
                'price' => 190000,
                'stock' => 8,
                'image' => 'https://images.unsplash.com/photo-1468071174046-657d9d351a40?w=800',
                'is_active' => true,
            ],
            [
                'name' => 'iPhone 17 Pro Max 512GB (eSIM)',
                'slug' => 'iphone-17-pro-max-512gb-esim',
                'category_id' => $categoryMap['Phones'],
                'description' => 'Brand new iPhone 17 Pro Max (512GB) eSIM with high-capacity storage, top camera experience, and long battery endurance. Excellent for Kenyan entrepreneurs, creators, and tech enthusiasts who demand flagship performance.',
                'price' => 215000,
                'stock' => 8,
                'image' => 'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?w=800',
                'is_active' => true,
            ],
            [
                'name' => 'iPhone 17 Pro Max 1TB (eSIM)',
                'slug' => 'iphone-17-pro-max-1tb-esim',
                'category_id' => $categoryMap['Phones'],
                'description' => 'Brand new iPhone 17 Pro Max (1TB) eSIM built for maximum storage needs in Kenya, from high-resolution content libraries to intensive business workflows. A true premium flagship for customers who need no compromises.',
                'price' => 235000,
                'stock' => 6,
                'image' => 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
                'is_active' => true,
            ],
            [
                'name' => 'PS5 Slim Disc Version',
                'slug' => 'ps5-slim-disc-version',
                'category_id' => $categoryMap['Consoles'],
                'description' => 'Brand new PS5 Slim Disc Version with next-gen graphics, ultra-fast load speeds, and physical disc support. A premium gaming console for Kenyan gamers who want both digital convenience and disc collection flexibility.',
                'price' => 920000,
                'stock' => 5,
                'image' => 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800',
                'is_active' => true,
            ],
            [
                'name' => 'PS4 Slim New 500GB',
                'slug' => 'ps4-slim-new-500gb',
                'category_id' => $categoryMap['Consoles'],
                'description' => 'Brand new PS4 Slim 500GB, ideal for reliable and affordable gaming in Kenya. Enjoy popular PlayStation titles, smooth gameplay, and compact design suitable for home entertainment setups.',
                'price' => 38000,
                'stock' => 10,
                'image' => 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800',
                'is_active' => true,
            ],
            [
                'name' => 'PS4 Slim Ex-UK 500GB',
                'slug' => 'ps4-slim-ex-uk-500gb',
                'category_id' => $categoryMap['Consoles'],
                'description' => 'PS4 Slim Ex-UK 500GB in excellent condition, offering value-focused PlayStation gaming for the Kenyan market. A great budget-friendly choice for FIFA, Call of Duty, and family gaming.',
                'price' => 24000,
                'stock' => 12,
                'image' => 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800',
                'is_active' => true,
            ],
            [
                'name' => 'PS4 Standard Ex-UK 500GB',
                'slug' => 'ps4-standard-ex-uk-500gb',
                'category_id' => $categoryMap['Consoles'],
                'description' => 'PS4 Standard Ex-UK 500GB for gamers in Kenya looking for affordable console performance and a strong game library. A practical entry-level PlayStation option for home and casual gaming.',
                'price' => 22000,
                'stock' => 12,
                'image' => 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800',
                'is_active' => true,
            ],
        ];

        Product::query()->createMany($products);
    }
}
