<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Http\Requests\Checkout\CheckoutRequest;
use App\Models\MpesaSTK;
use App\Services\CartService;
use App\Services\OrderService;
use Iankumu\Mpesa\Facades\Mpesa;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
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

            Log::info('Initiating M-Pesa STK push from checkout.', [
                'order_id' => $order->id,
                'amount' => $amount,
                'phone' => $mpesaPhone,
                'payment_method' => $paymentMethod,
                'callback_url' => $callbackUrl,
            ]);

            if (! is_string($callbackUrl) || $callbackUrl === '' || ! str_starts_with($callbackUrl, 'https://')) {
                Log::warning('M-Pesa callback URL may be unreachable by Safaricom. Use a public HTTPS URL.', [
                    'app_url' => config('app.url'),
                    'callback_url' => $callbackUrl,
                ]);
            }

            $response = Mpesa::stkpush(
                phonenumber: $mpesaPhone,
                amount: $amount,
                account_number: $order->id,
                callbackurl: $callbackUrl,
                transactionType: Mpesa::PAYBILL
            );

            $result = $response->json();

            Log::info('M-Pesa STK push API response received.', [
                'order_id' => $order->id,
                'response' => $result,
            ]);

            // Store the STK Push request details
            MpesaSTK::create([
                'merchant_request_id' => $result['MerchantRequestID'],
                'checkout_request_id' => $result['CheckoutRequestID'],
                'amount' => (string) $amount,
                'phonenumber' => $mpesaPhone,
            ]);

            Log::info('Saved initial M-Pesa STK request record.', [
                'order_id' => $order->id,
                'merchant_request_id' => $result['MerchantRequestID'] ?? null,
                'checkout_request_id' => $result['CheckoutRequestID'] ?? null,
            ]);

            return redirect()->route('home')->with('success', 'Order placed successfully! Please complete the Mpesa payment on your phone.');
        }

        return redirect()->route('home')->with('success', 'Order placed successfully!');
    }
}
