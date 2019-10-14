<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class GetCategories extends Controller
{
    public function __invoke(Request $request)
    {
        return Category::all();
    }
}
