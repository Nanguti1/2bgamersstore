<?php

namespace App\Actions\Cart;

use App\Models\Cart;

class RemoveFromCartAction
{
    public function execute(Cart $cart, int $cartItemId): void
    {
        $cart->items()->whereKey($cartItemId)->delete();
    }
}
