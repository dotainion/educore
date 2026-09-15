<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Resources\HR\DocumentTypeResource;
use App\Models\HR\DocumentType;

class DocumentTypeController extends Controller implements IController
{
    public function __construct(){
        parent::__construct(
            model: DocumentType::class,
            resource: DocumentTypeResource::class,
            createRule: [
                'name' => ['required', 'string'],
                'steps' => ['required', 'array', 'inbox,verification,compliance,approved,legal review,draft,submitted,received,pending review,initial review,manager review,hr review,department review,financial review,technical review,compliance check,legal check,policy review,audit review,pending approval,approved,conditionally approved,rejected,returned,returned to employee,needs changes,clarification required,finalized,archived,signed,executed,completed,auto approved,system approved,escalated,expired,timeout rejected'],
                'risk' => ['required', 'string', 'in:low,medium,high'],
                'autoApprove' => ['required', 'boolean'],
            ],
            updateRule: [
                'docTypeId' => ['required', 'string'],
                'name' => ['string'],
                'steps' => ['required', 'array', 'inbox,verification,compliance,approved,legal review,draft,submitted,received,pending review,initial review,manager review,hr review,department review,financial review,technical review,compliance check,legal check,policy review,audit review,pending approval,approved,conditionally approved,rejected,returned,returned to employee,needs changes,clarification required,finalized,archived,signed,executed,completed,auto approved,system approved,escalated,expired,timeout rejected'],
                'risk' => ['string', 'in:low,medium,high'],
                'autoApprove' => ['boolean'],
            ]
        );
    }
}
