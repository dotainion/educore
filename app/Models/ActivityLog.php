<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    protected $table = 'activity_logs';

    protected $with = ['user'];

    protected $fillable = [
        'subject',
        'targetId',
        'userId',
        'action_taken',
        'pipeline',
        'stage_from',
        'stage_to',
        'message',
        'meta',
    ];

    protected function casts(): array{
        return [
            'meta' => 'array',
        ];
    }

    public function user(){
        return $this->hasOne(User::class, 'userId', 'userId');
    }
}
