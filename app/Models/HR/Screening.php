<?php

namespace App\Models\HR;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Screening extends Model
{
    use HasUuids;
    
    protected $primaryKey = 'screeningId';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'screeningId',
        'applicantId',
        
        // core checks
        'skillsMatch',
        'experienceMatch',
        'cvQuality',
        'salaryFit',
        'availabilityFit',
        'locationFit',

        // evaluation scoring
        'technicalScore',
        'communicationScore',
        'experienceScore',
        'cultureFitScore',

        // qualitative
        'note',
        'redFlags',
        'strengths',

        // decision
        'recommendation',

        // meta
        'sourceVerified',
        'backgroundCheckNeeded',
    ];

    public function uniqueIds(){
        return [
            'screeningId'
        ];
    }
}
