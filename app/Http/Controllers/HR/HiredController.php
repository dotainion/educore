<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Resources\HR\HiredResource;
use App\Models\HR\Hired;

class HiredController extends Controller implements IController
{
    public function __construct(){
        parent::__construct(
            model: Hired::class,
            resource: HiredResource::class,
            createRule: [
                'applicantId' => ['string', 'required'],
                'jobAcceptedAt' => ['string'],
                'jobAccepted' => ['boolean'],
                'startDate' => ['string'],
            ],
            updateRule: [
                'hiredId' => ['string', 'required'],
                'applicantId' => ['string', 'required'],
                'jobAccepted' => ['boolean'],
                'jobAcceptedAt' => ['string'],
                'startDate' => ['string'],
            ],
            findRule: [
                'hiredId' => ['string'],
                'applicantId' => ['string']
            ]
        );
    }

}
