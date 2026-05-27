<?php

namespace App\Models\HR;

use App\Models\ActivityLogTrait;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ScheduleSettings extends Model
{
    use ActivityLogTrait, SoftDeletes, HasUuids;

    protected $primaryKey = 'settingsId';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'settingsId',
        'userId',
        'eligibleForScheduling',
        'allowWeekends',
        'allowNightShifts',
        'allowOvertime',
        'maxHoursPerWeek',
        'minRestHours',
        'maxConsecutiveDays',
        'priorityWeight',
        'weeklyAvailability',
    ];

    protected function casts(): array{
        return [
            'eligibleForScheduling' => 'boolean',
            'allowWeekends' => 'boolean',
            'allowNightShifts' => 'boolean',
            'allowOvertime' => 'boolean',
            'weeklyAvailability' => 'array',
        ];
    }

    public function uniqueIds(){
        return [
            'settingsId'
        ];
    }
}
