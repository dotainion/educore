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
        Schema::create('screenings', function (Blueprint $table) {
            $table->uuid('screeningId')->primary();

            $table->uuid('applicantId');
            $table->foreign('applicantId')
                ->references('applicantId')
                ->on('applicants')
                ->cascadeOnDelete();

            // core checks
            $table->boolean('skillsMatch')->default(false);
            $table->boolean('experienceMatch')->default(false);
            $table->boolean('cvQuality')->default(false);
            $table->boolean('salaryFit')->default(false);
            $table->boolean('availabilityFit')->default(false);
            $table->boolean('locationFit')->default(false);

            // evaluation scoring
            $table->integer('technicalScore')->default(0);
            $table->integer('communicationScore')->default(0);
            $table->integer('experienceScore')->default(0);
            $table->integer('cultureFitScore')->default(0);

            // qualitative
            $table->longText('note')->nullable();
            $table->longText('redFlags')->nullable();
            $table->longText('strengths')->nullable();

            // decision
            $table->string('recommendation')->nullable();

            // meta
            $table->boolean('sourceVerified')->default(false);
            $table->boolean('backgroundCheckNeeded')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('screenings');
    }
};
