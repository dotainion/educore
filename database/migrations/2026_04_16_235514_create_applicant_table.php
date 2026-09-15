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
        Schema::create('applicants', function (Blueprint $table) {
            $table->uuid('applicantId')->primary();
            $table->boolean('systemAccess');
            $table->boolean('firstDayCompleted');
            $table->boolean('payrollSetup');
            $table->boolean('equipmentAssigned');
            $table->string('firstName');
            $table->string('lastName');
            $table->string('email');
            $table->string('contact');
            $table->string('dob')->nullable();
            $table->string('gender');

            $table->uuid('addressId');
            $table->foreign('addressId')
                ->references('addressId')
                ->on('addresses')
                ->cascadeOnDelete();

            $table->uuid('jobId');
            $table->foreign('jobId')
                ->references('jobId')
                ->on('hr_job')
                ->cascadeOnDelete();

            $table->boolean('shortlisted')->default(false);
            $table->string('status')->default('applied');// "Interview",
            $table->string('position');// "Technical", position applying for
            $table->json('skills');// ["React", "JS", "CSS"],
            $table->longText('experience');//work experience

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicants');
    }
};
