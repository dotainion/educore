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
        Schema::create('interviews', function (Blueprint $table) {
            $table->uuid('interviewId')->primary();

            $table->uuid('applicantId');
            $table->foreign('applicantId')
                ->references('applicantId')
                ->on('applicants')
                ->cascadeOnDelete();

            $table->string('interviewType');

            // structured scoring
            $table->integer('communication')->default(0);
            $table->integer('technical')->default(0);
            $table->integer('problemSolving')->default(0);
            $table->integer('cultureFit')->default(0);
            $table->integer('confidence')->default(0);

            // qualitative feedback
            $table->longText('feedback')->nullable();
            $table->longText('strengths')->nullable();
            $table->longText('concerns')->nullable();

            // decision
            $table->string('recommendation')->default('pending');

            // checklist
            $table->boolean('preparationGood')->default(false);
            $table->boolean('answeredClearly')->default(false);
            $table->boolean('technicalDepth')->default(false);
            $table->boolean('culturalAlignment')->default(false);
            $table->boolean('roleUnderstanding')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interviews');
    }
};
