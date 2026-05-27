<?php

namespace App\Models\HR;

use App\Models\ActivityLogTrait;
use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LeaveRequest extends Model
{
    use HasUuids, ActivityLogTrait, SoftDeletes;
    
    protected $primaryKey = 'leaveId';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = 'leave_requests';

    protected $with = ['user'];

    protected $fillable = [
        'leaveId',
        'employeeId',
        'type',
        'from',
        'to',
        'status',
        'reason',
    ];

    public function uniqueIds(){
        return [
            'leaveId'
        ];
    }
    
    public function user(){
        return $this->belongsTo(User::class, 'employeeId', 'userId');
    }
}
