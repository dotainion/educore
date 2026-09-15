<?php

namespace App\Http\Resources\HR;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LeaveRequestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->leaveId,
            'type' => 'leaveRequest',
            'attributes' => [
                'employeeId' => $this->employeeId,
                'type' => $this->type,
                'from' => $this->from,
                'to' => $this->to,
                'status' => $this->status,
                'reason' => $this->reason,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
                'employee' => new UserResource($this->whenLoaded('user'))
            ]
        ];
    }
}
