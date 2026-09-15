<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Database\Eloquent\Model;

trait ControllerIntercepter
{
    protected $intercepter = [
        'CREATING' => [],
        'UPDATING' => []
    ];

    public function boot(){
        //the method creating and updating will be called inside here
        //this method need to be use in the aprent controller
    }

    public function creating(callable $callable){
        $this->intercepter['CREATING'][] = $callable;
    }

    public function updating(callable $callable){
        $this->intercepter['UPDATING'][] = $callable;
    }

    public function intercepter(callable $callable, array $commands){
        foreach($commands ?? [] as $command){
            $command = mb_strtoupper($command);
            if(!isset($this->intercepter[$command])){
                throw new Exception("Invalid command: {$command}");
            }
            $this->intercepter[$command][] = $callable;
        }
    }

    private function creatingIntercepter(array &$values, ?Model &$model = null){
        foreach($this->intercepter['CREATING'] ?? [] as $intercepter){
            $intercepter($values, $model, $this);
        }
    }

    private function updatingIntercepter(array &$values, ?Model &$model = null){
        foreach($this->intercepter['UPDATING'] ?? [] as $intercepter){
            $intercepter($values, $model, $this);
        }
    }
}