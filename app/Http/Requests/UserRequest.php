<?php

namespace App\Http\Requests;

class UserRequest extends BaseRequest
{
    protected array $rules = [
        'applicantId' => [],
        'firstName' => ['string', 'max:255'],
        'lastName' => ['string', 'max:255'],
        'gender' => ['in:male,female'],
        'contact' => [],
        'dob' => ['nullable', 'date'],
        'status' => ['string', 'in:active,inactive'],
    ];
    protected array $create_only_rules = [
        'email' => ['email', 'unique:users,email'],
        'password' => []
    ];
    protected array $update_only_rules = [
        'userId' => ['required', 'string'],
    ];
    protected array $required = [
        'userId',
        'firstName',
        'lastName',
        'email',
        'gender',
        'status',
    ];
    
    public function authorize(): bool{
        return true;
    }
}
