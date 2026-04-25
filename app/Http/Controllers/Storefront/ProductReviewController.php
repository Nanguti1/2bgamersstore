<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Http\Requests\Review\StoreReviewRequest;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;

class ProductReviewController extends Controller
{
    public function store(StoreReviewRequest $request, Product $product): RedirectResponse
    {
        $product->reviews()->updateOrCreate(
            ['user_id' => $request->user()->id],
            $request->validated(),
        );

        return back();
    }
}
