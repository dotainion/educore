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
        Schema::create('leave_requests', function (Blueprint $table) {
            $table->uuid('leaveId')->primary();
            
            $table->uuid('employeeId');
            $table->foreign('employeeId')
                ->references('userId')
                ->on('users')
                ->cascadeOnDelete();

            $table->string('type');
            $table->dateTime('from');
            $table->dateTime('to');
            $table->string('status');//pending,approved,rejected
            $table->longText('reason');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leave_requests');
    }
};
