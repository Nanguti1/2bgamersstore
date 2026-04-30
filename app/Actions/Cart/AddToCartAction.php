<?php

namespace App\Actions\Cart;

use App\Models\Cart;
use App\Models\Product;

class AddToCartAction
{
    public function execute(Cart $cart, Product $product, int $quantity, ?int $variantId = null): void
    {
        $conditions = ['product_id' => $product->id];
        if ($variantId !== null) {
            $conditions['variant_id'] = $variantId;
        }

        $item = $cart->items()->firstOrNew($conditions);

        $stockLimit = $variantId !== null
            ? $product->variants()->where('id', $variantId)->value('stock')
            : $product->stock;

        $currentQuantity = $item->quantity ?? 0;
        $item->quantity = min($stockLimit, $currentQuantity + $quantity);
        
        if ($variantId !== null) {
            $item->variant_id = $variantId;
        }
        
        $item->save();
    }
}
