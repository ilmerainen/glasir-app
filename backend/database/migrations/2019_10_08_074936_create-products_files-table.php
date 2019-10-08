<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products_files', function (Blueprint $table) {
            $table->integer('products_id');
            $table->integer('files_id');
            $table->string('caption', 100); 
            $table->foreign('products_id')
                ->references('id')->on('products')
                ->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('files_id')
                ->references('id')->on('files')
                ->onDelete('cascade')->onUpdate('cascade');
            $table->primary(['products_id', 'files_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products_files');
    }
}
