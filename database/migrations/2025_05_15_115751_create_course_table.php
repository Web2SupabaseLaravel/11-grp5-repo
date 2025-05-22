<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price')->nullable();
            $table->text('learning_object')->nullable();
            $table->foreignId('user_id')->constrained('users');
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
