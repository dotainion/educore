<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Requests\DepartmentRequest;
use App\Http\Resources\HR\DepartmentResource;
use App\Models\HR\Department;

class DepartmentController extends Controller implements IController
{
    public function __construct(){
        $rq = new DepartmentRequest();
        parent::__construct(
            model: Department::class,
            resource: DepartmentResource::class,
            createRule: $rq->createRules(),
            updateRule: $rq->updateRules()
        );
    }
}
