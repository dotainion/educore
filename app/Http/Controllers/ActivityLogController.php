<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Resources\ActivityLogResource;
use App\Models\ActivityLog;

class ActivityLogController extends Controller implements IController
{
    public function __construct(){
        parent::__construct(
            model: ActivityLog::class,
            resource: ActivityLogResource::class,
            createRule: [
                'subject' => ['required', 'string', 'in:applicant,employee'],
                'targetId' => ['required', 'string'],
                'userId' => ['required', 'string'],// Who did it
                'action_taken' => ['required', 'string', 'in:hired,rejected,moved'],
                'pipeline' => ['required', 'string', 'in:recruitment,onboarding'],
                'stage_from' => ['required', 'string', 'in:applied,screening,interview,offer,hired,rejected'],
                'stage_to' => ['required', 'string', 'in:applied,screening,interview,offer,hired,rejected'],
                'message' => ['required', 'string'],
                'meta' => [],
            ],
            updateRule: self::UPDATE_RULE_OFF,
            searchRule: [
                'targetId' => ['string']
            ]
        );
    }

}
