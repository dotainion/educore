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
        Schema::create('documents', function (Blueprint $table) {
            $table->uuid('documentId')->primary();

            $table->uuid('employeeId');
            $table->foreign('employeeId')
                ->references('userId')
                ->on('users')
                ->cascadeOnDelete();

            $table->uuid('createdById');
            $table->foreign('createdById')
                ->references('userId')
                ->on('users')
                ->cascadeOnDelete();

            $table->string('originalName');
            $table->string('fileName'); // stored name
            $table->string('path');
            $table->string('mimeType');
            $table->unsignedBigInteger('size');
            $table->string('documentTypeId');
            $table->dateTime('expiry')->nullable();
            $table->longText('note')->nullable();

            $table->boolean('verified')->default(false);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
