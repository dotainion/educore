<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Requests\ClassFormRequest;
use App\Http\Resources\ClassFormResource;
use App\Models\ClassForm;

class ClassFormController extends Controller implements IController
{
    public function __construct(){
        $rule = new ClassFormRequest();
        parent::__construct(
            model: ClassForm::class,
            resource: ClassFormResource::class,
            createRule: $rule->createRules(),
            updateRule: $rule->updateRules(),
            findRule: [
                'classId' => [],
                'formTeacherId' => [],
            ],
            listRule: self::SAME_AS_FIND_RULE,
            searchRule: self::SAME_AS_FIND_RULE
        );
    }
}