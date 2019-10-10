<?php

use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'surname' => $faker->lastname,
        'email' => $faker->unique()->safeEmail,
        'token' => Str::random(100)
    ];
});
