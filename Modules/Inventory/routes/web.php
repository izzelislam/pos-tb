<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(["auth", "verified"])->group(function () {
    Route::get(
        "/inventory",
        fn() => Inertia::render("modules/Inventory/Stock/IndexPage"),
    )
        ->middleware("permission:inventory.view")
        ->name("inventory.index");

    Route::get(
        "/purchases",
        fn() => Inertia::render("modules/Inventory/Purchases/IndexPage"),
    )
        ->middleware("permission:purchases.view")
        ->name("purchases.index");

    Route::get(
        "/reports",
        fn() => Inertia::render("modules/Inventory/Reports/IndexPage"),
    )
        ->middleware("permission:reports.view")
        ->name("reports.index");
});
