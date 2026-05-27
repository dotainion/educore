<?php

namespace App\Http\Requests;

class DepartmentRequest extends BaseRequest
{
    protected array $rules = [
        'name' => ['string'],
        'code' => ['string'],
        'status' => ['string', 'in:active,inactive'],
    ];
    protected array $update_only_rules = [
        'departmentId' => ['required', 'string'],
    ];
    protected array $required = [
        'departmentId',
        'name',
        'code',
        'status',
    ];
    
    public function authorize(): bool{
        return true;
    }
}
