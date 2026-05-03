<?php

namespace App\Http\Requests\Cart;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class AddToCartRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user();
    }

    public function rules(): array
    {
        return [
            'product_id' => ['required', 'integer', 'exists:products,id'],
            'variant_id' => ['nullable', 'integer', 'exists:product_variants,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            $product = Product::query()->find($this->integer('product_id'));

            if (! $product instanceof Product) {
                return;
            }

            $variantId = $this->input('variant_id');

            if ($variantId) {
                $variant = ProductVariant::query()
                    ->where('product_id', $product->id)
                    ->find($variantId);

                if (! $variant instanceof ProductVariant || $variant->stock <= 0) {
                    $validator->errors()->add('variant_id', 'This selected variant is out of stock.');
                }

                return;
            }

            if ($product->stock <= 0) {
                $validator->errors()->add('product_id', 'This product is out of stock.');
            }
        });
    }
}
