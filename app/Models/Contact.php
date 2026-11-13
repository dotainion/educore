<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contact extends Model
{
    use SoftDeletes, HasUuids;

    protected $table = 'contacts';
    protected $primaryKey = 'contactId';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'contactId',
        'userId',
        'primary',
        'name',
        'title',
        'email',
        'phone',
        'company',
        'type',
        'note',
        'vip',
        'relationship',
    ];

    protected function casts(): array{
        return [
            'primary' => 'boolean',
        ];
    }

    public function uniqueIds(){
        return [
            'contactId',
            'userId',
        ];
    }
}
