<?php

namespace App\Models\HR;

use App\Models\ActivityLogTrait;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Document extends Model
{
    use ActivityLogTrait, SoftDeletes, HasUuids;

    protected $primaryKey = 'documentId';
    public $incrementing = false;
    protected $keyType = 'string';

    // ✅ AUTO LOAD ROLES
    protected $with = ['documentType'];

    protected $fillable = [
        'documentId',
        'employeeId',
        'createdById',
        'documentTypeId',
        'originalName',
        'fileName',
        'path',
        'mimeType',
        'size',
        'note',
        'verified',
        'expiry'
    ];

    protected function casts(): array{
        return [
            'verified' => 'boolean'
        ];
    }

    public function uniqueIds(){
        return [
            'documentId'
        ];
    }

    public function documentType()
    {
        return $this->belongsTo(DocumentType::class, 'documentTypeId', 'docTypeId');
    }
}
