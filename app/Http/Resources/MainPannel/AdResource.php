<?php

namespace App\Http\Resources\MainPannel;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class AdResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->adId,
            'type' => 'document',
            'attributes' => [
                'title' => $this->title,
                'content' => $this->content,
                'company' => $this->company,
                'ctaText' => $this->ctaText,
                'ctaUrl' => $this->ctaUrl,
                'adType' => $this->adType,
                'status' => $this->status,
                'path' => $this->path,
                'expiresAt' => $this->expiresAt,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
                'url' => Storage::url($this->path),
            ]
        ];
    }
}

