<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Http\Resources\HR\ScheduleResource;
use App\Models\HR\Schedule;

class ScheduleController extends Controller
{
    public function __construct(){
        parent::__construct(
            model: Schedule::class,
            resource: ScheduleResource::class,
            createRule: [
                'userId' => ['required', 'string'],
                'interviewerId' => ['required', 'string'],
                'createdById' => ['required', 'string'],
                'modelName' => ['required', 'string'],
                'type' => ['required', 'string'],
                'duration' => ['required', 'string'],
                'time' => ['required', 'string'],
                'notes' => ['string', 'nullable'],
            ],
            updateRule: [
                'scheduleId' => ['string'],
                'userId' => ['string'],
                'interviewerId' => ['string'],
                //'createdById' => ['string'],
                'modelName' => ['string'],
                'type' => ['string'],
                'duration' => ['string'],
                'time' => ['string'],
                'notes' => ['string', 'nullable'],
            ],
            searchRule: [
                'scheduleId' => [],
                'userId' => []
            ]
        );
    }
}
