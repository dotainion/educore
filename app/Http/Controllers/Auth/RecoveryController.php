<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;

class RecoveryController extends Controller
{
    public function recover(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
        ]);

        $status = Password::sendResetLink($request->only('email'));

        $this->response->success([
            'success' => $status === Password::RESET_LINK_SENT,
            'message' => $status === Password::RESET_LINK_SENT
                ? 'An email with instructions to recover your account was sent to {$request->email}.'
                : 'Unable to send password reset email. Please try again.'
        ]);
    }

    public function tokenValidation($token)
    {
        $record = DB::table('password_resets')->where('token', $token)->first();
        return $this->response->success([
            'valid' => $record ? true : false,
            'token' => $token,
            'email' => $record->email ?? null,
        ]);
    }

    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email|exists:users,email',
            'password' => 'required|confirmed|min:6',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->password = Hash::make($password);
                $user->save();
            }
        );

        return $this->response->success([
            'success' => $status === Password::PASSWORD_RESET,
            'message' => $status === Password::PASSWORD_RESET
                ? 'Password has been successfully reset.'
                : 'Failed to reset password. Token may be invalid or expired.',
        ]);
    }
}