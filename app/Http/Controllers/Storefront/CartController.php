<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Http\Requests\Cart\AddToCartRequest;
use App\Http\Requests\Cart\UpdateCartItemRequest;
use App\Models\Product;
use App\Services\CartService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index(CartService $cartService): Response
    {
        $cart = $cartService->getCart(auth()->user());

        return Inertia::render('Cart/Index', [
            'cart' => $cart,
            'total' => $cartService->total($cart),
        ]);
    }

    public function store(AddToCartRequest $request, CartService $cartService): RedirectResponse
    {
        $validated = $request->validated();
        $product = Product::query()->findOrFail($validated['product_id']);
        $variantId = $validated['variant_id'] ?? null;

        $cartService->addItem($request->user(), $product, $validated['quantity'], $variantId);

        return back();
    }

    public function update(UpdateCartItemRequest $request, int $item, CartService $cartService): RedirectResponse
    {
        $cartService->updateItem($request->user(), $item, $request->integer('quantity'));

        return back();
    }

    public function destroy(int $item, CartService $cartService): RedirectResponse
    {
        $cartService->removeItem(auth()->user(), $item);

        return back();
    }
}
