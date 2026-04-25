<?php

namespace Tests\Feature\Ecommerce;

use App\Models\Product;
use App\Models\ProductReview;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProductReviewTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_create_or_update_a_product_review(): void
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();

        $this->actingAs($user)->post(route('products.reviews.store', $product), [
            'rating' => 5,
            'comment' => 'Great quality product, I really like the build finish.',
        ])->assertRedirect();

        $this->assertDatabaseHas('product_reviews', [
            'product_id' => $product->id,
            'user_id' => $user->id,
            'rating' => 5,
        ]);

        $this->actingAs($user)->post(route('products.reviews.store', $product), [
            'rating' => 4,
            'comment' => 'Still good after one week of usage and tests done.',
        ])->assertRedirect();

        $this->assertDatabaseCount('product_reviews', 1);
        $this->assertDatabaseHas('product_reviews', [
            'product_id' => $product->id,
            'user_id' => $user->id,
            'rating' => 4,
        ]);
    }

    public function test_product_page_loads_reviews_and_review_stats(): void
    {
        $product = Product::factory()->create();
        $review = ProductReview::factory()->for($product)->create([
            'rating' => 5,
            'comment' => 'Fantastic item and very fast delivery all across Nairobi.',
        ]);

        $response = $this->get(route('products.show', $product->slug));

        $response->assertInertia(fn (Assert $page) => $page
            ->component('Products/Show')
            ->where('reviewStats.total_reviews', 1)
            ->where('reviewStats.average_rating', 5.0)
            ->where('reviews.0.comment', $review->comment)
            ->where('reviews.0.rating', 5)
            ->where('reviews.0.user.name', $review->user->name)
        );
    }
}
