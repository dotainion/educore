<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller implements IController
{
    public function __construct(){
        $rule = new UserRequest();
        parent::__construct(
            model: User::class,
            resource: UserResource::class,
            createRule: $rule->createRules(),
            updateRule: $rule->updateRules(),
            findRule: [
                'userId' => [],
            ],
            listRule: self::SAME_AS_FIND_RULE,
            searchRule: self::SAME_AS_FIND_RULE
        );
    }
}