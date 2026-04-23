<?php

namespace Tests\Feature\Ecommerce;

use App\Enums\PaymentStatus;
use App\Models\Order;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderCreationTest extends TestCase
{
    use RefreshDatabase;

    public function test_order_factory_creates_pending_order(): void
    {
        $order = Order::factory()->create();

        $this->assertSame(PaymentStatus::Pending, $order->payment_status);
    }
}
