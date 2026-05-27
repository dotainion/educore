<?php

use App\Http\Controllers\Users\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->prefix('employee')->group(function(){
    Route::crud(controller: UserController::class);
});