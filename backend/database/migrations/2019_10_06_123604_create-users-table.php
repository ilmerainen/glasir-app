<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 100);
            $table->string('surname', 100)->nullable();
            $table->string('email', 100)->unique();
            $table->string('token', 100)->unique();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
