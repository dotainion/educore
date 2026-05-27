<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Foundation\Http\FormRequest;
use Exception;

trait RuleControlController
{
    const CREATE_RULE_OFF = 'CREATE_OFF';
    const UPDATE_RULE_OFF = 'UPDATE_OFF';
    const DELETE_RULE_OFF = 'DELETE_OFF';
    const FIND_RULE_OFF = 'FIND_OFF';
    const LIST_RULE_OFF = 'LIST_OFF';
    const SEARCH_RULE_OFF = 'SEARCH_OFF';

    const SAME_AS_CRATE_RULE = 'SAME_AS_CRATE_RULE';
    const SAME_AS_UPDATE_RULE = 'SAME_AS_UPDATE_RULE';
    const SAME_AS_DELETE_RULE = 'SAME_AS_DELETE_RULE';
    const SAME_AS_FIND_RULE = 'SAME_AS_FIND_RULE';
    const SAME_AS_LIST_RULE = 'SAME_AS_LIST_RULE';
    const SAME_AS_SEARCH_RULE = 'SAME_AS_SEARCH_RULE';

    protected array|string $createRule = [];
    protected array|string $updateRule = [];
    protected array|string $deleteRule = [];

    protected array|string $findRule = [];
    protected array|string $listRule = [];
    protected array|string $searchRule = [];

    public function setCrudRequirements(
        string $model,
        string $resource,
        array|string $createRule,
        array|string $updateRule,
        array|string $deleteRule,
        array|string $findRule,
        array|string $listRule,
        array|string $searchRule
    ){
        if (!class_exists($model)) {
            throw new Exception("Model class {$model} not found");
        }
        if (!class_exists($resource)) {
            throw new Exception("Resource class {$resource} not found");
        }

        $this->model = $model;
        $this->resource = $resource;
        $this->createRule = $createRule;
        $this->updateRule = $updateRule;
        $this->deleteRule = $deleteRule;
        $this->findRule = $findRule;
        $this->listRule = $listRule;
        $this->searchRule = $searchRule;

        $this->ruleCloning();
        $this->parseProperties();
    }

    private function ruleCloning(){
        $this->createRule = $this->ruleCopy($this->createRule);
        $this->updateRule = $this->ruleCopy($this->updateRule);
        $this->deleteRule = $this->ruleCopy($this->deleteRule);
        $this->findRule = $this->ruleCopy($this->findRule);
        $this->listRule = $this->ruleCopy($this->listRule);
        $this->searchRule = $this->ruleCopy($this->searchRule);
    }

    private function ruleNeedCopy(mixed $rule):bool{
        return is_string($rule) && in_array($rule, [
            self::SAME_AS_CRATE_RULE,
            self::SAME_AS_UPDATE_RULE,
            self::SAME_AS_DELETE_RULE,
            self::SAME_AS_FIND_RULE,
            self::SAME_AS_LIST_RULE,
            self::SAME_AS_SEARCH_RULE
        ]);
    }

    private function ruleCopy(mixed $rule):mixed{
        if(!$this->ruleNeedCopy($rule)){
            return $rule;
        }else if($rule === self::SAME_AS_CRATE_RULE){
            return $this->createRule;
        }else if($rule === self::SAME_AS_UPDATE_RULE){
            return $this->updateRule;
        }else if($rule === self::SAME_AS_DELETE_RULE){
            return $this->deleteRule;
        }else if($rule === self::SAME_AS_FIND_RULE){
            return $this->findRule;
        }else if($rule === self::SAME_AS_LIST_RULE){
            return $this->listRule;
        }else if($rule === self::SAME_AS_SEARCH_RULE){
            return $this->searchRule;
        }
        return $rule;
    }

    public function disableAllRules():self{
        $this->createRule = self::CREATE_RULE_OFF;
        $this->updateRule = self::UPDATE_RULE_OFF;
        $this->deleteRule = self::DELETE_RULE_OFF;
        $this->findRule = self::FIND_RULE_OFF;
        $this->listRule = self::LIST_RULE_OFF;
        $this->searchRule = self::SEARCH_RULE_OFF; 
        return $this;
    }

    private function parseProperties(): void
    {
        $this->modelName = Str::camel(class_basename($this->model));
        $this->pluralModelName = Str::plural($this->modelName);
    }

    private function limit(){
        return (int)env('APP_PAGINATION_LIMIT', 20);
    }

    // =========================
    // VALIDATION RESOLVER (FIXED)
    // =========================
    protected function validateData(Request $request, array|string $rules)
    {
        // -------------------------
        // ARRAY RULES (NORMAL)
        // -------------------------
        if (is_array($rules)) {
            return $request->validate($rules);
        }

        // -------------------------
        // FORM REQUEST (FULL LARAVEL PIPELINE)
        // -------------------------
        if (is_string($rules) && is_subclass_of($rules, FormRequest::class)) {

            /** @var FormRequest $formRequest */
            $formRequest = app($rules);

            // 🔥 CRITICAL: bind everything properly
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

            // 🔥 THIS runs:
            // - authorize()
            // - rules()
            // - prepareForValidation()
            // - withValidator()
            // - passedValidation()
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

    protected function assertCrud(string $cmd): bool{
        if(!in_array($cmd, ['CREATE', 'UPDATE', 'DELETE', 'FIND', 'LIST', 'SEARCH'])){
            throw new Exception("{$cmd} assert crud key is invalid.");
        }
        $this->method = $cmd;
        $this->assertCrudException($cmd === 'CREATE' && $this->createRule === self::CREATE_RULE_OFF);
        $this->assertCrudException($cmd === 'UPDATE' && $this->updateRule === self::UPDATE_RULE_OFF);
        $this->assertCrudException($cmd === 'DELETE' && $this->deleteRule === self::DELETE_RULE_OFF);
        $this->assertCrudException($cmd === 'FIND' && $this->findRule === self::FIND_RULE_OFF);
        $this->assertCrudException($cmd === 'LIST' && $this->listRule === self::LIST_RULE_OFF);
        $this->assertCrudException($cmd === 'SEARCH' && $this->searchRule === self::SEARCH_RULE_OFF);
        return true;
    }

    public function searchQueryRules(){
        //this uses handles if rules allow both string or array
        $rules = $this->searchRule;
        $arrayRules = [];

        foreach($this->searchRule as $name => $rule){
            if(str_contains($name, '.*')){
                $arrayRules[$name] = $rule;
            }
        }

        foreach($arrayRules as $name => $rule){
            $raw = str_replace('.*', '', $name);
            if(is_array(request()->input($raw))){
                $rules[$name] = $rule;
                unset($rules[$raw]);
            }
        }
        return $rules;
    }
}