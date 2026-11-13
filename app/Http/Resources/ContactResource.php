<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
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
            'type' => 'contact',
            'attributes' => [
                'userId' => $this->userId,
                'primary' => $this->primary,
                'name' => $this->name,
                'title' => $this->title,
                'email' => $this->email,
                'phone' => $this->phone,
                'company' => $this->company,
                'type' => $this->type,
                'note' => $this->note,
                'vip' => $this->vip,
                'relationship' => $this->relationship,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ]
        ];
    }
}
