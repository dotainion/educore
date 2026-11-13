<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Contact;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

class Guardian extends Model
{
    use HasUuids, SoftDeletes;

    protected $primaryKey = 'guardianId';
    protected $guarded = [];
    protected $guard_name = 'sanctum';

    protected $with = ['contacts'];

    protected $fillable = [
        'guardianId',
        'fullName',
        'relationship',
        'phone',
        'email',
        'occupation',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function uniqueIds(){
        return [
            'guardianId'
        ];
    }

    public function contacts(){
        return $this->hasMany(Contact::class, 'userId', 'guardianId');
    }
}