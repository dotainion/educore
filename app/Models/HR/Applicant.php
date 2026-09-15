<?php

namespace App\Models\HR;

use App\Models\Address;
use App\Models\ActivityLogTrait;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Applicant extends Model
{
    use ActivityLogTrait, SoftDeletes, HasUuids;

    protected $primaryKey = 'applicantId';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $with = ['job', 'address'];

    protected $fillable = [
        'applicantId',
        'systemAccess',
        'firstDayCompleted',
        'payrollSetup',
        'equipmentAssigned',
        'firstName',
        'lastName',
        'email',
        'contact',
        'gender',
        'dob',
        'jobId',
        'addressId',
        'shortlisted',
        'status',
        'position',
        'skills',
        'experience',
    ];

    protected function casts(): array{
        return [
            'skills' => 'array',
            'systemAccess' => 'boolean',
            'firstDayCompleted' => 'boolean',
            'payrollSetup' => 'boolean',
            'equipmentAssigned' => 'boolean',
            'shortlisted' => 'boolean',
        ];
    }

    public function uniqueIds(){
        return [
            'applicantId'
        ];
    }
    
    public function job(){
        return $this->belongsTo(Job::class, 'jobId', 'jobId');
    }
    
    public function address(){
        return $this->hasOne(Address::class, 'addressId', 'addressId');
    }
}
