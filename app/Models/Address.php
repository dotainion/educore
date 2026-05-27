<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasUuids;

    protected $primaryKey = 'addressId';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'addressId',
        'userId',
        'street',
        'street2',
        'city',
        'state',
        'zip',
        'country',
        'type',
        'status',
        'sameAsMailing',
    ];

    protected function casts(): array{
        return [
            'sameAsMailing' => 'boolean',
        ];
    }

    public function uniqueIds(){
        return [
            'addressId'
        ];
    }
    
    public function user(){
        return $this->belongsTo(User::class);
    }
}
