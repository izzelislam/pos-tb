<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Modules\Master\Http\Controllers\CategoryController;
use Modules\Master\Http\Controllers\ProductController;

Route::middleware(["auth", "verified"])->group(function () {
    Route::resource("categories", CategoryController::class)
        ->only(["index", "store", "update", "destroy"])
        ->middleware("permission:categories.view");

    Route::resource("products", ProductController::class)
        ->only(["index", "store", "update", "destroy"])
        ->middleware("permission:products.view");

    Route::get(
        "/suppliers",
        fn() => Inertia::render("modules/Master/Suppliers/IndexPage"),
    )
        ->middleware("permission:suppliers.view")
        ->name("suppliers.index");
});
