<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $permissions = [
            "dashboard.view",
            "categories.view",
            "products.view",
            "suppliers.view",
            "users.view",
            "pos.access",
            "inventory.view",
            "purchases.view",
            "staff.view",
            "attendance.view",
            "payroll.view",
            "reports.view",
        ];

        foreach ($permissions as $permissionName) {
            Permission::query()->firstOrCreate([
                "name" => $permissionName,
                "guard_name" => "web",
            ]);
        }

        $matrix = [
            "Owner" => $permissions,
            "Admin" => [
                "dashboard.view",
                "categories.view",
                "products.view",
                "suppliers.view",
                "users.view",
                "inventory.view",
                "purchases.view",
                "reports.view",
            ],
            "Kasir" => ["dashboard.view", "products.view", "pos.access"],
            "Staff Gudang" => [
                "dashboard.view",
                "products.view",
                "suppliers.view",
                "inventory.view",
                "purchases.view",
            ],
            "HR/Admin" => [
                "dashboard.view",
                "staff.view",
                "attendance.view",
                "payroll.view",
                "reports.view",
            ],
        ];

        foreach ($matrix as $roleName => $rolePermissions) {
            $role = Role::query()->firstOrCreate([
                "name" => $roleName,
                "guard_name" => "web",
            ]);

            $role->syncPermissions($rolePermissions);
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}
