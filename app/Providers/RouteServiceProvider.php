<?php

namespace App\Providers;

use App\Helpers\RoleAndPermissionHelper;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    const API_FILE_NAMES = [

    ];

    public function path($name){
        return base_path("routes/{$name}.php");
    }

    public function register(): void{

    }

    public function boot(): void{
        Route::macro('crud', function (
            string $prefix = '',
            string|null $controller = null,
            string|array|null $middleware = null
        ) {
            Route::prefix($prefix)
                ->middleware($middleware)
                ->group(function () use ($controller) {
                    Route::post('/create', [$controller, 'create']);
                    Route::patch('/update', [$controller, 'update']);
                    Route::delete('/delete', [$controller, 'delete']);
                    Route::get('/find', [$controller, 'find']);
                    Route::get('/list', [$controller, 'list']);
                    Route::get('/search', [$controller, 'search']);
                });
        });
        
        Route::prefix('api')->group(function(){
            foreach(self::API_FILE_NAMES as $name){
                Route::middleware('api')->group($this->path($name));
            }
        });
        
        request()->attributes->set('module', new RoleAndPermissionHelper());
    }
}
