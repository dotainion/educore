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
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            
            //the object id that was upated
            $table->uuid('targetId');

            // Who the action is about (candidate or employee)
            $table->string('subject'); 
            // subject_type (Applicant/Employee), subject_id

            // Who did it
            $table->foreignId('userId')->nullable();
            $table->foreign('userId')
                ->references('userId')
                ->on('users')
                ->cascadeOnDelete();

            // What happened
            $table->string('action_taken'); 
            // e.g. hired, rejected, moved

            // Pipeline context
            $table->string('pipeline')->nullable(); 
            // recruitment | onboarding

            // State transition (optional but very useful)
            $table->string('stage_from')->nullable();
            $table->string('stage_to')->nullable();

            // Human-readable message (for UI)
            $table->text('message')->nullable();

            // Flexible extra data (VERY important)
            $table->json('meta')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
    }
};
