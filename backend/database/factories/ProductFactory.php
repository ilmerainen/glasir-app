<?php

use App\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'name' => $faker->unique->word(),
        'description' => $faker->sentence(6, true),
        'price' => $faker->numberBetween(100, 10000)
    ];
});
