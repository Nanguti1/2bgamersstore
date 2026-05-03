<?php

namespace Tests\Feature\Ecommerce;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use App\Mail\OrderPlacedNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class CheckoutProcessTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_complete_checkout_process(): void
    {
        Mail::fake();

        config(['mail.order_notification_recipient' => 'g.nanguti@gmail.com']);

        $user = User::factory()->create();
        $product = Product::factory()->create(['stock' => 10]);
        $cart = Cart::factory()->create(['user_id' => $user->id]);
        $cart->items()->create(['product_id' => $product->id, 'variant_id' => 0, 'quantity' => 2]);

        $this->actingAs($user)->post(route('checkout.store'), [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'phone' => '0712345678',
            'line_1' => '100 Main St',
            'line_2' => null,
            'city' => 'Austin',
            'state' => 'TX',
            'postal_code' => '73301',
            'country' => 'US',
            'payment_method' => 'cash',
        ])->assertRedirect(route('home'));

        $this->assertDatabaseCount('orders', 1);
        $this->assertDatabaseCount('payments', 1);
        $this->assertDatabaseHas('order_items', [
            'product_id' => $product->id,
            'variant_id' => null,
            'quantity' => 2,
        ]);

        Mail::assertQueued(OrderPlacedNotification::class, function (OrderPlacedNotification $mail): bool {
            return $mail->hasTo('g.nanguti@gmail.com');
        });
    }

    public function test_user_cannot_checkout_with_empty_cart(): void
    {
        Mail::fake();

        $user = User::factory()->create();

        $this->actingAs($user)->post(route('checkout.store'), [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'phone' => '0712345678',
            'line_1' => '100 Main St',
            'line_2' => null,
            'city' => 'Austin',
            'state' => 'TX',
            'postal_code' => '73301',
            'country' => 'US',
            'payment_method' => 'cash',
        ])->assertRedirect(route('cart.index'));

        $this->assertDatabaseCount('orders', 0);
        Mail::assertNothingQueued();
    }
}
