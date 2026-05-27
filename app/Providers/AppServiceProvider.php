<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //this is an example of adding singleton
        /*$this->app->singleton('roleHelper', function(){
            return new RoleAndPermissionHelper();
        });*/
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
