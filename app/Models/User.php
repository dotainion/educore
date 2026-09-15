<?php

namespace App\Models;

use App\Models\HR\Department;
use App\Models\HR\EmergencyContact;
use App\Models\HR\Employment;
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
    protected $with = ['addresses', 'roles', 'departments', 'employment', 'emergencyContacts'];

    protected $fillable = [
        'userId',
        'applicantId',
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

    public function departments(){
        return $this->belongsToMany(
            Department::class,
            'user_department',
            'userId',
            'departmentId'
        );
    }

    public function employment(){
        return $this->hasOne(Employment::class, 'userId', 'userId');
    }

    public function emergencyContacts(){
        return $this->hasMany(EmergencyContact::class, 'userId', 'userId');
    }
}