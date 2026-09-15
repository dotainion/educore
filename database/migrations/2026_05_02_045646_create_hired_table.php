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
        Schema::create('hired', function (Blueprint $table) {
            $table->uuid('hiredId')->primary();

            $table->uuid('applicantId');
            $table->foreign('applicantId')
                ->references('applicantId')
                ->on('applicants')
                ->cascadeOnDelete();
                
            $table->boolean('jobAccepted')->default(true);
            $table->string('jobAcceptedAt')->nullable();
            $table->dateTime('startDate')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hired');
    }
};
