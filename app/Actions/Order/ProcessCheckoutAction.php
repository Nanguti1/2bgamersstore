<?php

namespace App\Actions\Order;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProcessCheckoutAction
{
    public function execute(Cart $cart, Order $order, string $paymentMethod): Order
    {
        return DB::transaction(function () use ($cart, $order, $paymentMethod): Order {
            foreach ($cart->items as $item) {
                $item->product()->decrement('stock', $item->quantity);
            }

            $order->payment()->create([
                'amount' => $order->total_amount + $order->shipping_amount + $order->tax_amount,
                'status' => PaymentStatus::Paid,
                'reference' => 'MPESA-' . strtoupper(Str::random(10)),
                'payment_method' => $paymentMethod,
            ]);

            $order->update([
                'status' => OrderStatus::Processing,
                'payment_status' => PaymentStatus::Paid,
            ]);

            $cart->items()->delete();

            return $order->fresh(['items.product', 'payment']);
        });
    }
}
