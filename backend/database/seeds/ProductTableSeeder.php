<?php

use Illuminate\Database\Seeder;

class ProductTableSeeder extends Seeder
{
    public function run()
    {   
        $categories = App\Category::all();

        foreach ($categories as $category) {
            $category->products()->saveMany(factory(App\Product::class, rand(5, 10))->make());
        }

        $products = App\Product::all();

        foreach ($products as $product) {
            $product->files()->save(factory(App\File::class)->make());
        }
    }
}
