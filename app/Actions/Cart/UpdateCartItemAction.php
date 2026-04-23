<?php

namespace App\Actions\Cart;

use App\Models\Cart;

class UpdateCartItemAction
{
    public function execute(Cart $cart, int $cartItemId, int $quantity): void
    {
        $cart->items()->whereKey($cartItemId)->update(['quantity' => max(1, $quantity)]);
    }
}
