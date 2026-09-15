<?php

namespace App\Models\CRM;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasUuids;
    
    protected $primaryKey = 'activityId';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'activityId',
        'type',
        'title',
        'dueDate',
        'priority',
        'completed',
        'assignedToId',
        'relatedTo',
        'note',
        'hide',
    ];

    public function uniqueIds(){
        return [
            'activityId'
        ];
    }
}
