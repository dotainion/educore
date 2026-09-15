<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActivityLogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => 'activityLog',
            'attributes' => [
                'subject' => $this->subject,
                'targetId' => $this->targetId,
                'userId' => $this->userId,
                'actionTaken' => $this->action_taken,
                'pipeline' => $this->pipeline,
                'stageFrom' => $this->stage_from,
                'stageTo' => $this->stage_to,
                'message' => $this->message,
                'meta' => $this->meta,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
                'user' => new UserResource($this->whenLoaded('user')),
            ]
        ];
    }
}
