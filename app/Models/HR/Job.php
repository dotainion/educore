<?php

namespace App\Models\HR;

use App\Models\ActivityLogTrait;
use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Job extends Model
{
    use ActivityLogTrait, SoftDeletes, HasUuids;

    protected $primaryKey = 'jobId';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = 'hr_job';

    protected $with = ['interviewer'];

    protected $fillable = [
        'jobId',
        'title',
        'department',
        'employmentType',
        'interviewerId',
        'workplace',
        'location',
        'description',
        'responsibilities',
        'benefits',
        'salaryMin',
        'salaryMax',
        'currency',
        'payType',
        'showSalary',
        'experienceLevel',
        'minExperience',
        'education',
        'skills',
        'documents',
        'deadline',
        'applicationType',
        'status',
        'featured',
        'published',
        'hires'
    ];

    protected function casts(): array{
        return [
            'skills' => 'array',
            'documents' => 'array'
        ];
    }

    public function uniqueIds(){
        return [
            'jobId'
        ];
    }
    
    public function applicants(){
        return $this->belongsToMany(Applicant::class);
    }
    
    public function interviewer(){
        return $this->hasOne(User::class, 'userId', 'interviewerId');
    }
}
