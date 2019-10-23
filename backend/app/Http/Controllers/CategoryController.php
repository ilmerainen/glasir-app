<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Category;
use Config;

class CategoryController extends Controller
{   
    public function index()
    {
        return Category::all();
    }

    public function products(Request $request, $id) {
        $category = Category::findOrFail($id);
        $perPageParam = $request->input('per_page');
        $maxCountPerPage = Config::get('constants.maxItemCountPerPage');
        $perPage = isset($perPageParam) && ($perPageParam <= $maxCountPerPage) ?
            $perPageParam :
            Config::get('constants.itemCountPerPage');

        return $category
            ->products()
            ->select('products.id', 'products.name', 'products.price', 'files.path as img')
            ->join('file_product', 'products.id', 'file_product.product_id')
            ->join('files', 'files.id', 'file_product.file_id')
            ->paginate($perPage);
    }
}
