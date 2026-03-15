<?php

namespace Modules\Master\Services;

use App\Models\Category;
use Illuminate\Support\Str;

class CategoryService
{
    /**
     * @param array<string, mixed> $data
     */
    public function create(array $data): Category
    {
        return Category::query()->create([
            "name" => $data["name"],
            "slug" => $this->uniqueSlug($data["name"]),
        ]);
    }

    /**
     * @param array<string, mixed> $data
     */
    public function update(Category $category, array $data): Category
    {
        $category->update([
            "name" => $data["name"],
            "slug" => $this->uniqueSlug($data["name"], $category->id),
        ]);

        return $category->refresh();
    }

    public function delete(Category $category): void
    {
        $category->delete();
    }

    protected function uniqueSlug(string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name);
        $slug = $base;
        $count = 2;

        while (
            Category::query()
                ->when($ignoreId, fn ($q) => $q->where("id", "!=", $ignoreId))
                ->where("slug", $slug)
                ->exists()
        ) {
            $slug = "{$base}-{$count}";
            $count++;
        }

        return $slug;
    }
}
