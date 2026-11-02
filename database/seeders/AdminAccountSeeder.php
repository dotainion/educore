<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminAccountSeeder extends Seeder
{
    public function run(): void
    {
        $role = Role::firstOrCreate([
            'name' => 'super_admin'
        ]);

        $user = User::updateOrCreate([
            'email' => 'example@example.com',
        ],[
            'firstName' => 'System',
            'lastName' => 'Admin',
            'email' => 'example@example.com',
            'password' => Hash::make(env('APP_SUPER_ADMIN_PASSWORD')),
            'gender' => 'male',
            'contact' => null,
            'dob' => null,
            'status' => 'active',
        ]);

        if (!$user->hasRole('super_admin')) {
            $user->assignRole($role);
        }

        //$user->syncPermissions(Permission::all());
    }
}