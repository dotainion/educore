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
        Schema::create('medicals', function (Blueprint $table) {
            $table->uuid('medicalId')->primary();
            
            $table->string('bloodGroup');
            $table->string('allergies');
            $table->string('conditions');
            $table->string('doctorName');
            $table->string('doctorPhone');
            $table->string('notes');
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical');
    }
};
