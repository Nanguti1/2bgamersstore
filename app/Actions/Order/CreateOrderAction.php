<?php

namespace App\Actions\Order;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Models\Address;
use App\Models\Cart;
use App\Models\Order;

class CreateOrderAction
{
    public function execute(Cart $cart, Address $address, float $totalAmount, ?string $mpesaPhone, float $shippingAmount, float $taxAmount, string $paymentMethod, string $firstName, string $lastName, string $email, string $phone): Order
    {
        $order = Order::create([
            'user_id' => $cart->user_id,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $email,
            'phone' => $phone,
            'address_id' => $address->id,
            'mpesa_phone' => $mpesaPhone,
            'total_amount' => $totalAmount,
            'shipping_amount' => $shippingAmount,
            'tax_amount' => $taxAmount,
            'payment_method' => $paymentMethod,
            'status' => OrderStatus::Pending,
            'payment_status' => PaymentStatus::Pending,
        ]);

        $items = $cart->items->map(function ($item): array {
            return [
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'unit_price' => $item->product->price,
                'line_total' => (float) $item->product->price * $item->quantity,
            ];
        })->all();

        $order->items()->createMany($items);

        return $order;
    }
}
