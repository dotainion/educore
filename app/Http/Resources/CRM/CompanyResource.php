<?php

namespace App\Http\Resources\CRM;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyResource extends JsonResource
{
    protected string $type = 'company';

    public function toArray(Request $request): array{
        return [
            'id' => $this->companyId,
            'type' => $this->type,
            'attributes' => [
                'name' => $this->name,
                'industry' => $this->industry,
                'phone' => $this->phone,
                'owner' => $this->owner,
                'vip' => !!$this->vip,
                'note' => $this->note,
                'hide' => !!$this->hide,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ]
        ];
    }
}
