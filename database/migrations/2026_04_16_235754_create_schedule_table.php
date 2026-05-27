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
        Schema::create('schedules', function (Blueprint $table) {
            $table->uuid('scheduleId')->primary();
            
            $table->uuid('userId');//userId or applicantId
            $table->uuid('createdById');
            $table->string('modelName');

            $table->uuid('interviewerId');
            $table->foreign('interviewerId')
                ->references('userId')
                ->on('users')
                ->cascadeOnDelete();

            $table->string('type');
            $table->string('duration');
            $table->dateTime('time');
            $table->longText('notes')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
