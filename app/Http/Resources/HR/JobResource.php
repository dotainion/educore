<?php

namespace App\Http\Resources\HR;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->jobId,
            'type' => 'job',
            'attributes' => [
                'title' => $this->title,
                'workplace' => $this->workplace,
                'department' => $this->department,
                'employmentType' => $this->employmentType,
                'location' => $this->location,
                'description' => $this->description,
                'responsibilities' => $this->responsibilities,
                'benefits' => $this->benefits,
                'salaryMin' => $this->salaryMin,
                'salaryMax' => $this->salaryMax,
                'currency' => $this->currency,
                'payType' => $this->payType,
                'showSalary' => (bool)$this->showSalary,
                'experienceLevel' => $this->experienceLevel,
                'minExperience' => $this->minExperience,
                'education' => $this->education,
                'skills' => $this->skills,
                'documents' => $this->documents,
                'applicationType' => $this->applicationType,
                'deadline' => $this->deadline,
                'status' => $this->status,
                'featured' => (bool)$this->featured,
                'published' => (bool)$this->published,
                'hires' => $this->hires,
                'interviewerId' => $this->interviewerId,
                'interviewer' => new UserResource($this->whenLoaded('interviewer')),
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ]
        ];
    }
}
