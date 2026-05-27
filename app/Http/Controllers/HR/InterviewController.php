<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Resources\HR\InterviewResource;
use App\Models\HR\Interview;

class InterviewController extends Controller implements IController
{
    public function __construct(){
        parent::__construct(
            model: Interview::class,
            resource: InterviewResource::class,
            createRule: [
                'applicantId' => ['required', 'string'],
                'interviewType' => ['string'],
                // structured scoring
                'communication' => ['integer'],
                'technical' => ['integer'],
                'problemSolving' => ['integer'],
                'cultureFit' => ['integer'],
                'confidence' => ['integer'],
                // qualitative feedback
                'feedback' => ['string', 'nullable'],
                'strengths' => ['string', 'nullable'],
                'concerns' => ['string', 'nullable'],
                // decision
                'recommendation' => ['string'],
                // checklist
                'preparationGood' => ['boolean'],
                'answeredClearly' => ['boolean'],
                'technicalDepth' => ['boolean'],
                'culturalAlignment' => ['boolean'],
                'roleUnderstanding' => ['boolean'],
            ],
            updateRule: [
                'interviewId' => ['required', 'string'],
                'applicantId' => ['required', 'string'],
                'interviewType' => ['string'],
                // structured scoring
                'communication' => ['integer'],
                'technical' => ['integer'],
                'problemSolving' => ['integer'],
                'cultureFit' => ['integer'],
                'confidence' => ['integer'],
                // qualitative feedback
                'feedback' => ['string', 'nullable'],
                'strengths' => ['string', 'nullable'],
                'concerns' => ['string', 'nullable'],
                // decision
                'recommendation' => ['string'],
                // checklist
                'preparationGood' => ['boolean'],
                'answeredClearly' => ['boolean'],
                'technicalDepth' => ['boolean'],
                'culturalAlignment' => ['boolean'],
                'roleUnderstanding' => ['boolean'],
            ],
            findRule: [
                'interviewId' => ['string'],
                'applicantId' => ['string']
            ]
        );
    }

}
