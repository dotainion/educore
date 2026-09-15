<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Requests\AddressRequest;
use App\Http\Resources\AddressResource;
use App\Models\Address;

class AddressController extends Controller implements IController
{
    public function __construct(){
        $rq = new AddressRequest();
        parent::__construct(
            model: Address::class,
            resource: AddressResource::class,
            createRule: $rq->createRules(),
            updateRule: $rq->updateRules(),
            findRule: [
                'addressId' => [],
                'userId' => [],
            ],
            searchRule: self::SAME_AS_FIND_RULE,
            listRule: self::SAME_AS_FIND_RULE
        );
    }
}