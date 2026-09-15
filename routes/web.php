<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn () => redirect('/apps'));
Route::get('/apps', fn () => view('launcher'));
Route::get('/dashboard', fn () => view('dashboard'));
Route::get('/employee', fn () => view('employee'));
Route::get('/payroll', fn () => view('payroll'));
Route::get('/attendance', fn () => view('attendance'));
Route::get('/leave', fn () => view('leave'));
Route::get('/task', fn () => view('task'));
Route::get('/project', fn () => view('project'));
Route::get('/invoice', fn () => view('invoice'));
Route::get('/expense', fn () => view('expense'));
Route::get('/crm', fn () => view('CRM'));
Route::get('/hr', fn () => view('HR'));

Route::get('/support', fn () => view('support'));
Route::get('/account', fn () => view('/account'))->name('login');

Route::get('/testing', fn () => view('testing'));
