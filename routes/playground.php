<?php

use App\Models\HR\DocumentType;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->prefix('playground')->group(function(){
    Route::prefix('mock/data')->group(function(){
        return;
        if(DocumentType::all()->isEmpty()){
            foreach([
                [
                    'name' => 'Passport',
                    'steps' => 'Inbox,Verificatio,Compliance,Approved',
                    'risk' => 'high',
                    'autoApprove' => false,
                ],[
                    'name' => 'ID Card',
                    'steps' => 'Inbox,Verification,Approved',
                    'risk' => 'medium',
                    'autoApprove' => false,
                ],[
                    'name' => 'Employment Contract',
                    'steps' => 'Inbox,Verification,Legal Review,Approved',
                    'risk' => 'high',
                    'autoApprove' => false,
                ],[
                    'name' => 'Certification',
                    'steps' => 'Inbox,Verification,Approved',
                    'risk' => 'low',
                    'autoApprove' => true,
                ],[
                    'name' => 'Tax Form',
                    'steps' => 'Inbox,Compliance,Approved',
                    'risk' => 'high',
                    'autoApprove' => false,
                ],
            ] as $docType){
                DocumentType::create([
                    'name' => $docType['name'],
                    'steps' => $docType['steps'],
                    'risk' => $docType['risk'],
                    'autoApprove' => $docType['autoApprove'],
                ]);
            }
        }
        return response(['message' => 'Done']);
    });
});
