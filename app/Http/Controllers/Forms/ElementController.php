<?php

namespace App\Http\Controllers\Forms;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Resources\Forms\ElementResource;
use App\Models\Forms\Element;

class ElementController extends Controller implements IController
{
    public function __construct(){
        parent::__construct(
            model: Element::class,
            resource: ElementResource::class,
            createRule: [
                'templateId' => ['required', 'string'],
                'type' => ['nullable', 'string'],
                'label' => ['nullable', 'string'],
                'defaultValue' => ['nullable', 'string'],
                'options' => ['nullable', 'array'],//label, value
            ],
            updateRule: [
                'elementId' => ['string'],
                'templateId' => ['string'],
                'type' => ['nullable', 'string'],
                'label' => ['nullable', 'string'],
                'defaultValue' => ['nullable', 'string'],
                'options' => ['nullable', 'array'],//label, value
            ],
            findRule: [
                'elementId' => ['string'],
                'templateId' => ['string'],
            ],
            searchRule: self::SAME_AS_FIND_RULE,
            listRule: self::SAME_AS_FIND_RULE
        );
    }
}
