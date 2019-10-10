<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFileUserTable extends Migration
{
    public function up()
    {
        Schema::create('file_user', function (Blueprint $table) {
            $table->integer('user_id');
            $table->integer('file_id');
            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('file_id')
                ->references('id')->on('files')
                ->onDelete('cascade')->onUpdate('cascade');
            $table->primary(['user_id', 'file_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('users-files');
    }
}
