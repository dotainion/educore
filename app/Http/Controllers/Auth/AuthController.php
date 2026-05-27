<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request){
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'min:6'],
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return $this->response->error('Email does not exist', 404);
        }

        if (! Hash::check($request->password, $user->password)) {
            return $this->response->error('Invalid credentials', 401);
        }

        return $this->response->success(
            data: [
                'user' => new UserResource($user),
                'token' => $user->createToken('auth_token')->plainTextToken
            ],
            message: 'Login successful'
        );
    }
    
    public function logout(Request $request){
        $user = Auth::user();
        
        $request->user()->currentAccessToken()->delete();

        return $this->response->success(
            data: [
                'user' => new UserResource($user),
            ],
            message: 'Logout successful'
        );
    }

    public function session(){
        //There is no role named `admin` for guard `web`.
        //Role::create(['name'=>'admin', 'guard_name', 'sanctum']);
        //Permission::create(['name' => 'can edit', 'guard_name' => 'sanctum']);
        //$user = User::find(Auth::user()->userId);
        //$user->assignRole('admin');
        //$user->givePermissionTo('can edit');
        //$this->authorize('create', User::class);

        return $this->response->success(
            data: [
                'loggedin' => true,
                'user' => new UserResource(Auth::user()),
            ],
            message: 'Login successful'
        );
    }
}  