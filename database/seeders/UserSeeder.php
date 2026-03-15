<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Owner Toko',
                'email' => 'owner@tokobangunan.test',
                'role' => 'Owner',
            ],
            [
                'name' => 'Admin Operasional',
                'email' => 'admin@tokobangunan.test',
                'role' => 'Admin',
            ],
            [
                'name' => 'Kasir Utama',
                'email' => 'kasir@tokobangunan.test',
                'role' => 'Kasir',
            ],
            [
                'name' => 'Staff Gudang',
                'email' => 'gudang@tokobangunan.test',
                'role' => 'Staff Gudang',
            ],
            [
                'name' => 'HR Admin',
                'email' => 'hr@tokobangunan.test',
                'role' => 'HR/Admin',
            ],
        ];

        foreach ($users as $entry) {
            $user = User::query()->updateOrCreate(
                ['email' => $entry['email']],
                [
                    'name' => $entry['name'],
                    'password' => 'password',
                    'email_verified_at' => now(),
                ]
            );

            $user->syncRoles([$entry['role']]);
        }
    }
}
