<?php

namespace Tests\Feature\Ecommerce;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AdminProductCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_manage_products_page(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        $this->actingAs($admin)
            ->get(route('admin.products.index'))
            ->assertOk();
    }

    public function test_admin_can_create_product_with_gallery_images(): void
    {
        Storage::fake('public');

        $admin = User::factory()->create(['is_admin' => true]);
        $category = Category::factory()->create();

        $this->actingAs($admin)->post(route('admin.products.store'), [
            'category_id' => $category->id,
            'name' => 'Pro Controller',
            'slug' => 'pro-controller',
            'description' => 'Tournament controller',
            'price' => 79.99,
            'stock' => 20,
            'image' => UploadedFile::fake()->image('main.jpg'),
            'gallery' => [
                UploadedFile::fake()->image('gallery-1.jpg'),
                UploadedFile::fake()->image('gallery-2.jpg'),
            ],
            'is_active' => true,
            'featured' => true,
        ])->assertRedirect(route('admin.products.index'));

        $this->assertDatabaseHas('products', ['slug' => 'pro-controller', 'featured' => true]);
    }

    public function test_product_gallery_cannot_exceed_four_images(): void
    {
        Storage::fake('public');

        $admin = User::factory()->create(['is_admin' => true]);
        $category = Category::factory()->create();

        $this->actingAs($admin)->post(route('admin.products.store'), [
            'category_id' => $category->id,
            'name' => 'Ultra Keyboard',
            'slug' => 'ultra-keyboard',
            'description' => 'Mechanical keyboard',
            'price' => 129.99,
            'stock' => 12,
            'image' => UploadedFile::fake()->image('main.jpg'),
            'gallery' => [
                UploadedFile::fake()->image('gallery-1.jpg'),
                UploadedFile::fake()->image('gallery-2.jpg'),
                UploadedFile::fake()->image('gallery-3.jpg'),
                UploadedFile::fake()->image('gallery-4.jpg'),
                UploadedFile::fake()->image('gallery-5.jpg'),
            ],
            'is_active' => true,
            'featured' => false,
        ])->assertSessionHasErrors('gallery');
    }

    public function test_admin_can_view_product_details_page(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $product = Product::factory()->create();

        $this->actingAs($admin)
            ->get(route('admin.products.show', $product))
            ->assertOk();
    }

    public function test_admin_can_toggle_featured_status_from_list(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $product = Product::factory()->create(['featured' => false]);

        $this->actingAs($admin)
            ->patch(route('admin.products.featured', $product), ['featured' => true])
            ->assertRedirect();

        $this->assertTrue((bool) $product->fresh()->featured);
    }

    public function test_admin_can_update_product_gallery_and_remove_existing_images(): void
    {
        Storage::fake('public');

        $admin = User::factory()->create(['is_admin' => true]);
        $category = Category::factory()->create();
        $product = Product::factory()->create([
            'category_id' => $category->id,
            'gallery' => ['/storage/products/original-1.jpg', '/storage/products/original-2.jpg'],
        ]);

        $this->actingAs($admin)
            ->patch(route('admin.products.update', $product), [
                'category_id' => $category->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'description' => $product->description,
                'price' => $product->price,
                'stock' => $product->stock,
                'existing_gallery' => ['/storage/products/original-2.jpg'],
                'gallery' => [UploadedFile::fake()->image('new-gallery.jpg')],
                'is_active' => true,
                'featured' => false,
            ])
            ->assertRedirect();

        $updatedProduct = $product->fresh();

        $this->assertContains('/storage/products/original-2.jpg', $updatedProduct->gallery);
        $this->assertCount(2, $updatedProduct->gallery);
    }
}
