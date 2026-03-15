<?php

namespace Modules\Master\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            "category_id" => ["nullable", "exists:categories,id"],
            "name" => ["required", "string", "max:150"],
            "sku" => ["required", "string", "max:80", Rule::unique("products", "sku")],
            "barcode" => ["nullable", "string", "max:120", Rule::unique("products", "barcode")],
            "unit" => ["required", "string", "max:30"],
            "cost_price" => ["required", "numeric", "min:0"],
            "sell_price" => ["required", "numeric", "min:0"],
            "minimum_stock" => ["required", "integer", "min:0"],
            "current_stock" => ["nullable", "integer", "min:0"],
            "is_active" => ["nullable", "boolean"],
        ];
    }
}
