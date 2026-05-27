<?php

namespace App\Models;

use Spatie\Permission\Models\Permission as SpatiePermission;

class Permission extends SpatiePermission
{
    protected $guarded = [];
    protected $guard_name = 'sanctum';

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}