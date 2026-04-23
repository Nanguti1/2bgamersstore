<?php

namespace Database\Factories;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Models\Address;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'address_id' => Address::factory(),
            'total_amount' => fake()->randomFloat(2, 40, 500),
            'status' => OrderStatus::Pending,
            'payment_status' => PaymentStatus::Pending,
        ];
    }
}
