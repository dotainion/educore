<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HR\Department;

class DepartmentSeeder extends Seeder{

    public function run(): void
    {
        Department::updateOrCreate([
            'code' => 'HR',
        ],[
            'name' => 'Human Resource',
            'code' => 'HR',
            'status' => 'active',
        ]);
        Department::updateOrCreate([
            'code' => 'IT',
        ],[
            'name' => 'Information Technology',
            'code' => 'IT',
            'status' => 'active',
        ]);
    }
}

