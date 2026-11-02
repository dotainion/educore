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
        Schema::create('students', function (Blueprint $table) {
            $table->uuid('studentId')->primary();
            
            $table->uuid('classId')->nullable();
            $table->uuid('addressId')->nullable();
            $table->string('firstName');
            $table->string('middleName');
            $table->string('lastName');
            $table->string('gender');
            $table->string('nationality');
            $table->string('religion');
            $table->string('phone');
            $table->string('email')->unique();
            $table->string('enrolmentDate');
            $table->string('enrolmentType');
            $table->string('previousSchool')->nullable();
            $table->string('previousClass')->nullable();
            $table->string('parentName')->nullable();
            $table->string('parentRelationship')->nullable();
            $table->string('parentPhone')->nullable();
            $table->string('parentEmail')->nullable();
            $table->string('parentOccupation')->nullable();
            $table->string('bloodGroup')->nullable();
            $table->string('allergies')->nullable();
            $table->string('medicalConditions')->nullable();
            $table->string('doctorName')->nullable();
            $table->string('doctorPhone')->nullable();
            $table->string('notes')->nullable();
            $table->string('status')->default('active');
            $table->string('dob')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
