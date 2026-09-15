<?php

namespace App\Models;

use App\Models\ActivityLog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

trait ActivityLogTrait
{

    protected static function boot(){
        static::bootLogsActivity();
        parent::boot();
    }

    protected static function modelId(Model $model){
        $id = $model->getKeyName();
        return $model->$id;
    }

    protected static function bootLogsActivity(): void{
        // CREATED
        static::created(function (Model $model) {
            if (!Auth::check()) return;

            ActivityLog::create([
                'targetId' => static::modelId($model),
                'subject' => get_class($model),
                'userId' => Auth::id(),
                'action_taken' => 'created',
                'pipeline' => Request::input('pipeline', null),
                'stage_from' => null,
                'stage_to' => $model->status ?? null,
                'message' => Request::input('message', null),
                'meta' => Request::input('meta', null),
            ]);
        });

        // UPDATED (handle stage tracking properly)
        static::updated(function (Model $model) {
            if (!Auth::check()) return;

            $stageFrom = null;
            $stageTo = null;

            if (array_key_exists('status', $model->getChanges())) {
                $stageFrom = $model->getOriginal('status');
                $stageTo   = $model->status;

                // if same → null
                if ($stageFrom === $stageTo) {
                    $stageFrom = null;
                    $stageTo = null;
                }
            }

            ActivityLog::create([
                'targetId' => static::modelId($model),
                'subject' => get_class($model),
                'userId' => Auth::id(),
                'action_taken' => 'updated',
                'pipeline' => Request::input('pipeline', null),
                'stage_from' => $stageFrom,
                'stage_to' => $stageTo,
                'message' => Request::input('message', null),
                'meta' => Request::input('meta', null),
            ]);
        });

        // DELETED
        static::deleted(function (Model $model) {
            if (!Auth::check()) return;

            ActivityLog::create([
                'targetId' => static::modelId($model),
                'subject' => get_class($model),
                'userId' => Auth::id(),
                'action_taken' => 'deleted',
                'pipeline' => null,
                'stage_from' => null,
                'stage_to' => null,
                'message' => Request::input('message', null),
                'meta' => Request::input('meta', null),
            ]);
        });
    }
}
