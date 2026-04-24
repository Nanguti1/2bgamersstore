<?php

namespace Tests\Feature\Ecommerce;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class AdminAccessControlTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_assign_role_to_a_user(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $staff = User::factory()->create(['is_admin' => false]);

        Role::findOrCreate('admin');

        $this->actingAs($admin)
            ->patch(route('admin.access-control.users.role', $staff), ['role' => 'admin'])
            ->assertSessionHasNoErrors();

        $this->assertTrue($staff->fresh()->hasRole('admin'));
        $this->assertTrue((bool) $staff->fresh()->is_admin);
    }
}
