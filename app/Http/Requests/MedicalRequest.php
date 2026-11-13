<?php

namespace App\Http\Requests;

class MedicalRequest extends BaseRequest
{
    protected array $rules = [
        'bloodGroup' => [],
        'allergies' => [],
        'conditions' => [],
        'doctorName' => [],
        'doctorPhone' => [],
        'notes' => [],
    ];
    protected array $create_only_rules = [
        
    ];
    protected array $update_only_rules = [
        'medicalId' => ['required', 'string'],
    ];
    protected array $required = [
        'bloodGroup',
        'allergies',
        'conditions',
        'doctorName',
        'doctorPhone',
        'notes',
    ];
    
    public function authorize(): bool{
        return true;
    }
}
