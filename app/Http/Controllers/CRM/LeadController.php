<?php

namespace App\Http\Controllers\CRM;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Resources\CRM\LeadResource;
use App\Models\CRM\Lead;

class LeadController extends Controller implements IController
{
    public function __construct(){
        parent::__construct(
            model: Lead::class,
            resource: LeadResource::class,
            createRule: [
                'name' => ['required', 'string', 'max:255'],
                'title' => ['required', 'string', 'max:255'],
                'email' => ['required', 'email', 'unique:lead,email'],
                'phone' => ['required', 'string', 'max:20'],
                'company' => ['required', 'string', 'max:255'],
                'status' => ['required', 'string', 'max:255'],
                'vip' => ['boolean', 'boolean'],
                'hide' => ['boolean'],
            ],
            updateRule: [
                'leadId' => ['required', 'string'],
                'name' => ['string', 'max:255'],
                'title' => ['string', 'max:255'],
                'email' => ['email', 'unique:lead,email'],
                'phone' => ['string', 'max:20'],
                'company' => ['string', 'max:255'],
                'status' => ['string', 'max:255'],
                'vip' => ['boolean', 'boolean'],
                'hide' => ['boolean'],
            ]
        );
    }
}