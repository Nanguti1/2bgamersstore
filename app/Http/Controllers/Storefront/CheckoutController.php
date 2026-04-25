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
        $address = $request->user()->addresses()->create([
            'line_1' => $request->validated('line_1'),
            'line_2' => $request->validated('line_2'),
            'city' => $request->validated('city'),
            'state' => $request->validated('state'),
            'postal_code' => $request->validated('postal_code'),
            'country' => $request->validated('country'),
        ]);

        $firstName = $request->validated('first_name');
        $lastName = $request->validated('last_name');
        $email = $request->validated('email');
        $phone = $request->validated('phone');
        $mpesaPhone = $request->validated('mpesa_phone') ?? null;
        $paymentMethod = $request->validated('payment_method');
        $shippingAmount = 650; // Fixed shipping cost
        $taxAmount = $orderService->cartService->total($orderService->cartService->getCart($request->user())) * 0.16;

        $order = $orderService->checkout(
            $request->user(),
            $address,
            $mpesaPhone,
            $shippingAmount,
            $taxAmount,
            $paymentMethod,
            $firstName,
            $lastName,
            $email,
            $phone
        );

        return redirect()->route('home')->with('success', 'Order placed successfully!');
    }
}
