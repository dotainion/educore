<!-- resources/views/main.blade.php -->
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ config('app.name') }}</title>
        @env('local')
            @viteReactRefresh
        @endenv
        
        @vite('resources/js/apps/employee/main.jsx')
        @vite('resources/js/bootstrap.js')
        @vite('resources/css/app.css')
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>