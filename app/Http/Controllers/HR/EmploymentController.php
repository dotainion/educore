<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Requests\EmploymentRequest;
use App\Http\Resources\HR\EmploymentResource;
use App\Models\HR\Employment;

class EmploymentController extends Controller implements IController
{
    public function __construct(){
        $rule = new EmploymentRequest();
        parent::__construct(
            model: Employment::class,
            resource: EmploymentResource::class,
            createRule: $rule->createRules(),
            updateRule: $rule->updateRules(),
            findRule: [
                'employmentId' => [],
                'userId' => []
            ],
            searchRule: self::SAME_AS_FIND_RULE
        );
    }
}
