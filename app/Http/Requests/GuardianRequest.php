<?php

namespace App\Http\Requests;

class GuardianRequest extends BaseRequest
{
    protected array $rules = [
        'fullName' => ['string', 'max:255'],
        'relationship' => [],
        'phone' => [],
        'occupation' => [],
    ];
    protected array $create_only_rules = [
        'email' => ['email', 'unique:users,email'],
    ];
    protected array $update_only_rules = [
        'guardianId' => ['required', 'string'],
    ];
    protected array $required = [
        'guardianId',
        'email',
        'fullName' ,
        'relationship',
        'phone',
        'occupation',
    ];
    
    public function authorize(): bool{
        return true;
    }
}
