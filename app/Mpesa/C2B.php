<?php

namespace App\Mpesa;

use App\Enums\PaymentStatus;
use App\Models\MpesaC2B;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class C2B
{
    public function confirm(Request $request): array
    {
        Log::info('C2B Confirmation endpoint has been hit', ['payload' => $request->all()]);

        $payload = $request->all();

        $c2b = new MpesaC2B();
        $c2b->transaction_type = $payload['TransactionType'] ?? null;
        $c2b->transaction_id = $payload['TransID'] ?? null;
        $c2b->transaction_time = $payload['TransTime'] ?? null;
        $c2b->amount = $payload['TransAmount'] ?? null;
        $c2b->business_short_code = $payload['BusinessShortCode'] ?? null;
        $c2b->account_number = $payload['BillRefNumber'] ?? null;
        $c2b->invoice_number = $payload['InvoiceNumber'] ?? null;
        $c2b->organization_account_balance = $payload['OrgAccountBalance'] ?? null;
        $c2b->third_party_transaction_id = $payload['ThirdPartyTransID'] ?? null;
        $c2b->phonenumber = $payload['MSISDN'] ?? null;
        $c2b->first_name = $payload['FirstName'] ?? null;
        $c2b->middle_name = $payload['MiddleName'] ?? null;
        $c2b->last_name = $payload['LastName'] ?? null;
        $c2b->save();

        // Try to match this payment to an order
        // Match by account_number (BillRefNumber) which could be the order ID
        if ($c2b->account_number) {
            $order = Order::where('id', $c2b->account_number)
                ->where('payment_method', 'mpesa')
                ->where('payment_status', PaymentStatus::Pending)
                ->first();

            if ($order) {
                $order->update([
                    'payment_status' => PaymentStatus::Paid,
                ]);
                Log::info('Order payment status updated', ['order_id' => $order->id]);
            }
        }

        return $payload;
    }

    public function validate(Request $request): array
    {
        Log::info('C2B Validation endpoint has been hit', ['payload' => $request->all()]);

        // Default to accepting all transactions
        // You can add custom validation logic here
        // For example, validate account_number, amount, etc.

        return [
            'ResultCode' => '0',
            'ResultDesc' => 'Accepted',
        ];
    }
}
