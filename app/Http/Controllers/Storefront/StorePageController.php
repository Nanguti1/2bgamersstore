<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductReview;
use Inertia\Inertia;
use Inertia\Response;

class StorePageController extends Controller
{
    public function __invoke(string $page): Response
    {
        $titles = [
            'store' => 'Visit Store',
            'consultation' => 'Setup Consultation',
            'community' => 'Community',
            'events' => 'Today\'s Events',
            'about' => 'About Us',
            'account' => 'Account',
            'careers' => 'Careers',
            'blog' => 'Blog',
            'help' => 'Help Ticket',
            'track-order' => 'Track Order',
            'wishlist' => 'Wishlist',
        ];

        abort_unless(isset($titles[$page]), 404);

        return Inertia::render('Store/Info', [
            'title' => $titles[$page],
            'page' => $page,
            'consultationPrefill' => [
                'name' => request()->user()?->name,
                'email' => request()->user()?->email,
            ],
            'community' => $page === 'community' ? [
                'products' => Product::query()
                    ->where('is_active', true)
                    ->latest()
                    ->paginate(8, ['id', 'name', 'slug', 'price', 'image'], 'products_page')
                    ->withQueryString(),
                'reviews' => ProductReview::query()
                    ->with(['product:id,name,slug,image', 'user:id,name'])
                    ->latest()
                    ->paginate(8, ['id', 'product_id', 'user_id', 'rating', 'comment', 'created_at'], 'reviews_page')
                    ->withQueryString(),
            ] : null,
        ]);
    }
}
