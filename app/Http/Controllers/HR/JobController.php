<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Resources\HR\JobResource;
use App\Models\HR\Job;

class JobController extends Controller implements IController
{
    public function __construct(){
        parent::__construct(
            model: Job::class,
            resource: JobResource::class,
            createRule: [
                'title' => ['required', 'string'],
                'interviewerId' => ['required', 'string'],
                'department' => ['required', 'string'],
                'workplace' => [],
                'location' => ['required', 'in:remote,office,hybrid'],
                'description' => ['string'],
                'responsibilities' => ['string'],
                'benefits' => ['required', 'string'],
                'salaryMin' => ['required'],
                'salaryMax' => ['required'],
                'currency' => ['required', 'string'],
                'payType' => ['required', 'string', 'in:yearly,monthly,hourly'],
                'showSalary' => ['boolean'],
                'experienceLevel' => [],
                'minExperience' => [],
                'education' => [],
                'skills' => ['array'],
                'documents' => ['array'],
                'employmentType' => ['required', 'string', 'in:fulltime,parttime,contract,intern'],
                'deadline' => ['required'],
                'applicationType' => ['required', 'string', 'in:external,internal'],
                'status' => ['required', 'string', 'in:open,close'],
                'featured' => ['required', 'boolean'],
                'published' => ['required', 'boolean'],
                'hires' => ['required', 'integer']
            ],
            updateRule: [
                'jobId' => ['required', 'string'],
                'interviewerId' => ['string'],
                'title' => ['string'],
                'department' => ['string'],
                'workplace' => [],
                'location' => ['in:remote,office,hybrid'],
                'description' => ['string'],
                'responsibilities' => ['string'],
                'benefits' => ['string'],
                'salaryMin' => [],
                'salaryMax' => [],
                'currency' => ['string'],
                'payType' => ['string', 'in:yearly,monthly,hourly'],
                'showSalary' => ['boolean'],
                'experienceLevel' => [],
                'minExperience' => [],
                'education' => [],
                'skills' => ['array'],
                'documents' => ['array'],
                'employmentType' => ['string', 'in:fulltime,parttime,contract,intern'],
                'deadline' => [],
                'applicationType' => ['string', 'in:external,internal'],
                'status' => ['string', 'in:open,close'],
                'featured' => ['boolean'],
                'published' => ['boolean'],
                'hires' => ['integer']
            ],
            searchRule: [
                'jobId' => [],
                'interviewerId' => [],
                'title' => [],
                'status' => [],
            ]
        );
    }

}
