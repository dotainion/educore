<?php

namespace App\Http\Controllers\Forms;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Resources\Forms\FormTemplateResource;
use App\Models\Forms\FormTemplate;

class FormTemplateController extends Controller implements IController
{
    public function __construct(){
        parent::__construct(
            model: FormTemplate::class,
            resource: FormTemplateResource::class,
            createRule: [
                'pages' => ['required', 'array'],//pageId, name
            ],
            updateRule: [
                'templateId' => ['required', 'string'],
                'pages' => ['array'],//pageId, name
            ],
            findRule: [
                'templateId' => ['string'],
            ],
            searchRule: self::SAME_AS_FIND_RULE,
            listRule: self::SAME_AS_FIND_RULE
        );
    }
}
