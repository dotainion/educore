<?php

namespace App\Models\HR;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EmergencyContact extends Model
{
    use SoftDeletes, HasUuids;

    protected $table = 'emergency_contacts';
    protected $primaryKey = 'contactId';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'contactId',
        'userId',
        'name',
        'relationship',
        'phone',
        'primary',
        'note',
    ];

    protected function casts(): array{
        return [
            'primary' => 'boolean',
        ];
    }

    public function uniqueIds(){
        return [
            'contactId'
        ];
    }
    
    public function job(){
        return $this->belongsTo(User::class, 'userId', 'userId');
    }
}
