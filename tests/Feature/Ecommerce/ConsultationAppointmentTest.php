<?php

namespace Tests\Feature\Ecommerce;

use App\Models\ConsultationAppointment;
use App\Models\Product;
use App\Models\ProductReview;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ConsultationAppointmentTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_book_consultation_appointment_with_pending_status(): void
    {
        $this->post(route('consultation.appointments.store'), [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'phone' => '+254700123123',
            'preferred_at' => now()->addDay()->format('Y-m-d H:i:s'),
            'message' => 'Need help with PS5 setup.',
        ])->assertRedirect();

        $this->assertDatabaseHas('consultation_appointments', [
            'email' => 'jane@example.com',
            'status' => 'pending',
        ]);
    }

    public function test_admin_can_approve_appointment(): void
    {
        Notification::fake();

        $admin = User::factory()->create(['is_admin' => true]);
        $appointment = ConsultationAppointment::factory()->create(['status' => 'pending']);

        $this->actingAs($admin)
            ->patch(route('admin.consultation-appointments.status', $appointment), [
                'status' => 'approved',
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('consultation_appointments', [
            'id' => $appointment->id,
            'status' => 'approved',
        ]);

        Notification::assertSentOnDemandTimes(1);
    }

    public function test_community_page_displays_paginated_products_and_reviews(): void
    {
        $products = Product::factory()->count(12)->create();
        ProductReview::factory()->for($products->first())->create();

        $this->get(route('community.page'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Store/Info')
                ->where('page', 'community')
                ->has('community.products.data')
                ->has('community.reviews.data')
            );
    }
}
