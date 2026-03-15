<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(["auth", "verified"])->group(function () {
    Route::get("/pos", fn() => Inertia::render("modules/POS/Cashier/IndexPage"))
        ->middleware("permission:pos.access")
        ->name("pos.index");
});
