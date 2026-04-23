<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Http\Requests\Checkout\CheckoutRequest;
use App\Services\CartService;
use App\Services\OrderService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function index(CartService $cartService): Response
    {
        $cart = $cartService->getCart(auth()->user());

        return Inertia::render('Checkout/Index', [
            'cart' => $cart,
            'total' => $cartService->total($cart),
        ]);
    }

    public function store(CheckoutRequest $request, OrderService $orderService): RedirectResponse
    {
        $address = $request->user()->addresses()->create($request->validated());
        $orderService->checkout($request->user(), $address);

        return redirect()->route('products.index');
    }
}
