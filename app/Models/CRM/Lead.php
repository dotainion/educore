<?php

namespace App\Models\CRM;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasUuids;
    
    protected $primaryKey = 'leadId';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'leadId',
        'name',
        'title',
        'email',
        'phone',
        'company',
        'status',
        'vip',
        'hide',
    ];

    public function uniqueIds(){
        return [
            'leadId'
        ];
    }
}
