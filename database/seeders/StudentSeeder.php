<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class StudentSeeder extends Seeder
{
    protected array $students = [
        [
            'firstName' => 'John',
            'middleName' => 'Michael',
            'lastName' => 'James',
            'gender' => 'Male',
            'nationality' => 'Grenadian',
            'religion' => 'Christian',
            'phone' => '473-555-0101',
            'email' => 'john.james@example.com',
            'enrolmentDate' => '2026-09-01',
            'enrolmentType' => 'New',
            'previousSchool' => null,
            'previousClass' => null,
            'parentName' => 'Mary James',
            'parentRelationship' => 'Mother',
            'parentPhone' => '473-555-0102',
            'parentEmail' => 'mary.james@example.com',
            'parentOccupation' => 'Teacher',
            'bloodGroup' => null,
            'allergies' => null,
            'medicalConditions' => null,
            'doctorName' => null,
            'doctorPhone' => null,
            'notes' => null,
            'status' => 'active',
            'dob' => '2013-05-12',
        ],
        [
            'firstName' => 'Sarah',
            'middleName' => 'Ann',
            'lastName' => 'Charles',
            'gender' => 'Female',
            'nationality' => 'Grenadian',
            'religion' => 'Christian',
            'phone' => '473-555-0103',
            'email' => 'sarah.charles@example.com',
            'enrolmentDate' => '2026-09-01',
            'enrolmentType' => 'New',
            'previousSchool' => null,
            'previousClass' => null,
            'parentName' => 'David Charles',
            'parentRelationship' => 'Father',
            'parentPhone' => '473-555-0104',
            'parentEmail' => 'david.charles@example.com',
            'parentOccupation' => 'Business owner',
            'bloodGroup' => null,
            'allergies' => null,
            'medicalConditions' => null,
            'doctorName' => null,
            'doctorPhone' => null,
            'notes' => null,
            'status' => 'active',
            'dob' => '2013-08-20',
        ],
    ];

    public function run(): void
    {
        foreach ($this->students as $student) {
            Student::updateOrCreate(
                ['email' => $student['email']],
                array_merge($student, [
                    'studentId' => (string) Str::uuid(),
                    'classId' => null,
                    'addressId' => null,
                ])
            );
        }
    }
}