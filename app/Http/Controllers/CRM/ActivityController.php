<?php

namespace App\Http\Controllers\CRM;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Resources\CRM\ActivityResource;
use App\Models\CRM\Activity;

class ActivityController extends Controller implements IController
{
    public function __construct(){
        parent::__construct(
            model: Activity::class,
            resource: ActivityResource::class,
            createRule: [
               'type' => ['required', 'string', 'max:255'],
                'title' => ['required', 'string', 'max:255'],
                'dueDate' => ['required', 'string', 'max:255'],
                'priority' => ['required', 'string', 'max:255'],
                'completed' => ['boolean', 'nullable'],
                'assignedToId' => ['required'],
                'relatedTo' => ['string'],
                'note' => ['string'],
                'hide' => ['boolean'],
            ],
            updateRule: [
                'activityId' => ['required', 'string'],
                'type' => ['string', 'max:255'],
                'title' => ['string', 'max:255'],
                'dueDate' => ['string', 'max:255'],
                'priority' => ['string', 'max:255'],
                'completed' => ['boolean', 'nullable'],
                'assignedToId' => [],
                'relatedTo' => ['string'],
                'note' => ['string'],
                'hide' => ['boolean'],
            ]
        );
    }
}