<?php

namespace Modules\Core\Services;

use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Support\Facades\DB;

class DashboardService
{
    /**
     * @return array<string, mixed>
     */
    public function stats(): array
    {
        $today = now()->toDateString();
        $start = now()->subDays(6)->startOfDay();
        $end = now()->endOfDay();

        $salesToday = (float) Sale::query()
            ->whereDate("sold_at", $today)
            ->sum("grand_total");

        $totalTransactions = Sale::query()
            ->whereDate("sold_at", $today)
            ->count();

        $lowStockProducts = Product::query()
            ->whereColumn("current_stock", "<=", "minimum_stock")
            ->count();

        $stockUnits = (int) Product::query()->sum("current_stock");

        $trendRaw = Sale::query()
            ->selectRaw("DATE(sold_at) as sale_date, SUM(grand_total) as total")
            ->whereBetween("sold_at", [$start, $end])
            ->groupBy("sale_date")
            ->pluck("total", "sale_date");

        $salesTrend = collect(range(0, 6))
            ->map(function (int $offset) use ($start, $trendRaw) {
                $date = $start->copy()->addDays($offset);
                $key = $date->toDateString();

                return [
                    "label" => $date->translatedFormat("D"),
                    "value" => (float) ($trendRaw[$key] ?? 0),
                ];
            })
            ->values();

        $topProducts = SaleItem::query()
            ->join("products", "products.id", "=", "sale_items.product_id")
            ->join("sales", "sales.id", "=", "sale_items.sale_id")
            ->whereBetween("sales.sold_at", [
                now()->startOfMonth(),
                now()->endOfMonth(),
            ])
            ->groupBy("sale_items.product_id", "products.name")
            ->orderByDesc(DB::raw("SUM(sale_items.quantity)"))
            ->limit(4)
            ->get([
                "products.name",
                DB::raw("SUM(sale_items.quantity) as sold"),
            ])
            ->map(fn ($item) => [
                "name" => $item->name,
                "sold" => (int) $item->sold,
            ])
            ->values();

        $lowStockItems = Product::query()
            ->whereColumn("current_stock", "<=", "minimum_stock")
            ->orderBy("current_stock")
            ->limit(5)
            ->get(["name", "sku", "unit", "current_stock", "minimum_stock"])
            ->map(fn (Product $item) => [
                "name" => $item->name,
                "sku" => $item->sku,
                "stock" => $item->current_stock,
                "minimum" => $item->minimum_stock,
                "unit" => $item->unit,
            ])
            ->values();

        return [
            "salesToday" => $salesToday,
            "totalTransactions" => $totalTransactions,
            "lowStockProducts" => $lowStockProducts,
            "stockUnits" => $stockUnits,
            "salesTrend" => $salesTrend,
            "topProducts" => $topProducts,
            "lowStockItems" => $lowStockItems,
        ];
    }
}
