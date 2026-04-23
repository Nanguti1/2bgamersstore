<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProductService
{
    public function listActiveProducts(int $perPage = 12): LengthAwarePaginator
    {
        return Product::query()
            ->with('category')
            ->where('is_active', true)
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function getBySlug(string $slug): Product
    {
        return Product::query()->with('category')->where('slug', $slug)->firstOrFail();
    }
}
