<?php

namespace App\Http\Resources\HR;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompensationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->compensationId,
            'type' => 'compensation',
            'attributes' => [
                'userId' => $this->userId,
                'salary' => $this->salary,
                'currency' => $this->currency,
                'payFrequency' => $this->payFrequency,
                'overtimeRate' => $this->overtimeRate,
                'bonusEligible' => $this->bonusEligible,
                'taxCategory' => $this->taxCategory,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ]
        ];
    }
}

