<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Http\Resources\HR\LeaveRequestResource;
use App\Models\HR\LeaveRequest;

class LeaveRequestController extends Controller
{
    public function __construct(){
        parent::__construct(
            model: LeaveRequest::class,
            resource: LeaveRequestResource::class,
            createRule: [
                'employeeId' => ['required', 'string'],
                'type' => ['required', 'string', 'in:sick,vacation,personal,emergency,maternity,paternity,bereavement,unpaid,other'],
                'from' => ['required', 'string'],
                'to' => ['required', 'string'],
                'status' => ['required', 'string', 'in:pending,approved,rejected'],
                'reason' => ['required', 'string'],
            ],
            updateRule: [
                'leaveId' => ['required', 'string'],
                'employeeId' => ['string'],
                'type' => ['string', 'in:sick,vacation,personal,emergency,maternity,paternity,bereavement,unpaid,other'],
                'from' => ['string'],
                'to' => ['string'],
                'status' => ['string', 'in:pending,approved,rejected'],
                'reason' => ['string'],
            ],
            searchRule: [
                'leaveId' => [],
                'employeeId' => [],
                'status' => ['in:pending,approved,rejected'],
                'status.*' => ['in:pending,approved,rejected'],
                'type' => [],
                'reason' => []
            ]
        );
    }
}
