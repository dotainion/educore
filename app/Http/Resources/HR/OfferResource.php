<?php

namespace App\Http\Resources\HR;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfferResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->offerId,
            'type' => 'offer',
            'attributes' => [
                'applicantId' => $this->applicantId,
                'salaryBase' => $this->salaryBase,
                'salaryCurrency' => $this->salaryCurrency,
                'bonus' => $this->bonus,
                'equity' => $this->equity,
                // offer terms
                'startDate' => $this->startDate,
                'contractType' => $this->contractType,
                'probationPeriod' => $this->probationPeriod,
                // benefits
                'healthInsurance' => $this->healthInsurance,
                'remoteWork' => $this->remoteWork,
                'pension' => $this->pension,
                'flexibleHours' => $this->flexibleHours,
                'annualLeave' => $this->annualLeave,
                // negotiation
                'candidateExpectation' => $this->candidateExpectation,
                'negotiationNotes' => $this->negotiationNotes,
                // compliance
                'backgroundCheckRequired' => $this->backgroundCheckRequired,
                
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ]
        ];
    }
}
