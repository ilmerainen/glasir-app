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
// categories 
Route::middleware(['api'])->group(function () {
    Route::prefix('categories')->group(function() {
        Route::get('/{id}', 'CategoryController@category');
        Route::get('/', 'CategoryController@all');    
    });
    
    Route::prefix('products')->group(function () {
        Route::get('top/{count?}', 'ProductController@top');
    });
});