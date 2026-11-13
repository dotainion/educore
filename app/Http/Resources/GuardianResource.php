<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ContactResource;

class GuardianResource extends JsonResource
{
    protected string $type = 'guardian';

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->guardianId,
            'type' => $this->type,
            'attributes' => [
                'fullName' => $this->fullName,
                'relationship' => $this->relationship,
                'phone' => $this->phone,
                'email' => $this->email,
                'occupation' => $this->occupation,
                'contacts' => ContactResource::collection($this->whenLoaded('contacts')),
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ]
        ];
    }
}