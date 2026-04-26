<?php

namespace Database\Factories;

use App\Models\ConsultationAppointment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ConsultationAppointment>
 */
class ConsultationAppointmentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'phone' => fake()->numerify('+2547########'),
            'preferred_at' => now()->addDays(3)->setTime(10, 0),
            'message' => fake()->sentence(),
            'status' => 'pending',
            'admin_note' => null,
            'reviewed_at' => null,
        ];
    }
}
