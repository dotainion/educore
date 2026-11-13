<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Requests\ContactRequest;
use App\Http\Resources\ContactResource;
use App\Models\Contact;

class ContactController extends Controller implements IController
{
    public function __construct(){
        $rule = new ContactRequest();
        request()->merge([
            'primary' => request()->input('primary') ?? false,
            'vip' => request()->input('vip') ?? false,
        ]);
        parent::__construct(
            model: Contact::class,
            resource: ContactResource::class,
            createRule: $rule->createRules(),
            updateRule: $rule->updateRules(),
            findRule: [
                'contactId' => [],
            ],
            listRule: self::SAME_AS_FIND_RULE,
            searchRule: self::SAME_AS_FIND_RULE
        );
    }
}