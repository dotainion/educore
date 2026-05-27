<?php

namespace App\Http\Controllers;

use App\Constants\RBACDefinition;
use App\Http\Controllers\Controller;

class RBACDefinitionController extends Controller
{
    public function schema(){
        return response()->json([
            'roles' => RBACDefinition::roles(),
            'modules' => RBACDefinition::modules(),
            'permissions' => RBACDefinition::permissions(),
        ]);
    }
}