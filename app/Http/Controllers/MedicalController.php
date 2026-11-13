<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Requests\MedicalRequest;
use App\Http\Resources\MedicalResource;
use App\Models\Medical;

class MedicalController extends Controller implements IController
{
    public function __construct(){
        $rule = new MedicalRequest();
        parent::__construct(
            model: Medical::class,
            resource: MedicalResource::class,
            createRule: $rule->createRules(),
            updateRule: $rule->updateRules(),
            findRule: [
                'contactId' => [],
            ],
            listRule: self::SAME_AS_FIND_RULE,
            searchRule: self::SAME_AS_FIND_RULE
        );
    }
}