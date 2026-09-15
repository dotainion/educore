<?php

namespace Database\Seeders;

use App\Models\HR\LeaveRequest;
use App\Models\User;
use Illuminate\Database\Seeder;

class LeaveRequestSeeder extends Seeder
{
    protected array $leaves = [
        [
            'type' => 'sick',
            'status' => 'pending'
        ],[
            'type' => 'vacation',
            'status' => 'approved'
        ],[
            'type' => 'personal',
            'status' => 'rejected'
        ],[
            'type' => 'emergency',
            'status' => 'pending'
        ],[
            'type' => 'maternity',
            'status' => 'approved'
        ],[
            'type' => 'paternity',
            'status' => 'rejected'
        ],[
            'type' => 'bereavement',
            'status' => 'pending'
        ],[
            'type' => 'unpaid',
            'status' => 'approved'
        ],[
            'type' => 'other',
            'status' => 'rejected'
        ],
    ];

    public function run(): void
    {
        $user = User::where('email', 'example@example.com')->first();
        
        foreach($this->leaves as $leave){
            LeaveRequest::updateOrCreate([
                'type' => $leave['type']
            ],[
                'employeeId' => $user->userId,
                'type' => $leave['type'],
                'from' => now(),
                'to' => now()->addDays(30),
                'status' => $leave['status'],
                'reason' => 'I have to go and eat with my baby girl',
            ]);
        }
    }
}