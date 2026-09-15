<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\RecoveryController;
use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\Permission\PermissionController;
use App\Http\Controllers\Role\RoleController;
use App\Http\Controllers\Users\AddressController;

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::prefix('password')->group(function(){
    Route::post('/recovery', [RecoveryController::class, 'recover']);             // Send reset email
    Route::post('/reset', [RecoveryController::class, 'reset']);                  // Reset password
    Route::get('/reset/{token}', [RecoveryController::class, 'tokenValidation']); // Validate token
});

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/session', [AuthController::class, 'session']);

    Route::crud('address', AddressController::class);
    Route::crud('role', RoleController::class);
    Route::prefix('role')->post('/assign', [RoleController::class, 'assignRole']);
    Route::crud('permission', PermissionController::class);

    Route::prefix('sys')->group(function(){
       Route::get('/activity/log/list', [ActivityLogController::class, 'list']);
    });
});

/*
Route::middleware(['role:admin'])->group(function(){
    Route::get('/admin/dashboard', 'AdminController@dashboard');
    Route::get('/admin/users', 'AdminController@users');
});
Route::post('/roles', [RoleController::class, 'store'])->middleware('role:admin');
Route::post('/permissions', [PermissionController::class, 'store'])->middleware('role:admin');
Route::post('/assign-role', [RoleController::class, 'assignRole'])->middleware('role:admin');
Route::post('/assign-permission', [PermissionController::class, 'assignPermission'])
    ->middleware('role:admin')
    ->middleware('permission:edit articles|delete posts');*/

