<?php

namespace Tests\Feature\Ecommerce;

use App\Models\MpesaSTK;
use App\Models\Order;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MpesaStkCallbackTest extends TestCase
{
    use RefreshDatabase;

    public function test_successful_stk_callback_updates_existing_record(): void
    {
        $order = Order::factory()->create([
            'payment_method' => 'mpesa',
            'payment_status' => 'pending',
            'mpesa_phone' => '254700000000',
        ]);

        MpesaSTK::create([
            'order_id' => $order->id,
            'merchant_request_id' => 'merchant-1',
            'checkout_request_id' => 'checkout-1',
            'amount' => '2.00',
            'phonenumber' => '254700000000',
        ]);

        $payload = [
            'Body' => [
                'stkCallback' => [
                    'MerchantRequestID' => 'merchant-1',
                    'CheckoutRequestID' => 'checkout-1',
                    'ResultCode' => 0,
                    'ResultDesc' => 'The service request is processed successfully.',
                    'CallbackMetadata' => [
                        'Item' => [
                            ['Name' => 'Amount', 'Value' => 2],
                            ['Name' => 'MpesaReceiptNumber', 'Value' => 'ABC123XYZ'],
                            ['Name' => 'TransactionDate', 'Value' => '20260502053736'],
                            ['Name' => 'PhoneNumber', 'Value' => 254700000000],
                        ],
                    ],
                ],
            ],
        ];

        $this->postJson(route('mpesa.confirm'), $payload)
            ->assertOk()
            ->assertJson([
                'ResultCode' => 0,
                'ResultDesc' => 'Success',
            ]);

        $this->assertDatabaseHas('mpesa_s_t_k_s', [
            'order_id' => $order->id,
            'merchant_request_id' => 'merchant-1',
            'checkout_request_id' => 'checkout-1',
            'result_code' => '0',
            'mpesa_receipt_number' => 'ABC123XYZ',
            'transaction_date' => '20260502053736',
            'phonenumber' => '254700000000',
        ]);

        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'payment_method' => 'mpesa',
            'payment_status' => 'paid',
            'mpesa_receipt_number' => 'ABC123XYZ',
            'paid_at' => '2026-05-02 05:37:36',
        ]);
    }
}
