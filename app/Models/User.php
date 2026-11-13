<?php

namespace App\Models;

use App\Models\Contact;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles, HasUuids, HasApiTokens, SoftDeletes, ActivityLogTrait;

    protected $primaryKey = 'userId';
    public $incrementing = false;
    protected $keyType = 'string';

    //guard
    protected $guard_name = 'sanctum';

    // ✅ AUTO LOAD
    protected $with = ['addresses', 'roles', 'contacts', 'subjects', 'classes'];

    protected $fillable = [
        'userId',
        'firstName',
        'lastName',
        'email',
        'password',
        'gender',
        'contact',
        'dob',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array{
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function uniqueIds(){
        return [
            'userId'
        ];
    }

    public function addresses(){
        return $this->hasMany(Address::class, 'userId', 'userId');
    }

    public function contacts(){
        return $this->hasMany(Contact::class, 'userId', 'userId');
    }

    public function subjects(){
        return $this->belongsToMany(
            Subject::class,
            'subject_link_users',
            'userId',
            'subjectId'
        );
    }

    public function classes(){
        return $this->belongsToMany(
            Subject::class,
            'users_link_classes',
            'userId',
            'classId'
        );
    }
}