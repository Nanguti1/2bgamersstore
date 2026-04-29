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
        Schema::create('mpesa_c2_b_s', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_type')->nullable();
            $table->string('transaction_id')->nullable();
            $table->string('transaction_time')->nullable();
            $table->string('amount')->nullable();
            $table->string('business_short_code')->nullable();
            $table->string('account_number')->nullable();
            $table->string('invoice_number')->nullable();
            $table->string('organization_account_balance')->nullable();
            $table->string('third_party_transaction_id')->nullable();
            $table->string('phonenumber')->nullable();
            $table->string('first_name')->nullable();
            $table->string('middle_name')->nullable();
            $table->string('last_name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mpesa_c2_b_s');
    }
};
