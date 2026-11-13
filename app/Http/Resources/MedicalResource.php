<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MedicalResource extends JsonResource
{
    protected string $type = 'medial';

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->medialId,
            'type' => $this->type,
            'attributes' => [
                'bloodGroup' => $this->bloodGroup,
                'allergies' => $this->typallergiese,
                'conditions' => $this->conditions,
                'doctorName' => $this->doctorName,
                'doctorPhone' => $this->doctorPhone,
                'notes' => $this->notes,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ]
        ];
    }
}