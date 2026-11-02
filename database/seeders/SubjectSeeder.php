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
        ],
        [
            'code' => 'MAT',
            'name' => 'Mathematics',
            'category' => 'Core',
            'status' => 'active',
        ],
        [
            'code' => 'SCI',
            'name' => 'Integrated Science',
            'category' => 'Core',
            'status' => 'active',
        ],
        [
            'code' => 'SOC',
            'name' => 'Social Studies',
            'category' => 'Core',
            'status' => 'active',
        ],
        [
            'code' => 'FRE',
            'name' => 'French',
            'category' => 'Language',
            'status' => 'active',
        ],
        [
            'code' => 'SPA',
            'name' => 'Spanish',
            'category' => 'Language',
            'status' => 'active',
        ],
        [
            'code' => 'BIO',
            'name' => 'Biology',
            'category' => 'Science',
            'status' => 'active',
        ],
        [
            'code' => 'CHE',
            'name' => 'Chemistry',
            'category' => 'Science',
            'status' => 'active',
        ],
        [
            'code' => 'PHY',
            'name' => 'Physics',
            'category' => 'Science',
            'status' => 'active',
        ],
        [
            'code' => 'HIS',
            'name' => 'History',
            'category' => 'Humanities',
            'status' => 'active',
        ],
        [
            'code' => 'GEO',
            'name' => 'Geography',
            'category' => 'Humanities',
            'status' => 'active',
        ],
        [
            'code' => 'IT',
            'name' => 'Information Technology',
            'category' => 'Technical',
            'status' => 'active',
        ],
        [
            'code' => 'PE',
            'name' => 'Physical Education',
            'category' => 'Practical',
            'status' => 'active',
        ],
        [
            'code' => 'ART',
            'name' => 'Visual Arts',
            'category' => 'Practical',
            'status' => 'active',
        ],
        [
            'code' => 'MUS',
            'name' => 'Music',
            'category' => 'Practical',
            'status' => 'active',
        ],
        [
            'code' => 'BDT',
            'name' => 'Building Technology',
            'category' => 'Technical',
            'status' => 'active',
        ],
        [
            'code' => 'EDT',
            'name' => 'Electronic Document Preparation and Management',
            'category' => 'Technical',
            'status' => 'active',
        ],
        [
            'code' => 'POB',
            'name' => 'Principles of Business',
            'category' => 'Business',
            'status' => 'active',
        ],
        [
            'code' => 'POA',
            'name' => 'Principles of Accounts',
            'category' => 'Business',
            'status' => 'active',
        ],
        [
            'code' => 'ECO',
            'name' => 'Economics',
            'category' => 'Business',
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