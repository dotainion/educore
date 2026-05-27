<?php

namespace App\Models\HR;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    use HasUuids;
    
    protected $primaryKey = 'interviewId';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'interviewId',
        'applicantId',

        'interviewType',

        // structured scoring
        'communication',
        'technical',
        'problemSolving',
        'cultureFit',
        'confidence',

        // qualitative feedback
        'feedback',
        'strengths',
        'concerns',

        // decision
        'recommendation',

        // checklist
        'preparationGood',
        'answeredClearly',
        'technicalDepth',
        'culturalAlignment',
        'roleUnderstanding',
    ];

    public function uniqueIds(){
        return [
            'interviewId'
        ];
    }
}
