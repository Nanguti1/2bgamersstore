<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table): void {
            $table->string('seo_title')->nullable()->after('featured');
            $table->text('seo_description')->nullable()->after('seo_title');
            $table->string('og_title')->nullable()->after('seo_description');
            $table->text('og_description')->nullable()->after('og_title');
            $table->string('twitter_title')->nullable()->after('og_description');
            $table->text('twitter_description')->nullable()->after('twitter_title');
            $table->string('image_alt')->nullable()->after('twitter_description');
        });

        Schema::table('categories', function (Blueprint $table): void {
            $table->string('seo_title')->nullable()->after('description');
            $table->text('seo_description')->nullable()->after('seo_title');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table): void {
            $table->dropColumn(['seo_title', 'seo_description', 'og_title', 'og_description', 'twitter_title', 'twitter_description', 'image_alt']);
        });

        Schema::table('categories', function (Blueprint $table): void {
            $table->dropColumn(['seo_title', 'seo_description']);
        });
    }
};
