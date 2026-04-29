<?php

namespace App\Mpesa;

use App\Enums\PaymentStatus;
use App\Models\MpesaSTK;
use App\Models\Order;
use Illuminate\Http\Request;

class STKPush
{
    public bool $failed = false;
    public string $response = 'An Unknown Error Occurred';

    public function confirm(Request $request): self
    {
        $payload = json_decode($request->getContent());

        if (property_exists($payload, 'Body') && $payload->Body->stkCallback->ResultCode == '0') {
            $merchant_request_id = $payload->Body->stkCallback->MerchantRequestID;
            $checkout_request_id = $payload->Body->stkCallback->CheckoutRequestID;
            $result_desc = $payload->Body->stkCallback->ResultDesc;
            $result_code = $payload->Body->stkCallback->ResultCode;

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
                'result_code' => $result_code,
                'merchant_request_id' => $merchant_request_id,
                'checkout_request_id' => $checkout_request_id,
                'amount' => $amount,
                'mpesa_receipt_number' => $mpesa_receipt_number,
                'transaction_date' => $transaction_date,
                'phonenumber' => $phonenumber,
            ];

            if ($stkPush) {
                $stkPush->fill($data)->save();
            } else {
                $stkPush = MpesaSTK::create($data);
            }

            // Update order payment status if payment was successful
            if ($result_code == '0') {
                $order = Order::where('id', $mpesa_receipt_number)
                    ->orWhere('mpesa_phone', $phonenumber)
                    ->where('payment_method', 'mpesa')
                    ->where('payment_status', PaymentStatus::Pending)
                    ->first();

                if ($order) {
                    $order->update([
                        'payment_status' => PaymentStatus::Paid,
                    ]);
                }
            }
        } else {
            $this->failed = true;
        }

        return $this;
    }
}
