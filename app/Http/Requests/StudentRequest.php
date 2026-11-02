<?php

namespace App\Http\Requests;

class StudentRequest extends BaseRequest
{
    protected array $rules = [
        'studentId' => [],
        'classId' => [],
        'firstName' => ['string', 'max:255'],
        'middleName' => ['string', 'max:255'],
        'lastName' => ['string', 'max:255'],
        'gender' => ['in:male,female'],
        'nationality' => [],
        'religion' => [],
        'addressId' => [],
        'phone' => [],
        'email' => [],
        'enrolmentDate' => [],
        'enrolmentType' => [],
        'previousSchool' => [],
        'previousClass' => [],
        'parentName' => [],
        'parentRelationship' => [],
        'parentPhone' => [],
        'parentEmail' => [],
        'parentOccupation' => [],
        'bloodGroup' => [],
        'allergies' => [],
        'medicalConditions' => [],
        'doctorName' => [],
        'doctorPhone' => [],
        'notes' => [],
        'status' => ['string', 'in:active,inactive,transferred'],
        'dob' => ['nullable', 'date'],
    ];
    protected array $create_only_rules = [
        'email' => ['email', 'unique:users,email'],
    ];
    protected array $update_only_rules = [
        'studentId' => ['required', 'string'],
    ];
    protected array $required = [
        'studentId',
        'classId',
        'firstName',
        'lastName',
        'gender',
        'nationality',
        'religion',
        'enrolmentType',
        'status',
    ];
    
    public function authorize(): bool{
        return true;
    }
}
