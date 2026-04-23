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
    public function execute(Cart $cart, Order $order): Order
    {
        return DB::transaction(function () use ($cart, $order): Order {
            foreach ($cart->items as $item) {
                $item->product()->decrement('stock', $item->quantity);
            }

            $order->payment()->create([
                'amount' => $order->total_amount,
                'status' => PaymentStatus::Paid,
                'reference' => 'MOCK-'.Str::upper(Str::random(12)),
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
