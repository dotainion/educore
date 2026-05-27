<?php

namespace App\Http\Resources\HR;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmergencyContactResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->contactId,
            'type' => 'emergencyContact',
            'attributes' => [
                'userId' => $this->userId,
                'name' => $this->name,
                'relationship' => $this->relationship,
                'phone' => $this->phone,
                'primary' => $this->primary,
                'note' => $this->note,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ]
        ];
    }
}
