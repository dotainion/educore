<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CRM\ActivityController;
use App\Http\Controllers\CRM\CompanyController;
use App\Http\Controllers\CRM\ContactController;
use App\Http\Controllers\CRM\DealController;
use App\Http\Controllers\CRM\LeadController;

Route::middleware('auth:sanctum')->prefix('crm')->group(function(){
    Route::crud('activity', ActivityController::class);
    Route::crud('company', CompanyController::class);
    Route::crud('contact', ContactController::class);
    Route::crud('activity', DealController::class);
    Route::crud('lead', LeadController::class);
});
