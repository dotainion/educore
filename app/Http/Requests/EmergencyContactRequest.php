<?php

namespace App\Http\Requests;

class EmergencyContactRequest extends BaseRequest
{
    protected array $rules = [
        'userId' => ['string'],
        'name' => ['nullable', 'string'],
        'relationship' => ['nullable', 'string'],
        'phone' => ['string'],
        'primary' => ['nullable', 'boolean'],
        'note' => ['nullable', 'string'],
    ];
    protected array $update_only_rules = [
        'contactId' => ['required', 'string'],
    ];
    protected array $required = [
        'userId',
        'phone',
    ];
    
    public function authorize(): bool{
        return true;
    }
}
