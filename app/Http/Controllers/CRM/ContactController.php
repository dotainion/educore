<?php

namespace App\Http\Controllers\CRM;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Resources\CRM\ContactResource;
use App\Models\CRM\Contact;

class ContactController extends Controller implements IController
{
    public function __construct(){
        parent::__construct(
            model: Contact::class,
            resource: ContactResource::class,
            createRule: [
               'name' => ['required', 'string', 'max:255'],
                'title' => ['required', 'string', 'max:255'],
                'email' => ['required', 'email', 'unique:contact,email'],
                'phone' => ['required', 'string', 'max:20'],
                'company' => ['required', 'string', 'max:255'],
                'vip' => ['boolean', 'boolean'],
                'hide' => ['boolean'],
            ],
            updateRule: [
                'contactId' => ['required', 'string'],
                'name' => ['string', 'max:255'],
                'title' => ['string', 'max:255'],
                'email' => ['email', 'unique:contact,email'],
                'phone' => ['string', 'max:20'],
                'company' => ['string', 'max:255'],
                'vip' => ['boolean', 'boolean'],
                'hide' => ['boolean'],
            ]
        );
    }
}