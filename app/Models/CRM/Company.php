<?php

namespace App\Models\CRM;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasUuids;
    
    protected $primaryKey = 'companyId';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'companyId',
        'name',
        'industry',
        'phone',
        'ownerId',
        'vip',
        'hide',
        'website',
        'note'
    ];

    public function uniqueIds(){
        return [
            'companyId'
        ];
    }
}
