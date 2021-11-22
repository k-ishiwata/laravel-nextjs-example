<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IssueController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthenticatedController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('login', [AuthenticatedController::class, 'login']);
Route::post('logout', [AuthenticatedController::class, 'logout']);

Route::group(['middleware' => 'auth:sanctum'], function() {
    Route::get('user', [AuthenticatedController::class, 'user']);
    Route::get('users/list', [UserController::class, 'list']);
    Route::apiResource('issues', IssueController::class);
});
