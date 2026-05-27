<?php

use App\Http\Controllers\HR\Onboarding\AddressInformationController;
use App\Http\Controllers\HR\ApplicantController;
use App\Http\Controllers\HR\Onboarding\CompensationPayrollController;
use App\Http\Controllers\HR\DepartmentController;
use App\Http\Controllers\HR\DocumentController;
use App\Http\Controllers\HR\DocumentTypeController;
use App\Http\Controllers\HR\Onboarding\DocumentsComplianceController;
use App\Http\Controllers\HR\Onboarding\EmergencyContactsController;
use App\Http\Controllers\HR\Onboarding\EmployeeProfileController;
use App\Http\Controllers\HR\EmploymentController;
use App\Http\Controllers\HR\Onboarding\EmploymentInformationController;
use App\Http\Controllers\HR\HiredController;
use App\Http\Controllers\HR\InterviewController;
use App\Http\Controllers\HR\JobController;
use App\Http\Controllers\HR\LeaveRequestController;
use App\Http\Controllers\HR\OfferController;
use App\Http\Controllers\HR\Onboarding\OrganizationAssignmentController;
use App\Http\Controllers\HR\RejectedController;
use App\Http\Controllers\HR\ScheduleController;
use App\Http\Controllers\HR\Onboarding\ScheduleWorkforceSettingsController;
use App\Http\Controllers\HR\ScreeningController;
use App\Http\Controllers\HR\Onboarding\SystemAccessPermissionsController;
use App\Http\Controllers\Permission\PermissionController;
use App\Http\Controllers\RBACDefinitionController;
use App\Http\Controllers\Role\RoleController;
use Illuminate\Support\Facades\Route;

Route::prefix('hr')->group(function(){
    Route::prefix('document')->group(function(){
        //this controller have its own auth
        Route::get('show/{documentId}', [DocumentController::class, 'show'])->name('documents.show');
        Route::get('download/{documentId}', [DocumentController::class, 'download'])->name('documents.download');
    });
});

Route::middleware('auth:sanctum')->prefix('hr')->group(function(){
    Route::prefix('document')->group(function(){
        Route::crud(controller: DocumentController::class);
        Route::get('by/employee', [DocumentController::class, 'findByEmployeeId']);
        Route::get('by/creator', [DocumentController::class, 'findByCreatedById']);
        Route::get('delete', [DocumentController::class, 'delete']);
        Route::crud('type', DocumentTypeController::class);
    });

    Route::prefix('applicant')->group(function(){
        Route::crud(controller: ApplicantController::class);
        Route::crud('screening', ScreeningController::class);
        Route::crud('interview', InterviewController::class);
        Route::crud('offer', OfferController::class);
        Route::crud('hired', HiredController::class);
        Route::crud('rejected', RejectedController::class);
    });

    Route::crud('department', DepartmentController::class);
    Route::crud('employment', EmploymentController::class);
    Route::crud('leave/request', LeaveRequestController::class);
    Route::crud('job', JobController::class);
    Route::crud('schedule', ScheduleController::class);

    Route::prefix('sys')->group(function(){
       Route::get('/roles/&/permisson/by/modules', [RBACDefinitionController::class, 'schema']);
    });

    Route::prefix('role')->group(function(){
        Route::post('roles/sync', [RoleController::class, 'sync']);
        Route::post('permissions/sync', [PermissionController::class, 'sync']);
    });

    Route::prefix('onboarding')->group(function(){
        Route::crud('profile', EmployeeProfileController::class);
        Route::crud('employment/info', EmploymentInformationController::class);
        Route::crud('schedule/settings', ScheduleWorkforceSettingsController::class);
        Route::crud('compensation', CompensationPayrollController::class);
        Route::crud('emergency/contact', EmergencyContactsController::class);
        Route::crud('addr/info', AddressInformationController::class);
        Route::crud('permissions', SystemAccessPermissionsController::class);
        Route::crud('documents', DocumentsComplianceController::class);
        Route::crud('org/assignment', OrganizationAssignmentController::class);
    });
});
