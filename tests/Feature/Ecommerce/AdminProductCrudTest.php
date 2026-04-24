<?php

namespace Tests\Feature\Ecommerce;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminProductCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_product_with_gallery_images(): void
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
            'gallery' => [
                'https://example.com/gallery-1.jpg',
                'https://example.com/gallery-2.jpg',
            ],
            'is_active' => true,
        ])->assertRedirect(route('admin.products.index'));

        $this->assertDatabaseHas('products', ['slug' => 'pro-controller']);
    }

    public function test_product_gallery_cannot_exceed_four_images(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $category = Category::factory()->create();

        $this->actingAs($admin)->post(route('admin.products.store'), [
            'category_id' => $category->id,
            'name' => 'Ultra Keyboard',
            'slug' => 'ultra-keyboard',
            'description' => 'Mechanical keyboard',
            'price' => 129.99,
            'stock' => 12,
            'image' => 'https://example.com/keyboard.jpg',
            'gallery' => [
                'https://example.com/gallery-1.jpg',
                'https://example.com/gallery-2.jpg',
                'https://example.com/gallery-3.jpg',
                'https://example.com/gallery-4.jpg',
                'https://example.com/gallery-5.jpg',
            ],
            'is_active' => true,
        ])->assertSessionHasErrors('gallery');
    }
}
