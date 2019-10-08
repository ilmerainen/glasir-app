<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders_products', function (Blueprint $table) {
            $table->integer('orders_fk');  
            $table->integer('products_fk');
            $table->foreign('orders_fk')->references('id')->on('orders')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('products_fk')->references('id')->on('products')->onDelete('cascade')->onUpdate('cascade');
            $table->primary(['orders_fk', 'products_fk']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Orders_Products');
    }
}
