<?php

namespace App\Http\Controllers\HR\Onboarding;

use App\Http\Controllers\IController;
use App\Http\Controllers\Users\UserController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class EmployeeProfileController extends UserController implements IController
{
    //using extended controller

    public function boot()
    {
        $this->intercepter(function(&$values){
            $values['password'] = Hash::make(Str::uuid());
        }, ['creating', 'updating']);
    }
}
