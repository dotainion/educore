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
        Schema::create('hr_job', function (Blueprint $table) {
            $table->uuid('jobId')->primary();

            $table->uuid('interviewerId');
            $table->foreign('interviewerId')
                ->references('userId')
                ->on('users')
                ->cascadeOnDelete();

            $table->string('title');
            $table->longText('workplace')->nullable();//Optional location detail 
            $table->string('department');
            $table->string('location');
            $table->longText('description');
            $table->string('responsibilities');
            $table->string('benefits');
            $table->float('salaryMin');
            $table->float('salaryMax');
            $table->string('currency');
            $table->string('payType');
            $table->boolean('showSalary');
            $table->string('experienceLevel');
            $table->string('minExperience');
            $table->string('education');
            $table->json('skills');
            $table->json('documents');//required documents for hiring
            $table->string('employmentType');
            $table->dateTime('deadline');
            $table->string('applicationType');
            $table->string('status');
            $table->boolean('featured');
            $table->boolean('published');
            $table->integer('hires');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hr_job');
    }
};
