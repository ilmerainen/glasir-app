<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    public function run()
    {
        factory(App\User::class, 50)->create()
            ->each(function ($user) {
                $user->orders()->save(factory(App\Order::class)->make());
        });
    }
}
