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
        Schema::create('contacts', function (Blueprint $table) {
            $table->uuid('contactId')->primary();

            $table->boolean('primary')->default(false);
            $table->string('name');
            $table->string('title');//Mr, Mrs
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('company');//name of company eg: work, hospital
            $table->string('type');
            $table->longText('note')->nullable();
            $table->boolean('vip')->default(false);
            $table->string('relationship')->nullable();//the relation between the employee and the emergency contact
            
            $table->uuid('userId');//this can be userId, studentId etc
            $table->foreign('userId')
                ->references('userId')
                ->on('users')
                ->cascadeOnDelete();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
