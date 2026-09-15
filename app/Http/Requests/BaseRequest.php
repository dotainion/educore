<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

abstract class BaseRequest extends FormRequest
{
    const CREATE_RULE = 'CREATE_RULE';
    const UPDATE_RULE = 'UPDATE_RULE';

    protected array $rules = [];
    protected array $create_only_rules = [];
    protected array $update_only_rules = [];
    protected array $required = [];

    public function rules(): array{
        return [
            ...$this->rules,
            ...$this->create_only_rules,
            ...$this->update_only_rules
        ];
    }

    private function appendRules(string $cmd, $r=[]): array{
        $rules = [];
        foreach([...$this->rules, ...$r] as $property => $rule){
            if($cmd === self::CREATE_RULE){
                if(in_array($property, $this->required) && !in_array('required', $rule)){
                    $rule = ['required', ...$rule];
                }
            }else if($cmd === self::UPDATE_RULE){
                if(in_array('required', $rule)){
                    $rule = array_filter($rule, fn($rl)=>$rl === 'required');
                }
            }
            $rules[$property] = $rule;
        }
        return $rules;
    }

    public function createRules(): array{
        return $this->appendRules(self::CREATE_RULE, $this->create_only_rules);
    }

    public function updateRules(): array{
        return $this->appendRules(self::UPDATE_RULE, $this->update_only_rules);
    }
}
