<?php

namespace App\Http\Controllers\Permission;

use App\Http\Controllers\Controller;
use App\Http\Resources\Permission\PermissionResource;
use App\Models\Permission;
use Illuminate\Http\Request;
use App\Models\User;

class PermissionController extends Controller
{
    public function __construct(){
        parent::__construct(
            model: Permission::class,
            resource: PermissionResource::class,
            createRule: [
               
            ],
            updateRule: [
                
            ]
        );
        $this->response->setStatusCode(successCode: 201);
    }

    // Assign permission to a user
    public function sync(Request $request)
    {
        $request->validate([
            'userId' => 'required|exists:users,userId',
            'permission' => 'required|exists:permissions,name'
        ]);

        $user = User::find($request->userId);
        $user->givePermissionTo($request->permission);

        return $this->response->success(message: 'Permission assigned successfully');
    }
}