<?php

namespace App\Http\Resources\HR;

use App\Http\Resources\AddressResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->applicantId,
            'type' => 'applicant',
            'attributes' => [
                'systemAccess' => $this->systemAccess,
                'firstDayCompleted' => $this->firstDayCompleted,
                'payrollSetup' => $this->payrollSetup,
                'equipmentAssigned' => $this->equipmentAssigned,
                'firstName' => $this->firstName,
                'lastName' => $this->lastName,
                'fullName' => trim("{$this->firstName} {$this->lastName}"),
                'email' => $this->email,
                'contact' => $this->contact,
                'gender' => $this->gender,
                'dob' => $this->dob,
                'jobId' => $this->jobId,
                'position' => $this->position,
                'skills' => $this->skills,
                'experience' => $this->experience,
                'shortlisted' => $this->shortlisted,
                'status' => $this->status,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
                'job' => new JobResource($this->whenLoaded('job')),
                'addressId' => $this->addressId,
                'address' => new AddressResource($this->whenLoaded('address')),
                'documents' => [
                    [
                        'attributes' => [
                            'url' => 'tst',
                            'name' => 'Test Document'
                        ]
                    ],[
                        'attributes' => [
                            'url' => 'tst',
                            'name' => 'Test Document'
                        ]
                    ],[
                        'attributes' => [
                            'url' => 'tst',
                            'name' => 'Test Document'
                        ]
                    ]
                ]
            ]
        ];
    }
}
