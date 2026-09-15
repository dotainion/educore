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
        Schema::create('rejected', function (Blueprint $table) {
            $table->uuid('rejectedId')->primary();

            $table->uuid('applicantId');
            $table->foreign('applicantId')
                ->references('applicantId')
                ->on('applicants')
                ->cascadeOnDelete();

            // core reason classification (IMPORTANT FOR ATS REPORTING)
            $table->longText('reason')->nullable();
            $table->string('reasonCategory')->nullable();

            // structured rejection taxonomy (real ATS feature)
            $table->boolean('skillsMismatch')->default(false);
            $table->boolean('experienceInsufficient')->default(false);
            $table->boolean('cultureFit')->default(false);
            $table->boolean('salaryMismatch')->default(false);
            $table->boolean('availabilityIssue')->default(false);
            $table->boolean('poorInterviewPerformance')->default(false);
            $table->boolean('failedAssessment')->default(false);
            $table->boolean('backgroundIssue')->default(false);

            // human explanation
            $table->longText('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rejected');
    }
};
