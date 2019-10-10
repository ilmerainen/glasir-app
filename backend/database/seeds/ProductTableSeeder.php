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
    }
}
