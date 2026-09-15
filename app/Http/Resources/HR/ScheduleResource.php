<?php

namespace App\Http\Resources\HR;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->scheduleId,
            'type' => 'schedule',
            'attributes' => [
                'userId' => $this->userId,
                'createdById' => $this->createdById,
                'interviewerId' => $this->interviewerId,
                'modelName' => $this->modelName,
                'type' => $this->type,
                'duration' => $this->duration,
                'time' => $this->time,
                'notes' => $this->notes,
                'expired' => false,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ]
        ];
    }
}
