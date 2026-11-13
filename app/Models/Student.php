<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\EmergencyContact;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use HasUuids, SoftDeletes;

    protected $primaryKey = 'studentId';
    protected $guarded = [];
    protected $guard_name = 'sanctum';

    protected $with = [];

    protected $fillable = [
        'studentId',
        'classId',
        'firstName',
        'middleName',
        'lastName',
        'gender',
        'nationality',
        'religion',
        'addressId',
        'phone',
        'email',
        'enrolmentDate',
        'enrolmentType',
        'previousSchool',
        'previousClass',
        'parentName',
        'parentRelationship',
        'parentPhone',
        'parentEmail',
        'parentOccupation',
        'bloodGroup',
        'allergies',
        'medicalConditions',
        'doctorName',
        'doctorPhone',
        'notes',
        'status',
        'dob',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function uniqueIds(){
        return [
            'studentId',
            'classId'
        ];
    }
}