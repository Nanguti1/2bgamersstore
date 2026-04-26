<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    public function test_returns_home_page_with_expected_inertia_payload(): void
    {
        Product::factory()->create(['featured' => true, 'is_active' => true]);
        Product::factory()->create(['featured' => false, 'is_active' => true]);

        $response = $this->get(route('home'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Store/Home')
            ->has('featuredProducts')
            ->has('testimonials'));

        $featuredProducts = $response->viewData('page')['props']['featuredProducts'];

        $this->assertCount(1, $featuredProducts);
        $this->assertTrue((bool) $featuredProducts[0]['featured']);
    }
}
