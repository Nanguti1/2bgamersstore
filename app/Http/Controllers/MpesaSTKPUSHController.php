<?php

namespace App\Http\Controllers;

use App\Mpesa\STKPush;
use App\Models\MpesaSTK;
use Iankumu\Mpesa\Facades\Mpesa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MpesaSTKPUSHController extends Controller
{
    public int $result_code = 1;
    public string $result_desc = 'An error occurred';

    public function STKPush(Request $request): array
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'phonenumber' => 'required|string',
            'account_number' => 'required|string',
        ]);

        $amount = $request->input('amount');
        $phoneno = $request->input('phonenumber');
        $account_number = $request->input('account_number');
        $callbackUrl = config('mpesa.callbacks.callback_url');

        Log::info('Manual STK push endpoint called.', [
            'amount' => $amount,
            'phone' => $phoneno,
            'account_number' => $account_number,
            'callback_url' => $callbackUrl,
        ]);

        Log::info('Manual STK push endpoint called.', [
            'amount' => $amount,
            'phone' => $phoneno,
            'account_number' => $account_number,
        ]);

        $response = Mpesa::stkpush(
            phonenumber: $phoneno,
            amount: $amount,
            account_number: $account_number,
            callbackurl: $callbackUrl,
            transactionType: Mpesa::PAYBILL
        );

        $result = $response->json();

        Log::info('Manual STK push API response.', ['response' => $result]);

        MpesaSTK::create([
            'merchant_request_id' => $result['MerchantRequestID'],
            'checkout_request_id' => $result['CheckoutRequestID'],
        ]);

        return $result;
    }

    public function STKConfirm(Request $Request): array
    {
        Log::info('STK confirm endpoint hit.', ['payload' => $Request->getContent()]);

        $stk_push_confirm = (new STKPush())->confirm($Request);

        if ($stk_push_confirm) {
            $this->result_code = 0;
            $this->result_desc = 'Success';
        }

        return [
            'ResultCode' => $this->result_code,
            'ResultDesc' => $this->result_desc,
        ];
    }
}
