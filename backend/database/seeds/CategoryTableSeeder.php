<?php

use Illuminate\Database\Seeder;

class CategoryTableSeeder extends Seeder
{
    public function run()
    {
        $categories = ([
            "Computer Science",
            "Databases & Big Data",
            "Graphics & Design",
            "Hardware & DIY",
            "Internet & Social Media",
            "Networking & Cloud Computing",
            "Operating Systems",
            "Programming",
            "Programming Languages",
            "Security & Encryption",
            "Web Development & Design"
            ]
        );

        foreach ($categories as $name) {
            $category = new App\Category;
            $category->name = $name;
            $category->save();
        }
    }
}
