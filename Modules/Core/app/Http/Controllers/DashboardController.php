<?php

namespace Modules\Core\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Core\Services\DashboardService;

class DashboardController extends Controller
{
    public function __invoke(DashboardService $dashboardService): Response
    {
        return Inertia::render("modules/Core/Dashboard/IndexPage", [
            "stats" => $dashboardService->stats(),
        ]);
    }
}
