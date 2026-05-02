<?php

namespace Tests\Feature\Ecommerce;

use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AwaitingMpesaPaymentTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_awaiting_payment_page_for_their_order(): void
    {
        $user = User::factory()->create();
        $order = Order::factory()->create([
            'user_id' => $user->id,
            'payment_method' => 'mpesa',
            'payment_status' => 'pending',
        ]);

        $this->actingAs($user)
            ->get(route('checkout.awaiting', $order))
            ->assertOk();
    }

    public function test_payment_status_endpoint_returns_order_payment_data(): void
    {
        $user = User::factory()->create();
        $order = Order::factory()->create([
            'user_id' => $user->id,
            'payment_method' => 'mpesa',
            'payment_status' => 'pending',
        ]);

        $this->actingAs($user)
            ->getJson(route('checkout.payment-status', $order))
            ->assertOk()
            ->assertJson([
                'payment_status' => 'pending',
            ]);
    }

    public function test_user_cannot_access_another_users_payment_status_endpoint(): void
    {
        $firstUser = User::factory()->create();
        $secondUser = User::factory()->create();

        $order = Order::factory()->create([
            'user_id' => $firstUser->id,
            'payment_method' => 'mpesa',
            'payment_status' => 'pending',
        ]);

        $this->actingAs($secondUser)
            ->getJson(route('checkout.payment-status', $order))
            ->assertForbidden();
    }
}
