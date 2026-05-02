<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('mpesa_s_t_k_s', function (Blueprint $table): void {
            $table->foreignId('order_id')->nullable()->after('id')->constrained('orders')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('mpesa_s_t_k_s', function (Blueprint $table): void {
            $table->dropConstrainedForeignId('order_id');
        });
    }
};
