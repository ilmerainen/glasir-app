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
    Route::get('categories', function() {
        $categories = App\Category::all();
        $response = [];
        $response['/categories'] = 'Categories';

        foreach($categories as ['name' => $name]) {
            $route = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '_', $name));
            $route = "/categories/$route";
            $response[$route] = $name;
        }
        return $response;
    });
});