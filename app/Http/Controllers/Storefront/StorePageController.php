<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
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
        ]);
    }
}
