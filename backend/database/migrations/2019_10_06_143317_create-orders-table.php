<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->string('country', 100);
            $table->string('city', 100);
            $table->string('street', 100);
            $table->integer('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamp('created_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
