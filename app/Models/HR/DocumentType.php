<?php

namespace App\Models\HR;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class DocumentType extends Model
{
    use HasUuids;
    
    protected $table = 'document_type';
    protected $primaryKey = 'docTypeId';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'docTypeId',
        'name',
        'steps',
        'risk',
        'autoApprove',
    ];

    protected function casts(): array{
        return [
            'steps' => 'array',
            'autoApprove' => 'boolean'
        ];
    }

    public function uniqueIds(){
        return [
            'docTypeId'
        ];
    }
}
