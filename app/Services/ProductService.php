<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

class ProductService
{
    /**
     * @param array{search?: string|null, category?: string|null, per_page?: int|null} $filters
     */
    public function listActiveProducts(array $filters = []): LengthAwarePaginator
    {
        $searchTerm = trim((string) ($filters['search'] ?? ''));
        $categoryFilter = trim((string) ($filters['category'] ?? ''));
        $perPage = (int) ($filters['per_page'] ?? 20);

        if ($perPage < 1) {
            $perPage = 20;
        }

        if ($perPage > 40) {
            $perPage = 40;
        }

        return Product::query()
            ->with('category:id,name,slug')
            ->where('is_active', true)
            ->when($searchTerm !== '', function (Builder $query) use ($searchTerm): void {
                $query->where(function (Builder $searchQuery) use ($searchTerm): void {
                    $searchQuery
                        ->where('name', 'like', "%{$searchTerm}%")
                        ->orWhere('description', 'like', "%{$searchTerm}%")
                        ->orWhereHas('category', function (Builder $categoryQuery) use ($searchTerm): void {
                            $categoryQuery
                                ->where('name', 'like', "%{$searchTerm}%")
                                ->orWhere('slug', 'like', "%{$searchTerm}%");
                        });
                });
            })
            ->when($categoryFilter !== '', function (Builder $query) use ($categoryFilter): void {
                $query->whereHas('category', function (Builder $categoryQuery) use ($categoryFilter): void {
                    $categoryQuery
                        ->where('slug', $categoryFilter)
                        ->orWhere('name', $categoryFilter);
                });
            })
            ->latest('id')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function listFeaturedActiveProducts(int $perPage = 12): LengthAwarePaginator
    {
        return Product::query()
            ->with('category:id,name,slug')
            ->where('is_active', true)
            ->where('featured', true)
            ->latest('id')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function getBySlug(string $slug): Product
    {
        return Product::query()->with(['category', 'variants'])->where('slug', $slug)->firstOrFail();
    }
}
