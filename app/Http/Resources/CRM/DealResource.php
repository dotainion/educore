<?php

namespace App\Http\Resources\CRM;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DealResource extends JsonResource
{
    protected string $type = 'deal';

    public function toArray(Request $request): array{
        return [
            'id' => $this->dealId,
            'type' => $this->type,
            'attributes' => [
                'title' => $this->title,
                'value' => $this->value,
                'stage' => $this->stage,
                'probability' => $this->probability,
                'company' => $this->company,
                'hide' => !!$this->hide,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ]
        ];
    }
}
