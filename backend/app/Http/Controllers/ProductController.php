<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\OrderProduct;
use App\Product;
use App\File;
use Config;

class ProductController extends Controller
{
    protected $topCount;

    function __construct() {
        $this->topCount = Config::get('constants.topItemCount');
    }

    public function show($id)
    {
        return $product = Product::with('files:id,path')
            ->where('id', $id)
            ->first()
            ->toJson();
    }

    public function top(Request $request)
    {
        $count = $request->input('count', $this->topCount);

        $aggregates = DB::table('order_product')
            ->select(DB::raw('product_id as id, sum(count) as qty'))
            ->groupBy('product_id');

        $products = DB::table('file_product')
            ->select('products.id', 'products.name', 'aggregates.qty', 'files.path')
            ->join('files', 'file_product.file_id', 'files.id')
            ->join('products', 'file_product.product_id', 'products.id')
            ->joinSub($aggregates, 'aggregates', function ($join) {
                $join->on('aggregates.id', '=', 'file_product.product_id');
            })
            ->orderBy('aggregates.qty', 'desc')
            ->limit($count)
            ->get();

        return $products;
    }
}
