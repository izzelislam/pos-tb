<?php

namespace Modules\Core\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ModuleController extends Controller
{
    public function index(Request $request): Response
    {
        $modules = $this->allowedModules($request);

        return Inertia::render("modules/Core/Modules/IndexPage", [
            "modules" => $modules,
        ]);
    }

    public function show(Request $request, string $module): Response
    {
        $modules = collect($this->allowedModules($request));
        $selected = $modules->firstWhere("key", $module);

        abort_if(!$selected, 404);

        return Inertia::render("modules/Core/Modules/ShowPage", [
            "module" => $selected,
        ]);
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    protected function allowedModules(Request $request): array
    {
        $user = $request->user();
        if (!$user) {
            return [];
        }

        return collect(config("navigation.modules", []))
            ->map(function (array $module) use ($user) {
                $menus = collect($module["menus"] ?? [])
                    ->filter(function (array $menu) use ($user) {
                        $permission = $menu["permission"] ?? null;

                        return !$permission || $user->can($permission);
                    })
                    ->values()
                    ->all();

                return [
                    "key" => $module["key"] ?? "",
                    "label" => $module["label"] ?? "",
                    "description" => $module["description"] ?? "",
                    "menus" => $menus,
                ];
            })
            ->filter(fn(array $module) => !empty($module["menus"]))
            ->values()
            ->all();
    }
}
