<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('class_forms', function (Blueprint $table) {
            $table->uuid('classId')->primary();

            $table->string('name');
            $table->string('level');
            $table->string('formTeacherId')->nullable();
            $table->string('room')->nullable();
            $table->string('capacity');
            $table->string('status');
            $table->string('description');
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('class_form');
    }
};
