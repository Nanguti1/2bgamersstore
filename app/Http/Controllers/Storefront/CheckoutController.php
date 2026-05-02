<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Http\Requests\Checkout\CheckoutRequest;
use App\Models\Order;
use App\Models\MpesaSTK;
use App\Services\CartService;
use App\Services\OrderService;
use Iankumu\Mpesa\Facades\Mpesa;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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

        // Create order first
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

        // If payment method is Mpesa, initiate STK Push
        if ($paymentMethod === 'mpesa' && $mpesaPhone) {
            $amount = $order->total_amount;
            $callbackUrl = config('mpesa.callbacks.callback_url');

            $response = Mpesa::stkpush(
                phonenumber: $mpesaPhone,
                amount: $amount,
                account_number: $order->id,
                callbackurl: $callbackUrl,
                transactionType: Mpesa::PAYBILL
            );

            $result = $response->json();

            // Store the STK Push request details
            MpesaSTK::create([
                'merchant_request_id' => $result['MerchantRequestID'],
                'checkout_request_id' => $result['CheckoutRequestID'],
                'order_id' => $order->id,
                'amount' => (string) $amount,
                'phonenumber' => $mpesaPhone,
            ]);

            return redirect()->route('checkout.awaiting', $order);
        }

        return redirect()->route('home')->with('success', 'Order placed successfully!');
    }

    public function awaiting(Order $order): Response
    {
        abort_if($order->user_id !== auth()->id(), 403);

        return Inertia::render('Checkout/AwaitingPayment', [
            'order' => $order->only(['id', 'total_amount', 'payment_status', 'payment_method', 'mpesa_phone', 'mpesa_receipt_number', 'paid_at']),
        ]);
    }

    public function paymentStatus(Order $order): JsonResponse
    {
        abort_if($order->user_id !== auth()->id(), 403);

        return response()->json([
            'payment_status' => $order->payment_status,
            'mpesa_receipt_number' => $order->mpesa_receipt_number,
            'paid_at' => $order->paid_at,
        ]);
    }

    public function retryMpesa(Request $request, Order $order): RedirectResponse
    {
        abort_if($order->user_id !== auth()->id(), 403);

        if ($order->payment_method !== 'mpesa' || ! $order->mpesa_phone) {
            return back()->with('error', 'This order is not eligible for M-Pesa retry.');
        }

        if ($order->payment_status->value === 'paid') {
            return back()->with('success', 'This order has already been paid.');
        }

        $response = Mpesa::stkpush(
            phonenumber: $order->mpesa_phone,
            amount: $order->total_amount,
            account_number: $order->id,
            callbackurl: config('mpesa.callbacks.callback_url'),
            transactionType: Mpesa::PAYBILL
        );

        $result = $response->json();

        MpesaSTK::create([
            'merchant_request_id' => $result['MerchantRequestID'],
            'checkout_request_id' => $result['CheckoutRequestID'],
            'order_id' => $order->id,
            'amount' => (string) $order->total_amount,
            'phonenumber' => $order->mpesa_phone,
        ]);

        return redirect()->route('checkout.awaiting', $order)->with('success', 'M-Pesa prompt resent. Complete payment on your phone.');
    }
}
