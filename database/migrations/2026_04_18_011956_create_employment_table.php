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
        Schema::create('employments', function (Blueprint $table) {
            $table->uuid('employmentId')->primary();
            
            $table->uuid('userId');
            $table->foreign('userId')
                ->references('userId')
                ->on('users')
                ->cascadeOnDelete();

            $table->string('status');//active,probation,on leave,suspended,terminated
            $table->dateTime('probationEndDate');
            $table->boolean('probationPassed');
            $table->string('position');
            $table->string('location')->nullable();//remote,office,hybrid
            $table->string('contractType');//Permanent
            $table->integer('workHoursPerWeek');
            $table->uuid('managerId')->nullable();
            $table->dateTime('enrolmentDate');
            $table->string('employmentType');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employments');
    }
};
