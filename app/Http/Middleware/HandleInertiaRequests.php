<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = "app";

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $navigation = $this->navigation($request);

        return [
            ...parent::share($request),
            "auth" => [
                "user" => $user,
                "roles" => $user?->getRoleNames()->values() ?? [],
            ],
            "navigation" => $navigation,
            "activeModuleKey" => $this->activeModuleKey($request, $navigation),
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    protected function navigation(Request $request): array
    {
        $user = $request->user();
        $modules = collect(config("navigation.modules", []));

        if (!$user) {
            return [];
        }

        return $modules
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

    /**
     * @param array<int, array<string, mixed>> $navigation
     */
    protected function activeModuleKey(
        Request $request,
        array $navigation,
    ): ?string {
        $currentRoute = $request->route()?->getName();
        if (!$currentRoute) {
            return null;
        }

        if ($currentRoute === "modules.show") {
            return (string) $request->route("module");
        }

        foreach ($navigation as $module) {
            foreach ($module["menus"] as $menu) {
                if (($menu["route"] ?? null) === $currentRoute) {
                    return (string) ($module["key"] ?? "");
                }
            }
        }

        return null;
    }
}
