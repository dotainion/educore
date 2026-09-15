<?php

namespace App\Http\Requests;

class AddressRequest extends BaseRequest
{
    protected array $rules = [
        'street' => ['string'],
        'city' => ['string'],
        'state' => ['string'],
        'zip' => ['string'],
        'country' => ['string'],
        'status' => ['string', 'in:active,inactive'],
        'type' => ['string', 'in:home,work,parents,other,residential,mailing,address'],
        'sameAsMailing' => ['boolean'],
        'userId' => ['string'],
    ];
    protected array $update_only_rules = [
        'addressId' => ['required', 'string'],
    ];
    protected array $required = [
        'addressId',
        'street',
        'city',
        'state',
        'zip',
        'country',
        'status',
        'type',
        'userId',
    ];

    public function authorize(): bool{
        return true;
    }
}
