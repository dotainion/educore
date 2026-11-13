<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClassFormResource extends JsonResource
{
    protected string $type = 'class';

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->classId,
            'type' => $this->type,
            'attributes' => [
                'name' => $this->name,
                'level' => $this->level,
                'room' => $this->room,
                'capacity' => $this->capacity,
                'status' => $this->status,
                'description' => $this->description,
                'teachers' => [],
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ]
        ];
    }
}