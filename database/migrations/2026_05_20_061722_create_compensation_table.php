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
        Schema::create('compensations', function (Blueprint $table) {
            $table->uuid('compensationId')->primary();

            $table->uuid('userId');
            $table->foreign('userId')
                ->references('userId')
                ->on('users')
                ->cascadeOnDelete();

            $table->decimal('salary', 12, 2);
            $table->string('currency');//usd
            $table->string('payFrequency');//weekly,biweekly,monthly,on-contract-end
            $table->decimal('overtimeRate', 3, 2);// 1.5,
            $table->boolean('bonusEligible');
            $table->string('taxCategory');//standard,reduced,exempt
            //$table->json('allowances'); todo.. should allowance be a seperate table or added here

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('compensations');
    }
};
