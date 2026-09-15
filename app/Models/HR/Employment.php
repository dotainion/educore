<?php

namespace App\Models\HR;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Employment extends Model
{
    use HasUuids;
    
    protected $primaryKey = 'employmentId';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'employmentId',
        'status',
        'probationEndDate',
        'probationPassed',
        'position',
        'contractType',
        'workHoursPerWeek',
        'userId',
        'managerId',
        'enrolmentDate',
        'employmentType',
    ];

    protected function casts(): array{
        return [
            'probationEndDate' => 'datetime',
            'enrolmentDate' => 'datetime',
            'probationPassed' => 'boolean'
        ];
    }

    public function uniqueIds(){
        return [
            'employmentId'
        ];
    }
}
