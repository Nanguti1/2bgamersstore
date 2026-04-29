<?php

namespace App\Actions\Cart;

use App\Models\Cart;

class CalculateCartTotalAction
{
    public function execute(Cart $cart): float
    {
        return (float) $cart->items->sum(function ($item): float {
            $price = $item->variant ? $item->variant->price : $item->product->price;
            return (float) $price * $item->quantity;
        });
    }
}
