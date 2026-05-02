<?php

namespace App\Mpesa;

use App\Enums\PaymentStatus;
use App\Models\MpesaSTK;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class STKPush
{
    public bool $failed = false;
    public string $response = 'An Unknown Error Occurred';

    public function confirm(Request $request): self
    {
        Log::info('M-Pesa STK callback received.', [
            'payload' => $request->getContent(),
        ]);

        $payload = json_decode($request->getContent());

        if (! property_exists($payload, 'Body') || ! property_exists($payload->Body, 'stkCallback')) {
            $this->failed = true;

            return $this;
        }

        $merchant_request_id = $payload->Body->stkCallback->MerchantRequestID;
        $checkout_request_id = $payload->Body->stkCallback->CheckoutRequestID;
        $result_desc = $payload->Body->stkCallback->ResultDesc;
        $result_code = (string) $payload->Body->stkCallback->ResultCode;

        if ($result_code === '0') {
            $metadata = $payload->Body->stkCallback->CallbackMetadata->Item;
            $amount = null;
            $mpesa_receipt_number = null;
            $transaction_date = null;
            $phonenumber = null;

            foreach ($metadata as $item) {
                if ($item->Name === 'Amount') {
                    $amount = $item->Value;
                } elseif ($item->Name === 'MpesaReceiptNumber') {
                    $mpesa_receipt_number = $item->Value;
                } elseif ($item->Name === 'TransactionDate') {
                    $transaction_date = $item->Value;
                } elseif ($item->Name === 'PhoneNumber') {
                    $phonenumber = $item->Value;
                }
            }

            $stkPush = MpesaSTK::where('merchant_request_id', $merchant_request_id)
                ->where('checkout_request_id', $checkout_request_id)
                ->first();

            $data = [
                'result_desc' => $result_desc,
                'result_code' => (string) $result_code,
                'merchant_request_id' => $merchant_request_id,
                'checkout_request_id' => $checkout_request_id,
                'amount' => $amount,
                'mpesa_receipt_number' => $mpesa_receipt_number,
                'transaction_date' => $transaction_date,
                'phonenumber' => $phonenumber,
            ];

            if ($stkPush) {
                $stkPush->fill($data)->save();
                Log::info('Updated existing M-Pesa STK record from callback.', $data);
            } else {
                $stkPush = MpesaSTK::create($data);
                Log::info('Created new M-Pesa STK record from callback.', $data);
            }

            $order = null;

                if ($stkPush?->order_id) {
                    $order = Order::query()
                        ->where('id', $stkPush->order_id)
                        ->where('payment_method', 'mpesa')
                        ->where('payment_status', PaymentStatus::Pending)
                        ->first();
                }

                if (! $order) {
                    $order = Order::query()
                        ->where('mpesa_phone', (string) $phonenumber)
                        ->where('payment_method', 'mpesa')
                        ->where('payment_status', PaymentStatus::Pending)
                        ->latest('id')
                        ->first();
                }

            if ($order && $mpesa_receipt_number) {
                $paidAt = is_numeric($transaction_date)
                    ? Carbon::createFromFormat('YmdHis', (string) $transaction_date)->toDateTimeString()
                    : now()->toDateTimeString();

                $order->update([
                    'payment_status' => PaymentStatus::Paid,
                    'mpesa_receipt_number' => (string) $mpesa_receipt_number,
                    'paid_at' => $paidAt,
                ]);

                $order->payment()->update([
                    'status' => PaymentStatus::Paid,
                    'reference' => (string) $mpesa_receipt_number,
                ]);
            }
        } else {
            $stkPush = MpesaSTK::where('merchant_request_id', $merchant_request_id)
                ->where('checkout_request_id', $checkout_request_id)
                ->first();

            if ($stkPush) {
                $stkPush->update([
                    'result_code' => $result_code,
                    'result_desc' => $result_desc,
                ]);

                if ($stkPush->order_id) {
                    $order = Order::query()->find($stkPush->order_id);

                    if ($order && $order->payment_status === PaymentStatus::Pending) {
                        $order->update(['payment_status' => PaymentStatus::Failed]);
                        $order->payment()->update(['status' => PaymentStatus::Failed]);
                    }
                }
            }

            $this->failed = true;

            Log::warning('M-Pesa STK callback indicates failure or invalid payload.', [
                'payload' => $request->getContent(),
            ]);
        }

        return $this;
    }
}
