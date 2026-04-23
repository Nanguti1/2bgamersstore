<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
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
        return Inertia::render('Products/Show', [
            'product' => $productService->getBySlug($slug),
        ]);
    }
}
