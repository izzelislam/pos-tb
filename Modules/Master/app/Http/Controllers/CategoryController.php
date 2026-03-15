<?php

namespace Modules\Master\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Master\Http\Requests\StoreCategoryRequest;
use Modules\Master\Http\Requests\UpdateCategoryRequest;
use Modules\Master\Services\CategoryService;

class CategoryController extends Controller
{
    public function __construct(private readonly CategoryService $categoryService) {}

    public function index(Request $request): Response
    {
        $search = (string) $request->string("q");

        $categories = Category::query()
            ->withCount("products")
            ->when($search, fn ($query) => $query->where("name", "like", "%{$search}%"))
            ->orderBy("name")
            ->paginate(12)
            ->withQueryString();

        return Inertia::render("modules/Master/Categories/IndexPage", [
            "filters" => ["q" => $search],
            "categories" => $categories->through(fn (Category $category) => [
                "id" => $category->id,
                "name" => $category->name,
                "slug" => $category->slug,
                "products_count" => $category->products_count,
            ]),
        ]);
    }

    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        $this->categoryService->create($request->validated());

        return redirect()->route("categories.index")->with("success", "Kategori berhasil ditambahkan.");
    }

    public function update(UpdateCategoryRequest $request, Category $category): RedirectResponse
    {
        $this->categoryService->update($category, $request->validated());

        return redirect()->route("categories.index")->with("success", "Kategori berhasil diubah.");
    }

    public function destroy(Category $category): RedirectResponse
    {
        $this->categoryService->delete($category);

        return redirect()->route("categories.index")->with("success", "Kategori berhasil dihapus.");
    }
}
