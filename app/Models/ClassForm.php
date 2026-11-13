<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClassForm extends Model
{
    use HasUuids, SoftDeletes;

    protected $primaryKey = 'classId';
    protected $table = 'class_forms';
    protected $guarded = [];
    protected $guard_name = 'sanctum';

    protected $with = [];

    protected $fillable = [
        'classId',
        'name',
        'level',
        'room',
        'capacity',
        'status',
        'description',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function uniqueIds(){
        return [
            'classId',
        ];
    }
}