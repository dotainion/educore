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
        Schema::create('users_link_classes', function (Blueprint $table) {
            $table->uuid('userId');
            $table->uuid('classId');

            $table->foreign('userId')
                ->references('userId')
                ->on('users')
                ->cascadeOnDelete();

            $table->foreign('classId')
                ->references('classId')
                ->on('class_forms')
                ->cascadeOnDelete();

            $table->primary(['userId', 'classId']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users_link_classes');
    }
};
