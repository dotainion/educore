<?php

namespace App\Models\HR;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Rejected extends Model
{
    use HasUuids;
    
    protected $table = 'rejected';
    
    protected $primaryKey = 'rejectedId';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'rejectedId',
        'applicantId',
        // core reason classification (IMPORTANT FOR ATS REPORTING)
        'reason',
        'reasonCategory',
        // structured rejection taxonomy (real ATS feature)
        'skillsMismatch',
        'experienceInsufficient',
        'cultureFit',
        'salaryMismatch',
        'availabilityIssue',
        'poorInterviewPerformance',
        'failedAssessment',
        'backgroundIssue',
        // human explanation
        'note',
    ];

    public function uniqueIds(){
        return [
            'rejectedId'
        ];
    }
}
