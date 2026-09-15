<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Resources\HR\OfferResource;
use App\Models\HR\Offer;

class OfferController extends Controller implements IController
{
    public function __construct(){
        parent::__construct(
            model: Offer::class,
            resource: OfferResource::class,
            createRule: [
                'applicantId' => ['required', 'string'],
                'salaryBase' => ['integer'],
                'salaryCurrency' => ['string'],
                'bonus' => ['integer'],
                'equity' => ['integer'],
                // offer terms
                'startDate' => ['string'],
                'contractType' => ['string'],
                'probationPeriod' => ['integer'],
                // benefits
                'healthInsurance' => ['boolean'],
                'remoteWork' => ['boolean'],
                'pension' => ['boolean'],
                'flexibleHours' => ['boolean'],
                'annualLeave' => ['integer'],
                // negotiation
                'candidateExpectation' => [],
                'negotiationNotes' => [],
                // compliance
                'backgroundCheckRequired' => ['boolean'],
            ],
            updateRule: [
                'offerId' => ['required', 'string'],
                'applicantId' => ['required', 'string'],
                'salaryBase' => ['integer'],
                'salaryCurrency' => ['string'],
                'bonus' => ['integer'],
                'equity' => ['integer'],
                // offer terms
                'startDate' => ['string'],
                'contractType' => ['string'],
                'probationPeriod' => ['integer'],
                // benefits
                'healthInsurance' => ['boolean'],
                'remoteWork' => ['boolean'],
                'pension' => ['boolean'],
                'flexibleHours' => ['boolean'],
                'annualLeave' => ['integer'],
                // negotiation
                'candidateExpectation' => [],
                'negotiationNotes' => [],
                // compliance
                'backgroundCheckRequired' => ['boolean'],
            ],
            findRule: [
                'offerId' => ['string'],
                'applicantId' => ['string']
            ]
        );
    }

}
