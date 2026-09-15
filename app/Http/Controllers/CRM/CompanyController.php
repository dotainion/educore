<?php

namespace App\Http\Controllers\CRM;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Resources\CRM\CompanyResource;
use App\Models\CRM\Company;

class CompanyController extends Controller implements IController
{
    public function __construct(){
        parent::__construct(
            model: Company::class,
            resource: CompanyResource::class,
            createRule: [
               'name' => ['required', 'string', 'max:255'],
                'industry' => ['required', 'string', 'max:255'],
                'phone' => ['required', 'string', 'nullable', 'max:20'],
                'ownerId' => ['required', 'string', 'max:255'],
                'vip' => ['boolean', 'boolean'],
                'website' => ['string'],
                'note' => ['string'],
                'hide' => ['boolean'],
            ],
            updateRule: [
                'companyId' => ['required', 'string'],
                'name' => ['string', 'max:255'],
                'industry' => ['string', 'max:255'],
                'phone' => ['string', 'max:20'],
                'owner' => ['string', 'max:255'],
                'vip' => ['boolean', 'boolean'],
                'website' => ['string'],
                'note' => ['string'],
                'hide' => ['boolean'],
            ]
        );
    }
}