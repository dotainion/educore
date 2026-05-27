<?php

namespace App\Http\Resources\HR;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScreeningResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->screeningId,
            'type' => 'screening',
            'attributes' => [
                'applicantId' => $this->applicantId,                
                // core checks
                'skillsMatch' => $this->skillsMatch,
                'experienceMatch' => $this->experienceMatch,
                'cvQuality' => $this->cvQuality,
                'salaryFit' => $this->salaryFit,
                'availabilityFit' => $this->availabilityFit,
                'locationFit' => $this->locationFit,

                // evaluation scoring
                'technicalScore' => $this->technicalScore,
                'communicationScore' => $this->communicationScore,
                'experienceScore' => $this->experienceScore,
                'cultureFitScore' => $this->cultureFitScore,

                // qualitative
                'note' => $this->note,
                'redFlags' => $this->redFlags,
                'strengths' => $this->strengths,

                // decision
                'recommendation' => $this->recommendation,

                // meta
                'sourceVerified' => $this->sourceVerified,
                'backgroundCheckNeeded' => $this->backgroundCheckNeeded,
                
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ]
        ];
    }
}
