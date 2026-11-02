<?php

namespace App\Http\Requests;

class SubjectRequest extends BaseRequest
{
    protected array $rules = [
        'subjectId' => [],
        'code' => ['string', 'max:255'],
        'name' => ['string', 'max:255'],
        'category' => ['string', 'max:255'],
        'status' => ['string', 'in:active,inactive'],
    ];
    protected array $create_only_rules = [
        'email' => ['email', 'unique:users,email'],
    ];
    protected array $update_only_rules = [
        'studentId' => ['required', 'string'],
    ];
    protected array $required = [
        'subjectId',
        'code',
        'name',
        'category',
        'status',
    ];
    
    public function authorize(): bool{
        return true;
    }
}
