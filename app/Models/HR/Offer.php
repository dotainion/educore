<?php

namespace App\Models\HR;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use HasUuids;
    
    protected $primaryKey = 'offerId';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'offerId',
        'applicantId',
            
        'salaryBase',
        'salaryCurrency',
        'bonus',
        'equity',

        // offer terms
        'startDate',
        'contractType',
        'probationPeriod',

        // benefits
        'healthInsurance',
        'remoteWork',
        'pension',
        'flexibleHours',
        'annualLeave',

        // negotiation
        'candidateExpectation',
        'negotiationNotes',

        // compliance
        'backgroundCheckRequired',
    ];

    public function uniqueIds(){
        return [
            'offerId'
        ];
    }
}
