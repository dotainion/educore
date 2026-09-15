<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->addressId,
            'type' => 'address',
            'attributes' => [
                'addressId' => $this->addressId,
                'street' => $this->street,
                'street2' => $this->street2,
                'city' => $this->city,
                'state' => $this->state,
                'zip' => $this->zip,
                'country' => $this->country,
                'type' => $this->type,
                'status' => $this->status,
                'sameAsMailing' => $this->sameAsMailing,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
                'toString' => trim("{$this->street}, {$this->city} {$this->state} {$this->country} {$this->zip}")
            ]
        ];
    }
}
