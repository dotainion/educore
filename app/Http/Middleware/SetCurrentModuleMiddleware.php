<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetCurrentModuleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        //this is just for testing this file is not being use
        $segment = $request->segment(1); // first part of URL
        var_dump('hello');

        app()->instance('current_module', $segment);
        return $next($request);
    }
}
