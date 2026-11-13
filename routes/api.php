<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\RecoveryController;
use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\ClassFormController;
use App\Http\Controllers\Permission\PermissionController;
use App\Http\Controllers\Role\RoleController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\Users\AddressController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Users\GuardianController;
use App\Http\Controllers\MedicalController;
use App\Http\Controllers\Users\StudentController;
use App\Http\Controllers\Users\UserController;

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

    Route::crud('contact', ContactController::class);
    Route::crud('address', AddressController::class);
    Route::crud('role', RoleController::class);
    Route::prefix('role')->post('/assign', [RoleController::class, 'assignRole']);
    Route::crud('permission', PermissionController::class);

    Route::prefix('sys')->group(function(){
       Route::get('/activity/log/list', [ActivityLogController::class, 'list']);
    });

    Route::prefix('user')->group(function(){
        Route::crud(controller: UserController::class);
        Route::crud('medial', MedicalController::class);
        Route::crud('address', AddressController::class);
    });

    Route::prefix('student')->group(function(){
        Route::crud(controller: StudentController::class);
        Route::crud('guardian', GuardianController::class);
        Route::crud('medial', MedicalController::class);
        Route::crud('address', AddressController::class);
    });

    Route::prefix('class')->group(function(){
        Route::crud(controller: ClassFormController::class);
    });

    Route::prefix('subject')->group(function(){
        Route::crud(controller: SubjectController::class);
    });
});

