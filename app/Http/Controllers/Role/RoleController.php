<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use App\Http\Resources\Role\RoleResource;
use App\Models\Role;
use Illuminate\Http\Request;
use App\Models\User;

class RoleController extends Controller
{
    public function __construct(){
        parent::__construct(
            model: Role::class,
            resource: RoleResource::class,
            createRule: [
               'name' => 'required|string|unique:roles,name'
            ],
            updateRule: [
               'name' => 'string|unique:roles,name'
            ]
        );
        $this->response->setStatusCode(successCode: 201);
    }

    // Assign role to a user
    public function sync(Request $request)
    {
        $request->validate([
            'userId' => 'required|exists:users,id',
            'role' => 'required|exists:roles,name'
        ]);

        $user = User::find($request->userId);
        $user->assignRole($request->role);

        return $this->response->success(message: 'Role assigned successfully');
    }
}