<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisteredController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return \File::get(public_path('index.html'));
});

Route::group(['prefix' => 'api'], function() {
    Route::post('login', LoginController::class);
    Route::post('logout', LogoutController::class);
    Route::post('register', RegisteredController::class);
});
