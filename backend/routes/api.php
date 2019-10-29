<?php

use Illuminate\Http\Request;

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

Route::middleware(['api'])->group(function () {
    Route::prefix('categories')->group(function () {
        Route::get('/{id}/products', 'CategoryController@products');
        Route::get('/', 'CategoryController@index');
    });

    Route::prefix('products')->group(function () {
        Route::get('/top/{count?}', 'ProductController@top');
        Route::get('/{id}', 'ProductController@show');
    });

    Route::prefix('profile')->middleware(['custom_auth'])->group(function () {
        Route::get('/', 'ProfileController@index');
        Route::post('/', 'ProfileController@store');
    });

    Route::post('/signin', 'SigninController@store');
    Route::post('/signup', 'SignupController@store');
});
