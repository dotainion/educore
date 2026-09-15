<?php

namespace App\Http\Resources\Forms;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FormInstanceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->instanceId,
            'type' => 'instance',
            'attributes' => [
                'templateId' => $this->templateId,
                'type' => $this->type,
                'label' => $this->label,
                'value' => $this->value,
                'options' => $this->options,
            ]
        ];
    }
}
