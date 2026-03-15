<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use App\Models\StockMovement;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DemoDataSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $categories = collect([
            "Semen",
            "Cat",
            "Besi",
            "Kayu",
            "Pipa",
        ])->mapWithKeys(function (string $name) {
            $category = Category::query()->firstOrCreate(
                ["slug" => Str::slug($name)],
                ["name" => $name],
            );

            return [$name => $category];
        });

        $products = [
            [
                "name" => "Semen Tiga Roda 50kg",
                "sku" => "SMN-TR-50",
                "category" => "Semen",
                "unit" => "sak",
                "cost" => 62000,
                "sell" => 69000,
                "minimum" => 30,
                "stock" => 85,
            ],
            [
                "name" => "Semen Gresik 50kg",
                "sku" => "SMN-GR-50",
                "category" => "Semen",
                "unit" => "sak",
                "cost" => 61000,
                "sell" => 68000,
                "minimum" => 30,
                "stock" => 64,
            ],
            [
                "name" => "Cat Tembok 5L",
                "sku" => "CAT-TB-5L",
                "category" => "Cat",
                "unit" => "kaleng",
                "cost" => 98000,
                "sell" => 125000,
                "minimum" => 12,
                "stock" => 24,
            ],
            [
                "name" => "Cat Besi Hitam 1L",
                "sku" => "CAT-BS-1L",
                "category" => "Cat",
                "unit" => "kaleng",
                "cost" => 46000,
                "sell" => 62000,
                "minimum" => 10,
                "stock" => 6,
            ],
            [
                "name" => "Besi Beton 10mm",
                "sku" => "BSI-BT-10",
                "category" => "Besi",
                "unit" => "batang",
                "cost" => 48000,
                "sell" => 57000,
                "minimum" => 35,
                "stock" => 51,
            ],
            [
                "name" => "Pipa PVC 3/4",
                "sku" => "PPA-PVC-34",
                "category" => "Pipa",
                "unit" => "batang",
                "cost" => 22000,
                "sell" => 29000,
                "minimum" => 25,
                "stock" => 42,
            ],
            [
                "name" => "Paku Beton 5cm",
                "sku" => "PKU-BT-5",
                "category" => "Besi",
                "unit" => "pack",
                "cost" => 8000,
                "sell" => 12000,
                "minimum" => 20,
                "stock" => 9,
            ],
            [
                "name" => 'Engsel Pintu 4"',
                "sku" => "ENG-PT-4",
                "category" => "Besi",
                "unit" => "pcs",
                "cost" => 12000,
                "sell" => 17500,
                "minimum" => 24,
                "stock" => 11,
            ],
        ];

        $productModels = collect($products)->map(function (array $item) use (
            $categories,
        ) {
            return Product::query()->updateOrCreate(
                ["sku" => $item["sku"]],
                [
                    "category_id" => $categories[$item["category"]]->id,
                    "name" => $item["name"],
                    "unit" => $item["unit"],
                    "cost_price" => $item["cost"],
                    "sell_price" => $item["sell"],
                    "minimum_stock" => $item["minimum"],
                    "current_stock" => $item["stock"],
                    "is_active" => true,
                ],
            );
        });

        $cashier = User::query()
            ->where("email", "kasir@tokobangunan.test")
            ->first();
        $operatorId = $cashier?->id;

        if (!$cashier) {
            return;
        }

        SaleItem::query()->delete();
        Sale::query()->delete();
        StockMovement::query()->delete();

        $dayTotals = [
            9200000,
            10100000,
            8850000,
            11300000,
            12500000,
            9800000,
            7300000,
        ];
        $paymentMethods = ["cash", "transfer", "qris"];

        foreach ($dayTotals as $idx => $total) {
            $date = now()
                ->subDays(6 - $idx)
                ->setTime(10, 0);
            $parts = [$total * 0.3, $total * 0.3, $total * 0.4];

            foreach ($parts as $partIndex => $part) {
                $subtotal = (float) round($part, 2);
                $discount = 0;
                $grandTotal = $subtotal - $discount;

                $sale = Sale::query()->create([
                    "invoice_number" => sprintf(
                        "INV-%s-%03d",
                        $date->format("Ymd"),
                        $partIndex + 1,
                    ),
                    "cashier_id" => $cashier->id,
                    "payment_method" =>
                        $paymentMethods[array_rand($paymentMethods)],
                    "subtotal" => $subtotal,
                    "discount_total" => $discount,
                    "grand_total" => $grandTotal,
                    "sold_at" => $date->copy()->addMinutes($partIndex * 20),
                ]);

                $chosenProducts = $productModels->shuffle()->take(3);
                $itemBudget = $grandTotal / max($chosenProducts->count(), 1);

                foreach ($chosenProducts as $product) {
                    $qty = max(
                        1,
                        (int) floor(
                            $itemBudget / max((float) $product->sell_price, 1),
                        ),
                    );
                    $lineTotal = $qty * (float) $product->sell_price;

                    SaleItem::query()->create([
                        "sale_id" => $sale->id,
                        "product_id" => $product->id,
                        "quantity" => $qty,
                        "unit_price" => $product->sell_price,
                        "discount" => 0,
                        "total_price" => $lineTotal,
                    ]);

                    $before = $product->current_stock;
                    $after = max(0, $before - $qty);
                    $product->update(["current_stock" => $after]);

                    StockMovement::query()->create([
                        "product_id" => $product->id,
                        "type" => "out",
                        "quantity" => $qty,
                        "stock_before" => $before,
                        "stock_after" => $after,
                        "reference_type" => Sale::class,
                        "reference_id" => $sale->id,
                        "note" => "Penjualan kasir",
                        "created_by" => $operatorId,
                    ]);
                }
            }
        }
    }
}
