<?php

namespace App\Http\Requests\Checkout;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user();
    }

    public function rules(): array
    {
        $rules = [
            'line_1' => ['required', 'string', 'max:255'],
            'line_2' => ['nullable', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:120'],
            'state' => ['required', 'string', 'max:120'],
            'postal_code' => ['required', 'string', 'max:20'],
            'country' => ['required', 'string', 'size:2'],
            'payment_method' => ['required', 'in:mpesa,cash,bank'],
        ];

        // Only require mpesa_phone if payment method is mpesa
        if ($this->input('payment_method') === 'mpesa') {
            $rules['mpesa_phone'] = ['required', 'string', 'regex:/^2547\d{8}$/'];
        } else {
            $rules['mpesa_phone'] = ['nullable', 'string'];
        }

        return $rules;
    }
}
