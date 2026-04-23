<?php

namespace App\Actions\Cart;

use App\Models\Cart;

class CalculateCartTotalAction
{
    public function execute(Cart $cart): float
    {
        return (float) $cart->items->sum(function ($item): float {
            return (float) $item->product->price * $item->quantity;
        });
    }
}
