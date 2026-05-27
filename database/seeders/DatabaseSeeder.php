<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    protected array $production = [
        DepartmentSeeder::class,
        RolePermissionSeeder::class,
        AdminAccountSeeder::class,
        DocumentTypeSeeder::class,
    ];
    protected array $development = [
        JobAndApplicantSeeder::class,
        LeaveRequestSeeder::class,
    ];

    private function seeders(): array{
        if(true){
            $this->production = [
                ...$this->production,
                ...$this->development
            ];
        }
        return $this->production;
    }

    public function run(): void
    {
        DB::transaction(function(){
            $this->call($this->seeders());
        });
    }
}
