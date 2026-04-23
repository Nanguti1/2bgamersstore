<?php

namespace App\Services;

use App\Actions\Cart\AddToCartAction;
use App\Actions\Cart\CalculateCartTotalAction;
use App\Actions\Cart\RemoveFromCartAction;
use App\Actions\Cart\UpdateCartItemAction;
use App\Models\Cart;
use App\Models\Product;
use App\Models\User;

class CartService
{
    public function __construct(
        public AddToCartAction $addToCartAction,
        public RemoveFromCartAction $removeFromCartAction,
        public UpdateCartItemAction $updateCartItemAction,
        public CalculateCartTotalAction $calculateCartTotalAction,
    ) {
    }

    public function getCart(User $user): Cart
    {
        return Cart::query()->firstOrCreate(['user_id' => $user->id])->load('items.product');
    }

    public function addItem(User $user, Product $product, int $quantity): Cart
    {
        $cart = $this->getCart($user);
        $this->addToCartAction->execute($cart, $product, $quantity);

        return $this->getCart($user);
    }

    public function updateItem(User $user, int $cartItemId, int $quantity): Cart
    {
        $cart = $this->getCart($user);
        $this->updateCartItemAction->execute($cart, $cartItemId, $quantity);

        return $this->getCart($user);
    }

    public function removeItem(User $user, int $cartItemId): Cart
    {
        $cart = $this->getCart($user);
        $this->removeFromCartAction->execute($cart, $cartItemId);

        return $this->getCart($user);
    }

    public function total(Cart $cart): float
    {
        return $this->calculateCartTotalAction->execute($cart);
    }
}
