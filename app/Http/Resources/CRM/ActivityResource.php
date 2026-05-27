<?php

namespace App\Http\Resources\CRM;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActivityResource extends JsonResource
{
    protected string $type = 'activity';

    public function toArray(Request $request): array{
        return [
            'id' => $this->activityId,
            'type' => $this->type,
            'attributes' => [
                'type' => $this->type,
                'title' => $this->title,
                'dueDate' => $this->dueDate,
                'priority' => $this->priority,
                'completed' => !!$this->completed,
                'assignedToId' => $this->assignedToId,
                'hide' => !!$this->hide,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ]
        ];
    }
}
