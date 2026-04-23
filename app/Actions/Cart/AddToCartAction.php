<?php

namespace App\Actions\Cart;

use App\Models\Cart;
use App\Models\Product;

class AddToCartAction
{
    public function execute(Cart $cart, Product $product, int $quantity): void
    {
        $item = $cart->items()->firstOrNew(['product_id' => $product->id]);
        $item->quantity = min($product->stock, $item->quantity + $quantity);
        $item->save();
    }
}
