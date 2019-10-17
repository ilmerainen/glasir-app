<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\File;
use Faker\Generator as Faker;

$factory->define(File::class, function (Faker $faker) {
    $system_name = $faker->unique->word(5, 15);

    return [
        'system_name' => $system_name,
        'path' => "https://picsum.photos/seed/$system_name/1200/675"
    ];
});
