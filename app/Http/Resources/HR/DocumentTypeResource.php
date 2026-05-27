<?php

namespace App\Http\Resources\HR;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentTypeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->docTypeId,
            'type' => 'documentType',
            'attributes' => [
                'name' => $this->name,
                'label' => $this->label(),
                'steps' => $this->steps,
                'risk' => $this->risk,
                'autoApprove' => $this->autoApprove,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ]
        ];
    }

    private function label():string{
        $string = '';
        $parts = explode('_', $this->name);
        foreach($parts as $part){
            $string .= ucfirst($part) . ' ';
        }
        return trim($string);
    }
}

