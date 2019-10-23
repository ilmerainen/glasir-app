<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFilesTable extends Migration
{
    public function up()
    {
        Schema::create('files', function (Blueprint $table) {
            $table->increments('id');
            $table->string('system_name')->unique();
            $table->string('client_name')->nullable();
            $table->string('path')->unique();
        });
    }

    public function down()
    {
        Schema::dropIfExists('Files');
    }
}
