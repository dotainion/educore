<?php

namespace App\Models\HR;

use App\Models\ActivityLogTrait;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Compensation extends Model
{
    use ActivityLogTrait, SoftDeletes, HasUuids;

    protected $table = 'compensations';
    protected $primaryKey = 'compensationId';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'compensationId',
        'userId',
        'salary',
        'currency',
        'payFrequency',
        'overtimeRate',
        'bonusEligible',
        'taxCategory',
    ];

    protected function casts(): array{
        return [
            //decimal dont seems to work
            //'salary' => 'decimal',
            'bonusEligible' => 'boolean',
            //'overtimeRate' => 'decimal',
        ];
    }

    public function uniqueIds(){
        return [
            'compensationId'
        ];
    }
}
