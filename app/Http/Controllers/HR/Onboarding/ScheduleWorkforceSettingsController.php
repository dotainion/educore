<?php

namespace App\Http\Controllers\HR\Onboarding;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Models\HR\ScheduleSettings;
use App\Http\Resources\HR\ScheduleSettingsResource;

class ScheduleWorkforceSettingsController extends Controller implements IController
{
    public function __construct(){
        parent::__construct(
            model: ScheduleSettings::class,
            resource: ScheduleSettingsResource::class,
            createRule: [
                'userId' => ['required', 'string'],
                'eligibleForScheduling' => ['required', 'boolean'],
                'allowWeekends' => ['required', 'boolean'],
                'allowNightShifts' => ['required', 'boolean'],
                'allowOvertime' => ['required', 'boolean'],
                'maxHoursPerWeek' => ['required', 'integer'],
                'minRestHours' => ['required', 'integer'],
                'maxConsecutiveDays' => ['required', 'integer'],
                'priorityWeight' => ['required', 'integer'],
                'weeklyAvailability' => ['required', 'array'],
            ],
            updateRule: [
                'settingsId' => ['string'],
                'userId' => ['string'],
                'eligibleForScheduling' => ['boolean'],
                'allowWeekends' => ['boolean'],
                'allowNightShifts' => ['boolean'],
                'allowOvertime' => ['boolean'],
                'maxHoursPerWeek' => ['integer'],
                'minRestHours' => ['integer'],
                'maxConsecutiveDays' => ['integer'],
                'priorityWeight' => ['integer'],
                'weeklyAvailability' => ['array'],
            ],
            findRule: [
                'settingsId' => ['string'],
                'userId' => ['string'],
            ],
            searchRule: self::SAME_AS_FIND_RULE
        );
    }
}
