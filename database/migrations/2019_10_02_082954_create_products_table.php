<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('active')->default(false);
            $table->string('code');
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->integer('brand_id')->unsigned()->nullable();
            $table->foreign('brand_id')->references('id')->on('brands')->onDelete('cascade');
            $table->text('description');
            $table->string('material')->nullable();
            $table->string('dimensions')->nullable();
            $table->text('images')->nullable();
            $table->string('image_alt')->default('image alt name');
            $table->string('meta_keywords')->default('keywords');
            $table->string('meta_description')->default('description');
            $table->boolean('sale')->default(false);
            $table->boolean('new')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
