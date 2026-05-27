<?php

namespace App\Http\Resources\HR;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmploymentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->employmentId,
            'type' => 'employment',
            'attributes' => [
                'status' => $this->status,
                'probationEndDate' => $this->probationEndDate,
                'probationPassed'=> $this->probationPassed,
                'position' => $this->position,
                'contractType' => $this->contractType,
                'workHoursPerWeek' => $this->workHoursPerWeek,
                'userId' => $this->userId,
                'managerId' => $this->managerId,
                'enrolmentDate' => $this->enrolmentDate,
                'employmentType' => $this->employmentType,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ]
        ];
    }
}

