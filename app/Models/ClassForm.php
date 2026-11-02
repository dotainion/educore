<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClassForm extends Model
{
    protected $primaryKey = 'classId';
    protected $table = 'class_forms';
    protected $guarded = [];
    protected $guard_name = 'sanctum';

    protected $with = [];

    protected $fillable = [
        'classId',
        'name',
        'level',
        'userId',
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
            'userId'
        ];
    }
}