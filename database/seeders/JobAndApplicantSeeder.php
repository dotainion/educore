<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\HR\Applicant;
use App\Models\HR\Job;
use App\Models\User;
use Illuminate\Database\Seeder;

class JobAndApplicantSeeder extends Seeder
{
    protected array $applicants = [
        [
            'firstName' => 'Applicant Test',
            'lastName' => 'Job Test',
            'email' => 'applicant@example.com',
            'contact' => '473 459 0097',
            'gender' => 'male'
        ],[
            'firstName' => 'Appldf dsaicant',
            'lastName' => 'Joddf addb',
            'email' => 'applicant2@example.com',
            'contact' => '473 459 4456',
            'gender' => 'female'
        ],[
            'firstName' => 'Applicant',
            'lastName' => 'Job',
            'email' => 'applicant4@example.com',
            'contact' => '473 459 2234',
            'gender' => 'male'
        ],[
            'firstName' => 'Johnah',
            'lastName' => 'Job',
            'email' => 'applicant5@example.com',
            'contact' => '473 459 7765',
            'gender' => 'female'
        ],[
            'firstName' => 'Applicant',
            'lastName' => 'Job',
            'email' => 'applicant6@example.com',
            'contact' => '473 459 4456',
            'gender' => 'male'
        ],[
            'firstName' => 'Fishing',
            'lastName' => 'Waters',
            'email' => 'applicant7@example.com',
            'contact' => '473 459 9987',
            'gender' => 'female'
        ],
    ];

    public function run(): void
    {
        $user = User::where('email', 'example@example.com')->first();

        $job = Job::updateOrCreate([
            'title' => 'Web Developer',
        ],[
            'interviewerId' => $user->userId,
            'title' => 'Web Developer',
            'department' => 'Information Technology',
            'workplace' => 'HA Blaze Street',
            'location' => 'remote',
            'description' => 'This is a test',
            'responsibilities' => 'To create web pages',
            'benefits' => 'none',
            'salaryMin' => 522,
            'salaryMax' => 1200,
            'currency' => 'USD',
            'payType' => 'monthly',
            'showSalary' => true,
            'experienceLevel' => 'none',
            'minExperience' => 'none',
            'education' => 'any',
            'skills' => ['React js'],
            'documents' => [],
            'employmentType' => 'parttime',
            'deadline' => '',
            'applicationType' => 'external',
            'status' => 'open',
            'featured' => true,
            'published' => true,
            'hires' => 5
        ]);

        $address = Address::updateOrCreate([
            'street' => 'Tempe',
            'city' => 'St. Georges',
        ],[
            //'addressId' => Str::uuid(),
            'street' => 'Tempe',
            'city' => 'St. Georges',
            'state' => 'St. George',
            'zip' => '00000',
            'country' => 'Grenada',
            'userId' => $user->userId
        ]);

        foreach($this->applicants as $applicant){
            Applicant::updateOrCreate([
                'firstName' => $applicant['firstName'],
                'lastName' => $applicant['lastName'],
            ],[
                'addressId' => $address->addressId,
                'systemAccess' => false,
                'firstDayCompleted' => false,
                'payrollSetup' => false,
                'equipmentAssigned' => false,
                'firstName' => $applicant['firstName'],
                'lastName' => $applicant['lastName'],
                'email' => $applicant['email'],
                'contact' => $applicant['contact'],
                'dob' => '',
                'gender' => $applicant['gender'],
                'jobId' => $job->jobId,
                'status' => 'applied',
                'position' => 'Technical',
                'skills' => ['React', 'JS', 'CSS', 'PHP'],
                'experience' => 'I workd in nal media for a while'
            ]);
        }
    }
}