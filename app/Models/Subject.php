<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subject extends Model
{
    use HasUuids, SoftDeletes;

    protected $primaryKey = 'subjectId';
    protected $guarded = [];
    protected $guard_name = 'sanctum';

    protected $with = ['classes', 'users'];

    protected $fillable = [
        'subjectId',
        'code',
        'name',
        'category',
        'description',
        'status',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function uniqueIds(){
        return [
            'subjectId'
        ];
    }

    public function classes(){
        return $this->belongsToMany(
            ClassForm::class,
            'subject_link_classes',
            'subjectId',
            'classId'
        );
    }

    public function users(){
        return $this->belongsToMany(
            User::class,
            'subject_link_users',
            'subjectId',
            'userId'
        );
    }
}