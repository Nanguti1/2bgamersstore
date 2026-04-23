<?php

namespace App\Actions\Order;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Models\Address;
use App\Models\Cart;
use App\Models\Order;

class CreateOrderAction
{
    public function execute(Cart $cart, Address $address, float $totalAmount): Order
    {
        $order = Order::create([
            'user_id' => $cart->user_id,
            'address_id' => $address->id,
            'total_amount' => $totalAmount,
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
