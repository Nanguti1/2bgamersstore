<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed roles and permissions first
        $this->call(RolesAndPermissionsSeeder::class);

        // Create default admin user
        User::factory()->create([
            'name' => 'Admin Admin',
            'email' => 'admin@admin.com',
        ]);

        // Seed products and categories
        $this->call(ProductSeeder::class);

        // Seed testimonials
        $this->call(TestimonialSeeder::class);
    }
}
