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
        Schema::create('offers', function (Blueprint $table) {
            $table->uuid('offerId');

            $table->uuid('applicantId');
            $table->foreign('applicantId')
                ->references('applicantId')
                ->on('applicants')
                ->cascadeOnDelete();
            
            $table->integer('salaryBase')->default(0);
            $table->string('salaryCurrency');
            $table->integer('bonus')->default(0);
            $table->integer('equity')->default(0);

            // offer terms
            $table->dateTime('startDate')->nullable();
            $table->string('contractType')->default('full-time');
            $table->integer('probationPeriod')->default(3);

            // benefits
            $table->boolean('healthInsurance')->default(false);
            $table->boolean('remoteWork')->default(false);
            $table->boolean('pension')->default(false);
            $table->boolean('flexibleHours')->default(false);
            $table->integer('annualLeave')->default(0);

            // negotiation
            $table->longText('candidateExpectation')->nullable();
            $table->longText('negotiationNotes')->nullable();

            // compliance
            $table->boolean('backgroundCheckRequired')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offers');
    }
};
