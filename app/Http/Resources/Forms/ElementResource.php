<?php

namespace App\Http\Resources\Forms;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ElementResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->elementId,
            'type' => 'element',
            'attributes' => [
                'templateId' => $this->templateId,
                'type' => $this->type,
                'label' => $this->label,
                'defaultValue' => $this->defaultValue,
                'options' => $this->options,
            ]
        ];
    }
}
