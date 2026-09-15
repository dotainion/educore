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
        Schema::create('emergency_contacts', function (Blueprint $table) {
            $table->uuid('contactId')->primary();

            $table->uuid('userId');
            $table->foreign('userId')
                ->references('userId')
                ->on('users')
                ->cascadeOnDelete();

            $table->string('name')->nullable();
            $table->string('relationship')->nullable();//the relation between the employee and the emergency contact
            $table->string('phone');
            $table->boolean('primary')->default(false);
            $table->longText('note')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emergency_contacts');
    }
};
