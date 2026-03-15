<?php

use Illuminate\Support\Facades\Route;
use Modules\HRD\Http\Controllers\HRDController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('hrds', HRDController::class)->names('hrd');
});
