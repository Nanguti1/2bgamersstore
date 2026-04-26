<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->isAdmin();
    }

    public function rules(): array
    {
        return [
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('products', 'slug')->ignore($this->route('product'))],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'image' => ['nullable', 'image', 'max:4096'],
            'remove_primary_image' => ['nullable', 'boolean'],
            'gallery' => ['nullable', 'array', 'max:4'],
            'gallery.*' => ['image', 'max:4096'],
            'existing_gallery' => ['nullable', 'array', 'max:4'],
            'existing_gallery.*' => ['string', 'max:2048'],
            'is_active' => ['required', 'boolean'],
            'featured' => ['required', 'boolean'],
        ];
    }
}
