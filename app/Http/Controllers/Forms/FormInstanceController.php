<?php

namespace App\Http\Controllers\Forms;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Resources\Forms\FormInstanceResource;
use App\Models\Forms\Instance;

class FormInstanceController extends Controller implements IController
{
    public function __construct(){
        parent::__construct(
            model: Instance::class,
            resource: FormInstanceResource::class,
            createRule: [
                'templateId' => ['required', 'string'],
                'type' => ['required', 'string'],
                'label' => ['required', 'string'],
                'value' => ['nullable', 'string'],
                'options' => ['required', 'string'],
            ],
            updateRule: [
                'instanceId' => ['string'],
                'templateId' => ['string'],
                'type' => ['string'],
                'label' => ['string'],
                'value' => ['nullable', 'string'],
                'options' => ['string'],
            ],
            findRule: [
                'instanceId' => ['string'],
                'templateId' => ['string'],
            ],
            searchRule: self::SAME_AS_FIND_RULE,
            listRule: self::SAME_AS_FIND_RULE
        );
    }
}
