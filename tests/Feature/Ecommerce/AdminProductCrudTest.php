<?php

namespace Tests\Feature\Ecommerce;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminProductCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_product(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $category = Category::factory()->create();

        $this->actingAs($admin)->post(route('admin.products.store'), [
            'category_id' => $category->id,
            'name' => 'Pro Controller',
            'slug' => 'pro-controller',
            'description' => 'Tournament controller',
            'price' => 79.99,
            'stock' => 20,
            'image' => 'https://example.com/image.jpg',
            'is_active' => true,
        ])->assertRedirect(route('admin.products.index'));

        $this->assertDatabaseHas('products', ['slug' => 'pro-controller']);
    }
}
