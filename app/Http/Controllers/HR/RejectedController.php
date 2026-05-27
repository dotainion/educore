<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Resources\HR\RejectedResource;
use App\Models\HR\Rejected;

class RejectedController extends Controller implements IController
{
    public function __construct(){
        parent::__construct(
            model: Rejected::class,
            resource: RejectedResource::class,
            createRule: [
                'applicantId' => ['string', 'required'],
                // core reason classification (IMPORTANT FOR ATS REPORTING)
                'reason' => ['string', 'nullable'],
                'reasonCategory' => ['string', 'nullable'],
                // structured rejection taxonomy (real ATS feature)
                'skillsMismatch' => ['boolean'],
                'experienceInsufficient' => ['boolean'],
                'cultureFit' => ['boolean'],
                'salaryMismatch' => ['boolean'],
                'availabilityIssue' => ['boolean'],
                'poorInterviewPerformance' => ['boolean'],
                'failedAssessment' => ['boolean'],
                'backgroundIssue' => ['boolean'],
                // human explanation
                'note' => ['string', 'nullable'],
            ],
            updateRule: [
                'rejectedId' => ['string', 'required'],
                'applicantId' => ['string', 'required'],
                // core reason classification (IMPORTANT FOR ATS REPORTING)
                'reason' => ['string', 'nullable'],
                'reasonCategory' => ['string', 'nullable'],
                // structured rejection taxonomy (real ATS feature)
                'skillsMismatch' => ['boolean'],
                'experienceInsufficient' => ['boolean'],
                'cultureFit' => ['boolean'],
                'salaryMismatch' => ['boolean'],
                'availabilityIssue' => ['boolean'],
                'poorInterviewPerformance' => ['boolean'],
                'failedAssessment' => ['boolean'],
                'backgroundIssue' => ['boolean'],
                // human explanation
                'note' => ['string', 'nullable'],
            ],
            findRule: [
                'rejectedId' => ['string'],
                'applicantId' => ['string']
            ]
        );
    }

}
