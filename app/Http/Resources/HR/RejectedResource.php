<?php

namespace App\Http\Resources\HR;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RejectedResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->rejectedId,
            'type' => 'rejected',
            'attributes' => [
                'applicantId' => $this->applicantId,
                // core reason classification (IMPORTANT FOR ATS REPORTING)
                'reason' => $this->reason,
                'reasonCategory' => $this->reasonCategory,
                // structured rejection taxonomy (real ATS feature)
                'skillsMismatch' => $this->skillsMismatch,
                'experienceInsufficient' => $this->experienceInsufficient,
                'cultureFit' => $this->cultureFit,
                'salaryMismatch' => $this->salaryMismatch,
                'availabilityIssue' => $this->availabilityIssue,
                'poorInterviewPerformance' => $this->poorInterviewPerformance,
                'failedAssessment' => $this->failedAssessment,
                'backgroundIssue' => $this->backgroundIssue,
                // human explanation
                'note' => $this->note,
                
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ]
        ];
    }
}
