<?php

namespace App\Models\HR;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasUuids;
    
    protected $primaryKey = 'departmentId';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'departmentId',
        'name',
        'code',
        'status',
    ];

    public function uniqueIds(){
        return [
            'departmentId'
        ];
    }
    
    public function user(){
        return $this->belongsToMany(User::class);
    }
}
