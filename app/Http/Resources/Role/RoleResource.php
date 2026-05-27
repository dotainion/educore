<?php

namespace App\Http\Resources\Role;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoleResource extends JsonResource
{
    protected string $type = 'role';

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'attributes' => [
                'name' => $this->name,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
                'permissions' => $this->whenLoaded('permissions', function () {
                    return $this->permissions->pluck('name');
                }),
            ]
        ];
    }
}
