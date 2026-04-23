<?php

namespace Tests\Feature\Ecommerce;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CheckoutProcessTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_complete_checkout_process(): void
    {
        $user = User::factory()->create();
        $product = Product::factory()->create(['stock' => 10]);
        $cart = Cart::factory()->create(['user_id' => $user->id]);
        $cart->items()->create(['product_id' => $product->id, 'quantity' => 2]);

        $this->actingAs($user)->post(route('checkout.store'), [
            'line_1' => '100 Main St',
            'line_2' => null,
            'city' => 'Austin',
            'state' => 'TX',
            'postal_code' => '73301',
            'country' => 'US',
        ])->assertRedirect(route('products.index'));

        $this->assertDatabaseCount('orders', 1);
        $this->assertDatabaseCount('payments', 1);
    }
}
