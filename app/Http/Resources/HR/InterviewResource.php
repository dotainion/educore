<?php

namespace App\Http\Resources\HR;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InterviewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->interviewId,
            'type' => 'interview',
            'attributes' => [
                'applicantId' => $this->applicantId,
                'interviewType' => $this->interviewType,

                // structured scoring
                'communication' => $this->communication,
                'technical' => $this->technical,
                'problemSolving' => $this->problemSolving,
                'cultureFit' => $this->cultureFit,
                'confidence' => $this->confidence,

                // qualitative feedback
                'feedback' => $this->feedback,
                'strengths' => $this->strengths,
                'concerns' => $this->concerns,

                // decision
                'recommendation' => $this->recommendation,

                // checklist
                'preparationGood' => $this->preparationGood,
                'answeredClearly' => $this->answeredClearly,
                'technicalDepth' => $this->technicalDepth,
                'culturalAlignment' => $this->culturalAlignment,
                'roleUnderstanding' => $this->roleUnderstanding,
                
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ]
        ];
    }
}
