<?php

namespace App\Http\Resources\HR;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HiredResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->hiredId,
            'type' => 'hired',
            'attributes' => [
                'applicantId' => $this->applicantId,
                'jobAccepted' => $this->jobAccepted,
                'jobAcceptedAt' => $this->jobAcceptedAt,
                'acceptedDate' => $this->acceptedDate,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ]
        ];
    }
}
