<?php

use App\OrderProduct;
use Faker\Generator as Faker;

$factory->define(OrderProduct::class, function (Faker $faker) {
    return [
        'product_count' => $faker->numberBetween(1, 10)
    ];
});
