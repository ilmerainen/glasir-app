<?php

use App\Order;
use Faker\Generator as Faker;

$factory->define(Order::class, function (Faker $faker) {
    return [
        'country' => $faker->country(),
        'city' => $faker->city(),
        'street' => $faker->streetAddress(),
        'created_at' => $faker->iso8601()
    ];
});
