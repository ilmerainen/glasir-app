<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFileProductTable extends Migration
{
    public function up()
    {
        Schema::create('file_product', function (Blueprint $table) {
            $table->integer('product_id');
            $table->integer('file_id');
            $table->string('caption', 100)->nullable(); 
            $table->foreign('product_id')
                ->references('id')->on('products')
                ->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('file_id')
                ->references('id')->on('files')
                ->onDelete('cascade')->onUpdate('cascade');
            $table->primary(['product_id', 'file_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('products_files');
    }
}
