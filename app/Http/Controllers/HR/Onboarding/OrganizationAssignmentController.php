<?php

namespace App\Http\Controllers\HR\Onboarding;

use App\Http\Controllers\Controller;
use App\Http\Controllers\IController;
use App\Http\Resources\HR\EmploymentResource;
use App\Models\HR\Employment;
use Illuminate\Http\Request;
use App\Models\HR\LinkDepartment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class OrganizationAssignmentController extends Controller implements IController
{
    protected Model $employment;

    public function set(Request $request){
        $request->validate([
            'userId' => ['required', 'string'],
            'employmentId' => ['required', 'string'],
            'location' => ['required', 'string', 'in:remote,office,hybrid'],
            'departmentIds' => ['required', 'array', 'min:1'],
        ]);

        $this->employment = Employment::findOrFail($request->employmentId);

        DB::transaction(function()use($request){
            $this->employment->update([
                'employmentId' => $request->employmentId,
                'location' => $request->location
            ]);

            foreach($request?->departmentIds ?? [] as $departmentId){
                LinkDepartment::updateOrCreate([
                    'userId' => $request->userId,
                    'departmentId' => $departmentId
                ],[
                    'userId' => $request->userId,
                    'departmentId' => $departmentId
                ]);
            }
        });

        return $this->response->success([
            'employment' => new EmploymentResource($this->employment)
        ]);
    }

    public function create(Request $request){
        return $this->set(request: $request);
    }

    public function update(Request $request){
        return $this->set(request: $request);
    }
}
