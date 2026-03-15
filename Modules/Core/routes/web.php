<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Modules\Core\Http\Controllers\DashboardController;
use Modules\Core\Http\Controllers\ModuleController;

Route::middleware(["auth", "verified"])->group(function () {
    Route::get("/dashboard", [ModuleController::class, "index"])->name(
        "dashboard",
    );
    Route::get("/modules/{module}", [ModuleController::class, "show"])->name(
        "modules.show",
    );

    Route::get("/core/dashboard", DashboardController::class)
        ->middleware("permission:dashboard.view")
        ->name("core.dashboard");

    Route::get(
        "/users",
        fn() => Inertia::render("modules/Core/Users/IndexPage"),
    )
        ->middleware("permission:users.view")
        ->name("users.index");
});
