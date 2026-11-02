<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    protected array $production = [
        RolePermissionSeeder::class,
        AdminAccountSeeder::class,
    ];
    protected array $development = [
        ClassFormSeeder::class,
        StudentSeeder::class,
        SubjectSeeder::class
    ];

    private function seeders(): array{
        if(app()->environment('local')){
            return [
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
