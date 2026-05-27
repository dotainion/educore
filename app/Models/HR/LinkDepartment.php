<?php

namespace App\Models\HR;

use Illuminate\Database\Eloquent\Model;

class LinkDepartment extends Model
{
    protected $table = 'user_department';

    protected $fillable = [
        'userId',
        'departmentId'
    ];
}
