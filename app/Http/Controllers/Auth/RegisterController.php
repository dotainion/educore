<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function register(Request $request){
        $values = $request->validate([
            'firstName' => ['required', 'string', 'max:255'],
            'lastName' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'min:6', 'confirmed'],
            'gender' => ['in:male,female'],
            'contact' => [],
            'dob' => ['nullable', 'date'],
            'status' => ['required', 'string', 'in:active,inactive'],
        ]);

        $user = User::create([
            ...$values,
            'password' => Hash::make($request->password),
        ]);

        return $this->response->success([
            'user' => new UserResource($user),
            'token' => $user->createToken('auth_token')->plainTextToken
        ]);
    }
}