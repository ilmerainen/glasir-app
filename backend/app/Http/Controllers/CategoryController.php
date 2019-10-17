<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Category;

class CategoryController extends Controller
{   
    protected $itemsPerPage = 4;
    public function all()
    {
        return Category::all();
    }

    public function category($id) {
        return Category::findOrFail($id)
            ->products()
            ->select('products.id', 'products.name', 'products.price', 'files.path as img')
            ->join('file_product', 'products.id', 'file_product.product_id')
            ->join('files', 'files.id', 'file_product.file_id')
            ->paginate($this->itemsPerPage);
    }
}
