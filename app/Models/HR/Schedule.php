<?php

namespace App\Models\HR;

use App\Models\ActivityLogTrait;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Schedule extends Model
{
    use ActivityLogTrait, SoftDeletes, HasUuids;

    protected $primaryKey = 'scheduleId';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'scheduleId',
        'userId',
        'createdById',
        'modelName',
        'interviewerId',
        'type',
        'duration',
        'time',
        'notes',
    ];

    public function uniqueIds(){
        return [
            'scheduleId'
        ];
    }
}
