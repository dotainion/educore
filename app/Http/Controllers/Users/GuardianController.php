<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Requests\GuardianRequest;
use App\Http\Resources\GuardianResource;
use App\Models\Guardian;

class GuardianController extends Controller implements IController
{
    public function __construct(){
        $rule = new GuardianRequest();
        parent::__construct(
            model: Guardian::class,
            resource: GuardianResource::class,
            createRule: $rule->createRules(),
            updateRule: $rule->updateRules(),
            findRule: [
                'guardianId' => [],
                //'classId' => [],
            ],
            listRule: self::SAME_AS_FIND_RULE,
            searchRule: self::SAME_AS_FIND_RULE
        );
    }
}