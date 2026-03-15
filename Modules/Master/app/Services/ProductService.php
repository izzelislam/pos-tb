<?php

namespace Modules\Master\Services;

use App\Models\Product;

class ProductService
{
    /**
     * @param array<string, mixed> $data
     */
    public function create(array $data): Product
    {
        return Product::query()->create($this->mapPayload($data));
    }

    /**
     * @param array<string, mixed> $data
     */
    public function update(Product $product, array $data): Product
    {
        $product->update($this->mapPayload($data));

        return $product->refresh();
    }

    public function delete(Product $product): void
    {
        $product->delete();
    }

    /**
     * @param array<string, mixed> $data
     * @return array<string, mixed>
     */
    protected function mapPayload(array $data): array
    {
        return [
            "category_id" => $data["category_id"] ?? null,
            "name" => $data["name"],
            "sku" => $data["sku"],
            "barcode" => $data["barcode"] ?? null,
            "unit" => $data["unit"],
            "cost_price" => $data["cost_price"],
            "sell_price" => $data["sell_price"],
            "minimum_stock" => $data["minimum_stock"],
            "current_stock" => $data["current_stock"] ?? 0,
            "is_active" => (bool) ($data["is_active"] ?? true),
        ];
    }
}
