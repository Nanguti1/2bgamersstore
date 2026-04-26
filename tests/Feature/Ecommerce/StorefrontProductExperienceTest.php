<?php

namespace Tests\Feature\Ecommerce;

use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class StorefrontProductExperienceTest extends TestCase
{
    use RefreshDatabase;

    public function test_products_page_shows_twenty_items_by_default(): void
    {
        Product::factory()->count(25)->create();

        $this->get(route('products.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Products/Index')
                ->has('products.data', 20)
                ->where('products.current_page', 1)
            );
    }

    public function test_products_page_filters_by_category_slug(): void
    {
        $consoles = Category::factory()->create(['name' => 'Consoles', 'slug' => 'consoles']);
        $laptops = Category::factory()->create(['name' => 'Gaming Laptops', 'slug' => 'gaming-laptops']);
        Product::factory()->create(['category_id' => $consoles->id, 'name' => 'Console Product']);
        Product::factory()->create(['category_id' => $laptops->id, 'name' => 'Laptop Product']);

        $this->get(route('products.index', ['category' => 'consoles']))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Products/Index')
                ->has('products.data', 1)
                ->where('products.data.0.name', 'Console Product')
                ->where('filters.category', 'consoles')
            );
    }

    public function test_products_page_filters_by_search_text(): void
    {
        Product::factory()->create(['name' => 'PlayStation 5', 'description' => 'Console bundle']);
        Product::factory()->create(['name' => 'Gaming Chair', 'description' => 'Ergonomic']);

        $this->get(route('products.index', ['search' => 'PlayStation']))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Products/Index')
                ->has('products.data', 1)
                ->where('products.data.0.name', 'PlayStation 5')
                ->where('filters.search', 'PlayStation')
            );
    }

    public function test_account_page_shows_orders_for_authenticated_users(): void
    {
        $user = User::factory()->create();
        $product = Product::factory()->create(['name' => 'Account Product']);
        $order = Order::factory()->for($user)->create();
        OrderItem::factory()->for($order)->for($product)->create();

        $this->actingAs($user)
            ->get(route('account.page'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Store/Info')
                ->where('page', 'account')
                ->where('account.user.email', $user->email)
                ->has('account.orders.data', 1)
            );
    }
}
