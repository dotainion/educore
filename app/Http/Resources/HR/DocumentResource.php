<?php

namespace App\Http\Resources\HR;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class DocumentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->documentId,
            'type' => 'document',
            'attributes' => [
                'entityId' => $this->entityId,
                'label' => $this->label,
                'originalName' => $this->originalName,
                'fileName' => $this->fileName,
                'mimeType' => $this->mimeType,
                'size' => $this->size,
                'path' => $this->path,
                'documentTypeId' => $this->documentTypeId,
                'verified' => $this->verified,
                'expiry' => $this->expiry,
                'note' => $this->note,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
                'documentType' => new DocumentTypeResource($this->whenLoaded('documentType')),
                'url' => URL::temporarySignedRoute(
                    'documents.show',
                    now()->addMinutes(30),
                    ['documentId' => $this->documentId]
                ),
                'downloadUrl' => URL::temporarySignedRoute(
                    'documents.download',
                    now()->addMinutes(30),
                    ['documentId' => $this->documentId]
                ),
            ]
        ];
    }
}

