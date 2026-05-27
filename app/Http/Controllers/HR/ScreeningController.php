<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Resources\HR\ScreeningResource;
use App\Models\HR\Screening;

class ScreeningController extends Controller implements IController
{
    public function __construct(){
        parent::__construct(
            model: Screening::class,
            resource: ScreeningResource::class,
            createRule: [
                'applicantId' => ['required', 'string'],
                // core checks
                'skillsMatch' => ['boolean'],
                'experienceMatch' => ['boolean'],
                'cvQuality' => ['boolean'],
                'salaryFit' => ['boolean'],
                'availabilityFit' => ['boolean'],
                'locationFit' => ['boolean'],
                // evaluation scoring
                'technicalScore' => ['integer'],
                'communicationScore' => ['integer'],
                'experienceScore' => ['integer'],
                'cultureFitScore' => ['integer'],
                // qualitative
                'note' => ['string', 'nullable'],
                'redFlags' => ['string', 'nullable'],
                'strengths' => ['string', 'nullable'],
                // decision
                'recommendation' => ['string', 'nullable'],
                // meta
                'sourceVerified' => ['boolean'],
                'backgroundCheckNeeded' => ['boolean'],
            ],
            updateRule: [
                'screeningId' => ['required', 'string'],
                'applicantId' => ['string'],
                // core checks
                'skillsMatch' => ['boolean'],
                'experienceMatch' => ['boolean'],
                'cvQuality' => ['boolean'],
                'salaryFit' => ['boolean'],
                'availabilityFit' => ['boolean'],
                'locationFit' => ['boolean'],
                // evaluation scoring
                'technicalScore' => ['integer'],
                'communicationScore' => ['integer'],
                'experienceScore' => ['integer'],
                'cultureFitScore' => ['integer'],
                // qualitative
                'note' => ['string', 'nullable'],
                'redFlags' => ['string', 'nullable'],
                'strengths' => ['string', 'nullable'],
                // decision
                'recommendation' => ['string', 'nullable'],
                // meta
                'sourceVerified' => ['boolean'],
                'backgroundCheckNeeded' => ['boolean'],
            ],
            findRule: [
                'screeningId' => ['string'],
                'applicantId' => ['string']
            ]
        );
    }

}
