<?php

namespace App\Models\CRM;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Deal extends Model
{
    use HasUuids;
    
    protected $primaryKey = 'dealId';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'dealId',
        'title',
        'value',
        'stage',
        'probability',
        'company',
        'hide',
    ];

    public function uniqueIds(){
        return [
            'dealId'
        ];
    }
}
