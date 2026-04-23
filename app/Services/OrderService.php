<?php

namespace App\Services;

use App\Actions\Cart\CalculateCartTotalAction;
use App\Actions\Order\CreateOrderAction;
use App\Actions\Order\ProcessCheckoutAction;
use App\Models\Address;
use App\Models\Order;
use App\Models\User;

class OrderService
{
    public function __construct(
        public CartService $cartService,
        public CalculateCartTotalAction $calculateCartTotalAction,
        public CreateOrderAction $createOrderAction,
        public ProcessCheckoutAction $processCheckoutAction,
    ) {
    }

    public function checkout(User $user, Address $address): Order
    {
        $cart = $this->cartService->getCart($user);
        $total = $this->calculateCartTotalAction->execute($cart);
        $order = $this->createOrderAction->execute($cart, $address, $total);

        return $this->processCheckoutAction->execute($cart->load('items.product'), $order);
    }
}
