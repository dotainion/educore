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
        Schema::create('subject_link_classes', function (Blueprint $table) {
            $table->uuid('subjectId');
            $table->uuid('classId');

            $table->foreign('subjectId')
                ->references('subjectId')
                ->on('subjects')
                ->cascadeOnDelete();

            $table->foreign('classId')
                ->references('classId')
                ->on('class_forms')
                ->cascadeOnDelete();

            $table->primary(['subjectId', 'classId']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subject_link_classes');
    }
};
