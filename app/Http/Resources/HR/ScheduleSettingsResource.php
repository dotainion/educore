<?php

namespace App\Http\Resources\HR;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleSettingsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->settingsId,
            'type' => 'scheduleSettings',
            'attributes' => [
                'userId' => $this->userId,
                'eligibleForScheduling' => $this->eligibleForScheduling,
                'allowWeekends' => $this->allowWeekends,
                'allowNightShifts' => $this->allowNightShifts,
                'allowOvertime' => $this->allowOvertime,
                'maxHoursPerWeek' => $this->maxHoursPerWeek,
                'minRestHours' => $this->minRestHours,
                'maxConsecutiveDays' => $this->maxConsecutiveDays,
                'priorityWeight' => $this->priorityWeight,
                'weeklyAvailability' => $this->weeklyAvailability,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ]
        ];
    }
}
