<?php

namespace App\Http\Controllers\HR\Onboarding;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Resources\HR\CompensationResource;
use App\Models\HR\Compensation;

class CompensationPayrollController extends Controller implements IController
{
    public function __construct(){
        parent::__construct(
            model: Compensation::class,
            resource: CompensationResource::class,
            createRule: [
                'userId' => ['string'],
                'salary' => ['required'],//decimal
                'currency' => ['required', 'string', 'in:usd,ecd'],
                'payFrequency' => ['required', 'string', 'in:weekly,biweekly,monthly,on-ontract-end'],
                'overtimeRate' => ['required'],//decimal
                'bonusEligible' => ['required', 'boolean'],
                'taxCategory' => ['required', 'string', 'in:standard,reduced,exempt'],
            ],
            updateRule: [
                'compensationId' => ['string'],
                'userId' => ['string'],
                'salary' => [],//decimal
                'currency' => ['string', 'in:usd,ecd'],
                'payFrequency' => ['string', 'in:weekly,biweekly,monthly,on-ontract-end'],
                'overtimeRate' => [],//decimal
                'bonusEligible' => ['boolean'],
                'taxCategory' => ['string', 'in:standard,reduced,exempt'],
            ],
            findRule: [
                'compensationId' => [],
                'userId' => [],
            ],
            searchRule: self::SAME_AS_FIND_RULE
        );
    }
}
