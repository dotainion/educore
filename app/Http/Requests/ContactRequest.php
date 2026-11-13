<?php

namespace App\Http\Requests;

class ContactRequest extends BaseRequest
{
    protected array $rules = [
        'primary' => ['nullable', 'boolean'],
        'userId' => ['string'],
        'name' => ['string'],
        'type' => ['string', 'in:Personal,Home,Work,Mobile,Emergency,Business,Other'],
        'title' => ['string', 'in:Mr,Mrs,Ms,Miss,Dr,Prof,Rev,Sir,Dame,Hon,Fr,Sr,Bro'],
        'relationship' => ['nullable', 'string'],
        'company' => ['nullable', 'string'],
        'email' => [],
        'phone' => ['nullable', 'string'],
        'note' => ['nullable', 'string'],
        'vip' => ['boolean'],
    ];
    protected array $update_only_rules = [
        'contactId' => ['required', 'string'],
    ];
    protected array $required = [
        'primary',
        'userId',
        'name',
        'type',
        'title',
        'relationship',
        'company',
        'email',
        'phone',
        'note',
        'vip',
    ];
    
    public function authorize(): bool{
        return true;
    }
}
