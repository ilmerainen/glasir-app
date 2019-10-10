<?php

use Illuminate\Database\Seeder;

class OrderTableSeeder extends Seeder
{
    protected $users;
    protected $products_max_id;

    function __construct()
    {
        $this->users = App\User::all();
        $this->products_max_id = $this->users->count();;
    }

    protected function getRandomIdArray() {
        $rand_products_count = rand(1, 7);
        $products_id_arr = array();

        while (count($products_id_arr) < $rand_products_count) {
            $products_id_arr[] = rand(1, $this->products_max_id);
            $products_id_arr = array_unique($products_id_arr);
        }
        
        return $products_id_arr;
    }

    public function run()
    {        
        foreach ($this->users as $user) {
            $order = factory(App\Order::class, rand(0, 3))->make();
            $user->orders()->saveMany($order);
        }

        $orders = App\Order::all();

        foreach ($orders as $order) {
            $products_id_arr = $this->getRandomIdArray();

            foreach ($products_id_arr as $product_id) {
                $order->products()->attach($product_id, ['count' => rand(1, 10)]);
            }
        }
    }
}
