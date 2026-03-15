<?php

return [
    "modules" => [
        [
            "key" => "core",
            "label" => "Core",
            "description" =>
                "Pengaturan inti sistem, user, role, permission, dashboard.",
            "menus" => [
                [
                    "label" => "Dashboard Operasional",
                    "route" => "core.dashboard",
                    "permission" => "dashboard.view",
                ],
                [
                    "label" => "User Management",
                    "route" => "users.index",
                    "permission" => "users.view",
                ],
            ],
        ],
        [
            "key" => "master",
            "label" => "Master",
            "description" =>
                "Data referensi utama: kategori, produk, supplier.",
            "menus" => [
                [
                    "label" => "Kategori",
                    "route" => "categories.index",
                    "permission" => "categories.view",
                ],
                [
                    "label" => "Produk",
                    "route" => "products.index",
                    "permission" => "products.view",
                ],
                [
                    "label" => "Supplier",
                    "route" => "suppliers.index",
                    "permission" => "suppliers.view",
                ],
            ],
        ],
        [
            "key" => "pos",
            "label" => "POS",
            "description" =>
                "Transaksi kasir, pembayaran, dan riwayat penjualan.",
            "menus" => [
                [
                    "label" => "Kasir (POS)",
                    "route" => "pos.index",
                    "permission" => "pos.access",
                ],
            ],
        ],
        [
            "key" => "inventory",
            "label" => "Inventory",
            "description" => "Stok, mutasi, pembelian, dan laporan inventory.",
            "menus" => [
                [
                    "label" => "Inventory",
                    "route" => "inventory.index",
                    "permission" => "inventory.view",
                ],
                [
                    "label" => "Pembelian",
                    "route" => "purchases.index",
                    "permission" => "purchases.view",
                ],
            ],
        ],
        [
            "key" => "hrd",
            "label" => "HRD",
            "description" => "Pengelolaan staff, absensi, dan payroll.",
            "menus" => [
                [
                    "label" => "Staff",
                    "route" => "staff.index",
                    "permission" => "staff.view",
                ],
                [
                    "label" => "Absensi",
                    "route" => "attendance.index",
                    "permission" => "attendance.view",
                ],
                [
                    "label" => "Payroll",
                    "route" => "payroll.index",
                    "permission" => "payroll.view",
                ],
            ],
        ],
    ],
];
