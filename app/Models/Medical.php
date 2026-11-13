<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Contact;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

class Medical extends Model
{
    use HasUuids, SoftDeletes;

    protected $primaryKey = 'medicalId';
    protected $guarded = [];
    protected $guard_name = 'sanctum';

    protected $with = ['contacts'];

    protected $fillable = [
        'medicalId',
        'bloodGroup',
        'allergies',
        'conditions',
        'doctorName',
        'doctorPhone',
        'notes',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function uniqueIds(){
        return [
            'medicalId'
        ];
    }

    public function emergencyContacts(){
        return $this->hasMany(Contact::class, 'userId', 'guardianId');
    }
}