<?php

namespace App\Models\CRM;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasUuids;
    
    protected $primaryKey = 'contactId';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'contactId',
        'name',
        'title',
        'email',
        'phone',
        'company',
        'vip',
        'hide',
    ];

    public function uniqueIds(){
        return [
            'contactId'
        ];
    }
}
