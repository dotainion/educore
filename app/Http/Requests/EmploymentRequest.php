<?php

namespace App\Http\Requests;

class EmploymentRequest extends BaseRequest
{
    protected array $rules = [
        'status' => ['in:active,probation,on-leave,suspended,terminated'],
        'probationEndDate' => ['string'],
        'probationPassed' => ['boolean'],
        'position' => ['string'],
        'contractType' => ['in:permanent,fixed-term,temporary,freelance'],
        'workHoursPerWeek' => ['integer'],
        'userId' => ['string'],
        'managerId' => ['string'],
        'enrolmentDate' => ['string'],
        'employmentType' => ['string', 'in:fulltime,parttime,contract,temporary,intern,consultant'],
    ];
    protected array $update_only_rules = [
        'employmentId' => ['required', 'string'],
    ];
    protected array $required = [
        'employmentId',
        'status',
        'probationEndDate',
        'probationPassed',
        'position',
        'contractType',
        'workHoursPerWeek',
        'userId',
        'managerId',
        'enrolmentDate',
        'employmentType',
    ];

    public function authorize(): bool{
        return true;
    }
}
