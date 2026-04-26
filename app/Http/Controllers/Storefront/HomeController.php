<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use App\Services\ProductService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(ProductService $productService): Response
    {
        return Inertia::render('Store/Home', [
            'featuredProducts' => $productService->listFeaturedActiveProducts(20)->items(),
            'testimonials' => Testimonial::where('is_published', true)->limit(3)->get(),
        ]);
    }
}
