<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate';

    protected $description = 'Generate sitemap.xml for published categories and products';

    public function handle(): int
    {
        $sitemap = Sitemap::create()->add(url('/'));

        Category::query()->whereHas('products', fn ($query) => $query->where('is_active', true))
            ->select(['id', 'slug', 'updated_at'])
            ->chunkById(200, function ($categories) use ($sitemap): void {
                foreach ($categories as $category) {
                    $sitemap->add($category);
                }
            });

        Product::query()->where('is_active', true)
            ->select(['id', 'slug', 'updated_at'])
            ->chunkById(200, function ($products) use ($sitemap): void {
                foreach ($products as $product) {
                    $sitemap->add($product);
                }
            });

        $sitemap->writeToFile(public_path('sitemap.xml'));

        return self::SUCCESS;
    }
}
