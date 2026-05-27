<?php

namespace App\Http\Controllers\CRM;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Resources\CRM\DealResource;
use App\Models\CRM\Deal;

class DealController extends Controller implements IController
{
    public function __construct(){
        parent::__construct(
            model: Deal::class,
            resource: DealResource::class,
            createRule: [
               'title' => ['required', 'string', 'max:255'],
                'value' => ['required', 'string', 'max:255'],
                'stage' => ['required', 'string', 'max:255'],
                'probability' => ['required', 'string', 'max:255'],
                'company' => ['required', 'string', 'max:255'],
                'hide' => ['boolean'],
            ],
            updateRule: [
                'dealId' => ['required', 'string'],
                'title' => ['string', 'max:255'],
                'value' => ['string', 'max:255'],
                'stage' => ['string', 'max:255'],
                'probability' => ['string', 'max:255'],
                'company' => ['string', 'max:255'],
                'hide' => ['boolean'],
            ]
        );
    }
}