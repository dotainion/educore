<?php

namespace App\Http\Resources;

use App\Http\Resources\EmergencyContactResource;
use App\Http\Resources\Role\RoleResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    protected string $type = 'user';

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->userId,
            'type' => $this->type,
            'attributes' => [
                'firstName' => $this->firstName,
                'lastName' => $this->lastName,
                'fullName' => trim("{$this->firstName} {$this->lastName}"),
                'email' => $this->email,
                'gender' => $this->gender,
                'contact' => $this->contact,
                'dob' => $this->dob,
                'status' => $this->status,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
                'roles' => RoleResource::collection($this->roles),
                'departments' => null,
                'employment' => null,
                'addresses' => AddressResource::collection($this->whenLoaded('addresses')),
                'emergencyContacts' => EmergencyContactResource::collection($this->whenLoaded('emergencyContacts')),
                'subjects' => SubjectResource::collection($this->whenLoaded('subjects')),
                'classes' => ClassFormResource::collection($this->whenLoaded('classes')),
                'photo' => null
            ]
        ];
    }
}