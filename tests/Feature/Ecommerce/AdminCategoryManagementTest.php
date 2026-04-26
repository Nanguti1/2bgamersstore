<?php

namespace Tests\Feature\Ecommerce;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminCategoryManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_category_without_providing_slug(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        $this->actingAs($admin)
            ->post(route('admin.categories.store'), [
                'name' => 'Gaming Consoles',
                'description' => 'Console products',
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('categories', [
            'name' => 'Gaming Consoles',
            'slug' => 'gaming-consoles',
            'description' => 'Console products',
        ]);
    }

    public function test_category_slug_is_incremented_when_duplicate_name_exists(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        Category::factory()->create([
            'name' => 'Gaming Consoles',
            'slug' => 'gaming-consoles',
        ]);

        $this->actingAs($admin)
            ->post(route('admin.categories.store'), [
                'name' => 'Gaming Consoles!',
                'description' => 'Another category',
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('categories', [
            'name' => 'Gaming Consoles!',
            'slug' => 'gaming-consoles-1',
        ]);
    }

    public function test_admin_can_update_category_description(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $category = Category::factory()->create([
            'description' => null,
        ]);

        $this->actingAs($admin)
            ->patch(route('admin.categories.update', $category), [
                'name' => $category->name,
                'description' => 'Updated description',
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('categories', [
            'id' => $category->id,
            'description' => 'Updated description',
        ]);
    }
}
