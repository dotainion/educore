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
        Schema::create('subject_link_users', function (Blueprint $table) {
            $table->uuid('subjectId');
            $table->uuid('userId');

            $table->foreign('subjectId')
                ->references('subjectId')
                ->on('subjects')
                ->cascadeOnDelete();

            $table->foreign('userId')
                ->references('userId')
                ->on('users')
                ->cascadeOnDelete();

            $table->primary(['subjectId', 'userId']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subject_link_users');
    }
};
