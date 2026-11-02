<?php

namespace Database\Seeders;

use App\Models\ClassForm;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ClassFormSeeder extends Seeder
{
    protected array $classes = [
        [
            'name' => 'Form 1',
            'level' => 1,
            'room' => null,
            'capacity' => 30,
            'status' => 'active',
            'description' => 'First form',
        ],
        [
            'name' => 'Form 2',
            'level' => 2,
            'room' => null,
            'capacity' => 30,
            'status' => 'active',
            'description' => 'Second form',
        ],
        [
            'name' => 'Form 3',
            'level' => 3,
            'room' => null,
            'capacity' => 30,
            'status' => 'active',
            'description' => 'Third form',
        ],
        [
            'name' => 'Form 4',
            'level' => 4,
            'room' => null,
            'capacity' => 30,
            'status' => 'active',
            'description' => 'Fourth form',
        ],
        [
            'name' => 'Form 5',
            'level' => 5,
            'room' => null,
            'capacity' => 30,
            'status' => 'active',
            'description' => 'Fifth form',
        ],
    ];

    public function run(): void
    {
        foreach ($this->classes as $class) {
            ClassForm::updateOrCreate(
                ['name' => $class['name']],
                [
                    'classId' => (string) Str::uuid(),
                    'level' => $class['level'],
                    'formTeacherId' => null,
                    'room' => $class['room'],
                    'capacity' => $class['capacity'],
                    'status' => $class['status'],
                    'description' => $class['description'],
                ]
            );
        }
    }
}