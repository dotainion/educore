<?php

namespace App\Http\Controllers\HR\Onboarding;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Requests\EmergencyContactRequest;
use App\Http\Resources\HR\EmergencyContactResource;
use App\Models\HR\EmergencyContact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class EmergencyContactsController extends Controller implements IController
{
    protected EmergencyContactRequest $rq;
    protected array $emergencyContacts = [];

    public function __construct(){
        $this->rq = new EmergencyContactRequest();
        parent::__construct(
            model: EmergencyContact::class,
            resource: EmergencyContactResource::class,
            createRule: $this->rq->createRules(),
            updateRule: $this->rq->updateRules(),
            findRule: [
                'contactId' => ['string'],
                'userId' => ['string'],
            ],
            searchRule: self::SAME_AS_FIND_RULE
        );
    }
    
    public function create(Request $request){
        DB::transaction(function() use($request){
            foreach($request->contacts as $contact){
                $validator = Validator::make($contact, $this->rq->createRules());
                $values = $validator->validate();
                $this->emergencyContacts[] = EmergencyContact::create($values);
            }
        });
        
        return $this->response->success([
            'emergencyContacts' => EmergencyContactResource::collection($this->emergencyContacts),
        ]);
    }

    public function update(Request $request){
        DB::transaction(function() use($request){
            foreach($request->contacts as $contact){
                $validator = Validator::make($contact, $this->rq->updateRules());
                $values = $validator->validate();
                $contactId = $values[(new EmergencyContact())->getKeyName()];
                $modal = EmergencyContact::findOrFail($contactId);
                $modal->update($values);
                $this->emergencyContacts[] = $modal;
            }
        });
        
        return $this->response->success([
            'emergencyContacts' => EmergencyContactResource::collection($this->emergencyContacts),
        ]);
    }
}
