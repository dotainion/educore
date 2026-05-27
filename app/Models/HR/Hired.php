<?php

namespace App\Models\HR;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Hired extends Model
{
    use HasUuids;
    
    protected $table = 'hired';
    
    protected $primaryKey = 'hiredId';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'hiredId',
        'applicantId',
        'jobAccepted',
        'jobAcceptedAt',
        'startDate',
    ];

    protected function casts(): array{
        return [
            'jobAccepted' => 'boolean',
        ];
    }

    public function uniqueIds(){
        return [
            'hiredId'
        ];
    }
}
