<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Resources\HR\ApplicantResource;
use App\Models\HR\Applicant;

class ApplicantController extends Controller implements IController
{
    public function __construct(){
        parent::__construct(
            model: Applicant::class,
            resource: ApplicantResource::class,
            createRule: [
                'systemAccess' => ['required', 'boolean'],
                'firstDayCompleted' => ['required', 'boolean'],
                'payrollSetup' => ['required', 'boolean'],
                'equipmentAssigned' => ['required', 'boolean'],
                'firstName' => ['required', 'string'],
                'lastName' => ['required', 'string'],
                'email' => ['required', 'string'],
                'contact' => ['required', 'string'],
                'gender' => ['required', 'string','in:male,female'],
                'dob' => ['required', 'string'],
                'jobId' => ['required', 'string'],
                'shortlisted' => ['boolean'],
                'status' => ['required', 'string', 'in:applied,screening,interview,offer,hired,rejected,activation,HRSetup,ITSetup,documents,training,firstDay,completed'],
                'position' => ['required', 'string'],
                'skills' => ['required', 'array'],
                'experience' => ['required', 'string'],
                'addressId' => ['nullable', 'string'],
                'source' => ['nullable', 'string', 'in:manual,referral,linkedin,agency,website'],
                'note' => ['nullable', 'string']
            ],
            updateRule: [
                'applicantId' => ['string'],
                'systemAccess' => ['boolean'],
                'firstDayCompleted' => ['boolean'],
                'payrollSetup' => ['boolean'],
                'equipmentAssigned' => ['boolean'],
                'firstName' => ['string'],
                'lastName' => ['string'],
                'email' => ['string'],
                'contact' => ['string'],
                'gender' => ['string','in:male,female'],
                'dob' => ['string'],
                'jobId' => ['string'],
                'shortlisted' => ['boolean'],
                'status' => ['string', 'in:applied,screening,interview,offer,hired,rejected,activation,HRSetup,ITSetup,documents,training,firstDay,completed,shortlist'],
                'position' => ['string'],
                'skills' => ['array'],
                'experience' => ['string'],
                'addressId' => ['nullable', 'string'],
                'source' => ['nullable', 'string', 'in:manual,referral,linkedin,agency,website'],
                'note' => ['nullable', 'string']
            ],
            searchRule: [
                'applicantId' => ['string'],
                'jobId' => ['string'],
                'status' => ['in:applied,screening,interview,offer,hired,rejected,activation,HRSetup,ITSetup,documents,training,firstDay,completed,shortlist'],
                'status.*' => ['in:applied,screening,interview,offer,hired,rejected,activation,HRSetup,ITSetup,documents,training,firstDay,completed,shortlist']
            ]
        );
    }
}
