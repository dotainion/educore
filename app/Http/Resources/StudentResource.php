<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\EmergencyContactResource;

class StudentResource extends JsonResource
{
    protected string $type = 'student';

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->studentId,
            'type' => $this->type,
            'attributes' => [
                'classId' => $this->classId,
                'firstName' => $this->firstName,
                'middleName' => $this->middleName,
                'lastName' => $this->lastName,
                'fullName' => trim("{$this->firstName} {$this->lastName}"),
                'gender' => $this->gender,
                'nationality' => $this->nationality,
                'religion' => $this->religion,
                'addressId' => $this->addressId,
                'phone' => $this->phone,
                'email' => $this->email,
                'enrolmentDate' => $this->enrolmentDate,
                'enrolmentType' => $this->enrolmentType,
                'previousSchool' => $this->previousSchool,
                'previousClass' => $this->previousClass,
                'parentName' => $this->parentName,
                'parentRelationship' => $this->parentRelationship,
                'parentPhone' => $this->parentPhone,
                'parentEmail' => $this->parentEmail,
                'parentOccupation' => $this->parentOccupation,
                'bloodGroup' => $this->bloodGroup,
                'allergies' => $this->allergies,
                'medicalConditions' => $this->medicalConditions,
                'doctorName' => $this->doctorName,
                'doctorPhone' => $this->doctorPhone,
                'notes' => $this->notes,
                'status' => $this->status,
                'dob' => $this->dob,
                'emergencyContacts' => EmergencyContactResource::collection($this->whenLoaded('emergencyContacts')),

                'photo' => null
            ]
        ];
    }
}