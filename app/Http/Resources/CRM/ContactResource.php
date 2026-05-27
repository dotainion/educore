<?php

namespace App\Http\Resources\CRM;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
{
    protected string $type = 'contact';

    public function toArray(Request $request): array{
        return [
            'id' => $this->contactId,
            'type' => $this->type,
            'attributes' => [
                'name' => $this->name,
                'title' => $this->title,
                'email' => $this->email,
                'phone' => $this->phone,
                'company' => $this->company,
                'vip' => !!$this->vip,
                'hide' => !!$this->hide,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ]
        ];
    }
}
