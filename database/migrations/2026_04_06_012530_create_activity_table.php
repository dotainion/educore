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
        Schema::create('activities', function (Blueprint $table) {
            $table->uuid('activityId')->primary();
            $table->string('type');
            $table->string('title');
            $table->dateTime('dueDate')->nullable();
            $table->string('priority');
            $table->boolean('completed')->default(false);
            $table->uuid('assignedToId');
            $table->string('relatedTo');
            $table->string('note');
            $table->boolean('hide')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
