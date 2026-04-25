<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\ProductService;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(ProductService $productService): Response
    {
        return Inertia::render('Products/Index', [
            'products' => $productService->listActiveProducts(),
        ]);
    }

    public function show(ProductService $productService, string $slug): Response
    {
        $product = $productService->getBySlug($slug);
        $reviewSummary = Product::query()
            ->whereKey($product->id)
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->firstOrFail();

        return Inertia::render('Products/Show', [
            'product' => $product,
            'reviews' => $product->reviews()
                ->with('user:id,name')
                ->latest()
                ->get(['id', 'product_id', 'user_id', 'rating', 'comment', 'created_at']),
            'reviewStats' => [
                'average_rating' => round((float) ($reviewSummary->reviews_avg_rating ?? 0), 1),
                'total_reviews' => (int) $reviewSummary->reviews_count,
            ],
        ]);
    }
}
