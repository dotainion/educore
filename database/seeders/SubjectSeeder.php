<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SubjectSeeder extends Seeder
{
    protected array $subjects = [
        [
            'code' => 'ENG',
            'name' => 'English Language',
            'category' => 'Core',
            'status' => 'active',
        ],[
            'code' => 'LIT',
            'name' => 'English Literature',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'FRE',
            'name' => 'French',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'SPA',
            'name' => 'Spanish',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'HIS',
            'name' => 'History',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'SST',
            'name' => 'Social Studies',
            'category' => 'Core',
            'status' => 'active',
        ],[
            'code' => 'GEO',
            'name' => 'Geography',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'REL',
            'name' => 'Religious Education',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'MAT',
            'name' => 'Mathematics',
            'category' => 'Core',
            'status' => 'active',
        ],[
            'code' => 'AGS',
            'name' => 'Agricultural Science',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'ISC',
            'name' => 'Integrated Science',
            'category' => 'Core',
            'status' => 'active',
        ],[
            'code' => 'BIO',
            'name' => 'Biology',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'HSB',
            'name' => 'Human & Social Biology',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'PHY',
            'name' => 'Physics',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'CHE',
            'name' => 'Chemistry',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'PED',
            'name' => 'Physical Education',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'POB',
            'name' => 'Principles of Business',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'POA',
            'name' => 'Principles of Accounts',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'OA',
            'name' => 'Office Administration',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'ECO',
            'name' => 'Economics',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'EDPM',
            'name' => 'Electronic Document Preparation & Management',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'IT',
            'name' => 'Information Technology',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'TD',
            'name' => 'Technical Drawing',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'BFT',
            'name' => 'Building & Furniture Technology',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'VA',
            'name' => 'Visual Art',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'FNH',
            'name' => 'Food, Nutrition & Health',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'CTF',
            'name' => 'Clothing, Textile & Fashion',
            'category' => 'Elective',
            'status' => 'active',
        ],[
            'code' => 'FRM',
            'name' => 'Family & Resource Management',
            'category' => 'Elective',
            'status' => 'active',
        ],
    ];

    public function run(): void
    {
        foreach ($this->subjects as $subject) {
            Subject::updateOrCreate(
                ['code' => $subject['code']],
                array_merge($subject, [
                    'subjectId' => (string) Str::uuid(),
                ])
            );
        }
    }
}