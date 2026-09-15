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
        Schema::create('schedule_settings', function (Blueprint $table) {
            $table->uuid('settingsId')->primary();

            $table->uuid('userId');
            $table->foreign('userId')
                ->references('userId')
                ->on('users')
                ->cascadeOnDelete();
                
            $table->boolean('eligibleForScheduling');
            $table->boolean('allowWeekends');
            $table->boolean('allowNightShifts');
            $table->boolean('allowOvertime');
            $table->integer('maxHoursPerWeek');
            $table->integer('minRestHours');
            $table->integer('maxConsecutiveDays');
            $table->integer('priorityWeight');
            $table->json('weeklyAvailability');//{day, type: '', start: '', end: ''}
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedule_settings');
    }
};
