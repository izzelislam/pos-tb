<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(["auth", "verified"])->group(function () {
    Route::get("/staff", fn() => Inertia::render("modules/HRD/Staff/IndexPage"))
        ->middleware("permission:staff.view")
        ->name("staff.index");

    Route::get(
        "/attendance",
        fn() => Inertia::render("modules/HRD/Attendance/IndexPage"),
    )
        ->middleware("permission:attendance.view")
        ->name("attendance.index");

    Route::get(
        "/payroll",
        fn() => Inertia::render("modules/HRD/Payroll/IndexPage"),
    )
        ->middleware("permission:payroll.view")
        ->name("payroll.index");
});
