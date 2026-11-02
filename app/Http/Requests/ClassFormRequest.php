<?php

namespace App\Http\Requests;

class ClassFormRequest extends BaseRequest
{
    protected array $rules = [
        'classId' => [],
        'name' => ['string', 'max:255'],
        'level' => ['string', 'max:255'],
        'formTeacherId' => [],
        'room' => ['string', 'max:255'],
        'capacity' => [],
        'status' => ['string', 'in:active,inactive'],
        'description' => ['string', 'max:455'],
    ];
    protected array $create_only_rules = [
    ];
    protected array $update_only_rules = [
        'classId' => ['required', 'string'],
    ];
    protected array $required = [
        'classId',
        'name',
        'level',
        'status',
    ];
    
    public function authorize(): bool{
        return true;
    }
}
