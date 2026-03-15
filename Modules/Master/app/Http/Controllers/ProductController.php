<?php

namespace Modules\Master\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Master\Http\Requests\StoreProductRequest;
use Modules\Master\Http\Requests\UpdateProductRequest;
use Modules\Master\Services\ProductService;

class ProductController extends Controller
{
    public function __construct(private readonly ProductService $productService) {}

    public function index(Request $request): Response
    {
        $search = (string) $request->string("q");

        $products = Product::query()
            ->with("category:id,name")
            ->when($search, fn ($query) => $query
                ->where("name", "like", "%{$search}%")
                ->orWhere("sku", "like", "%{$search}%"))
            ->orderBy("name")
            ->paginate(12)
            ->withQueryString();

        return Inertia::render("modules/Master/Products/IndexPage", [
            "filters" => ["q" => $search],
            "products" => $products->through(fn (Product $product) => [
                "id" => $product->id,
                "name" => $product->name,
                "sku" => $product->sku,
                "barcode" => $product->barcode,
                "category_id" => $product->category_id,
                "category_name" => $product->category?->name,
                "unit" => $product->unit,
                "cost_price" => (float) $product->cost_price,
                "sell_price" => (float) $product->sell_price,
                "minimum_stock" => $product->minimum_stock,
                "current_stock" => $product->current_stock,
                "is_active" => $product->is_active,
            ]),
            "categories" => Category::query()
                ->orderBy("name")
                ->get(["id", "name"]),
        ]);
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        $this->productService->create($request->validated());

        return redirect()->route("products.index")->with("success", "Produk berhasil ditambahkan.");
    }

    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $this->productService->update($product, $request->validated());

        return redirect()->route("products.index")->with("success", "Produk berhasil diubah.");
    }

    public function destroy(Product $product): RedirectResponse
    {
        $this->productService->delete($product);

        return redirect()->route("products.index")->with("success", "Produk berhasil dihapus.");
    }
}
