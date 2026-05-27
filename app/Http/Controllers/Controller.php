<?php

namespace App\Http\Controllers;

use App\Helpers\RoleAndPermissionHelper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Http\FormRequest;
use Exception;

abstract class Controller extends RoleAndPermissionHelper
{
    use AuthorizesRequests, ControllerIntercepter, RuleControlController;

    protected ControllerResponse $response;
    protected string $method;

    protected string $model;
    protected string $resource;

    protected string $modelName;
    protected string $pluralModelName;

    public function __construct(
        ?string $model = null,
        ?string $resource = null,
        array|string|null $createRule = null,
        array|string|null $updateRule = null,
        array|string|null $deleteRule = null,
        array|string|null $findRule = null,
        array|string|null $listRule = null,
        array|string|null $searchRule = null,
    ){
        $this->response = new ControllerResponse();

        if ($model && $resource) {
            $this->setCrudRequirements(
                $model,
                $resource,
                $createRule ?? [],
                $updateRule ?? [],
                $deleteRule ?? [],
                $findRule ?? [],
                $listRule ?? [],
                $searchRule ?? []
            );
        }
        $this->boot();
    }

    private function parseProperties(): void{
        $this->modelName = Str::camel(class_basename($this->model));
        $this->pluralModelName = Str::plural($this->modelName);
    }

    private function limit(){
        return (int)env('APP_PAGINATION_LIMIT', 20);
    }

    protected function validateData(Request $request, array|string $rules){
        if (is_array($rules)) {
            return $request->validate($rules);
        }
        
        if (is_string($rules) && is_subclass_of($rules, FormRequest::class)) {
            $formRequest = app($rules);
            $formRequest->setContainer(app())
                ->setRedirector(app('redirect'))
                ->setUserResolver(fn () => $request->user())
                ->setRouteResolver(fn () => $request->route())
                ->initialize(
                    $request->query->all(),
                    $request->request->all(),
                    $request->attributes->all(),
                    $request->cookies->all(),
                    $request->files->all(),
                    $request->server->all(),
                    $request->getContent()
                );
            $formRequest->validateResolved();
            return $formRequest->validated();
        }

        throw new Exception('Invalid validation rules provided');
    }

    protected function assertCrudException(bool $crudNotAllowed){
        if($crudNotAllowed){
            throw new Exception("Connot {$this->method} {$this->modelName}");
        }
        return true;
    }

    protected function model(): Model
    {
        $class = $this->model;
        return new $class();
    }

    protected function resource($data): JsonResource
    {
        $class = $this->resource;
        return new $class($data);
    }

    protected function resourceCollection($data)
    {
        $class = $this->resource;
        return $class::collection($data);
    }

    protected function resolveId(Request $request): mixed
    {
        return $request->input($this->model()->getKeyName());
    }

    public function validateQueryFindRequest(Request $request): array
    {
        return $request->validate([
            $this->model()->getKeyName() => 'required|string'
        ]);
    }

    // -------------------------
    // CRUD
    // -------------------------
    public function create(Request $request)
    {
        $this->assertCrud('CREATE');

        $values = $this->validateData($request, $this->createRule);
        $this->creatingIntercepter($values);
        $model = $this->model::create($values);

        return $this->response->success([
            $this->modelName => $this->resource($model)
        ]);
    }

    public function update(Request $request)
    {
        $this->assertCrud('UPDATE');

        $id = $this->resolveId($request);
        $values = $this->validateData($request, $this->updateRule);

        $model = $this->model::findOrFail($id);
        $this->updatingIntercepter($values, $model);
        $model->update($values);

        return $this->response->success([
            $this->modelName => $this->resource($model)
        ]);
    }

    public function delete(Request $request)
    {
        $this->assertCrud('DELETE');

        $this->validateQueryFindRequest($request);
        $id = $this->resolveId($request);

        $model = $this->model::findOrFail($id);
        $model->delete();

        return $this->response->success([
            $this->modelName => $this->resource($model)
        ]);
    }

    public function find(Request $request)
    {
        $this->assertCrud('FIND');

        if(empty($this->findRule)){
            $this->validateQueryFindRequest($request);
            $id = $this->resolveId($request);

            $model = $this->model::findOrFail($id);
        }else{
            $values = $request->validate($this->findRule);
            if(count($values) > 1){
                throw new Exception('find method in controller only allow 1 attribute in request at a time.');
            }
            $model = $this->model::where($values)->firstOrFail();
        }

        return $this->response->success([
            $this->modelName => $this->resource($model)
        ]);
    }

    public function list(Request $request)
    {
        $this->assertCrud('LIST');

        if(empty($this->listRule)){
            $models = $this->model::latest()->paginate($this->limit());
        }else{
            $values = $request->validate($this->searchQueryRules());
            $query = $this->model::query();

            foreach ($values as $field => $value) {
                if ($value !== null && $value !== '') {
                    if (is_array($value)) {
                        if (!empty($value)) {
                            $query->whereIn($field, $value);
                        }
                    } else {
                        $query->where($field, $value);
                    }
                }
            }
            
            $models = $query->latest()->paginate($this->limit());
        }
        
        return $this->response->success([
            $this->pluralModelName => $this->resourceCollection($models)
        ]);
    }

    public function search(Request $request)
    {
        $this->assertCrud('SEARCH');

        $filters = $request->validate($this->searchQueryRules());
        $query = $this->model::query();

        $query->where(function ($q) use ($filters) {
            foreach ($filters as $field => $value) {
                if ($value === null || $value === '') {
                    continue;
                }
                if (is_array($value)) {
                    foreach ($value as $val) {
                        if (!empty($val)) {
                            $q->orWhere($field, 'LIKE', "%{$val}%");
                        }
                    }
                    continue;
                }
                $q->orWhere($field, 'LIKE', "%{$value}%");
            }
        });

        $models = $query->latest()->paginate($this->limit());

        return $this->response->success([
            $this->pluralModelName => $this->resourceCollection($models)
        ]);
    }
}