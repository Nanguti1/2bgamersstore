<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\ManagementController as AdminManagementController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Storefront\CartController;
use App\Http\Controllers\Storefront\CheckoutController;
use App\Http\Controllers\Storefront\HomeController;
use App\Http\Controllers\Storefront\ProductController;
use App\Http\Controllers\Storefront\StorePageController;
use App\Http\Controllers\Storefront\ProductReviewController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');

Route::get('/store', fn () => app(StorePageController::class)('store'))->name('store.page');
Route::get('/consultation', fn () => app(StorePageController::class)('consultation'))->name('consultation.page');
Route::get('/community', fn () => app(StorePageController::class)('community'))->name('community.page');
Route::get('/events', fn () => app(StorePageController::class)('events'))->name('events.page');
Route::get('/about', fn () => app(StorePageController::class)('about'))->name('about.page');
Route::get('/account', fn () => app(StorePageController::class)('account'))->name('account.page');
Route::get('/careers', fn () => app(StorePageController::class)('careers'))->name('careers.page');
Route::get('/blog', fn () => app(StorePageController::class)('blog'))->name('blog.page');
Route::get('/help', fn () => app(StorePageController::class)('help'))->name('help.page');
Route::get('/track-order', fn () => app(StorePageController::class)('track-order'))->name('track-order.page');
Route::get('/wishlist', fn () => app(StorePageController::class)('wishlist'))->name('wishlist.page');

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::get('/cart-count', function () {
        return response()->json(['count' => auth()->user()->cart?->items()->count() ?? 0]);
    });
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::patch('/cart/{item}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/{item}', [CartController::class, 'destroy'])->name('cart.destroy');

    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');

    Route::post('/products/{product}/reviews', [ProductReviewController::class, 'store'])->name('products.reviews.store');

    Route::get('/dashboard', AdminDashboardController::class)->name('dashboard')->middleware('is_admin');

    Route::prefix('admin')->name('admin.')->middleware('is_admin')->group(function (): void {
        Route::get('/dashboard', AdminDashboardController::class)->name('dashboard');
        Route::get('/products', [AdminProductController::class, 'index'])->name('products.index');
        Route::get('/products/create', [AdminProductController::class, 'create'])->name('products.create');
        Route::post('/products', [AdminProductController::class, 'store'])->name('products.store');
        Route::get('/products/{product}', [AdminProductController::class, 'show'])->name('products.show');
        Route::get('/products/{product}/edit', [AdminProductController::class, 'edit'])->name('products.edit');
        Route::patch('/products/{product}', [AdminProductController::class, 'update'])->name('products.update');
        Route::patch('/products/{product}/featured', [AdminProductController::class, 'toggleFeatured'])->name('products.featured');
        Route::delete('/products/{product}', [AdminProductController::class, 'destroy'])->name('products.destroy');
        Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders.index');
        Route::get('/orders/{order}', [AdminOrderController::class, 'show'])->name('orders.show');
        Route::get('/orders/{order}/edit', [AdminOrderController::class, 'edit'])->name('orders.edit');
        Route::patch('/orders/{order}', [AdminOrderController::class, 'update'])->name('orders.update');
        Route::delete('/orders/{order}', [AdminOrderController::class, 'destroy'])->name('orders.destroy');
        Route::get('/categories', [AdminManagementController::class, 'categories'])->name('categories.index');
        Route::get('/categories/{category}', [AdminManagementController::class, 'showCategory'])->name('categories.show');
        Route::get('/categories/{category}/edit', [AdminManagementController::class, 'editCategory'])->name('categories.edit');
        Route::post('/categories', [AdminManagementController::class, 'storeCategory'])->name('categories.store');
        Route::patch('/categories/{category}', [AdminManagementController::class, 'updateCategory'])->name('categories.update');
        Route::delete('/categories/{category}', [AdminManagementController::class, 'destroyCategory'])->name('categories.destroy');
        Route::get('/models', [AdminManagementController::class, 'models'])->name('models.index');
        Route::get('/models/{model}', [AdminManagementController::class, 'showModel'])->name('models.show');
        Route::get('/models/{model}/edit', [AdminManagementController::class, 'editModel'])->name('models.edit');
        Route::post('/models', [AdminManagementController::class, 'storeModel'])->name('models.store');
        Route::patch('/models/{model}', [AdminManagementController::class, 'updateModel'])->name('models.update');
        Route::delete('/models/{model}', [AdminManagementController::class, 'destroyModel'])->name('models.destroy');
        Route::get('/customers', [AdminManagementController::class, 'customers'])->name('customers.index');
        Route::get('/customers/{customer}', [AdminManagementController::class, 'showCustomer'])->name('customers.show');
        Route::get('/customers/{customer}/edit', [AdminManagementController::class, 'editCustomer'])->name('customers.edit');
        Route::post('/customers', [AdminManagementController::class, 'storeCustomer'])->name('customers.store');
        Route::patch('/customers/{customer}', [AdminManagementController::class, 'updateCustomer'])->name('customers.update');
        Route::delete('/customers/{customer}', [AdminManagementController::class, 'destroyCustomer'])->name('customers.destroy');
        Route::get('/access-control', [AdminManagementController::class, 'accessControl'])->name('access-control.index');
        Route::patch('/access-control/users/{user}/role', [AdminManagementController::class, 'assignRole'])->name('access-control.users.role');
        Route::post('/access-control/roles', [AdminManagementController::class, 'storeRole'])->name('access-control.roles.store');
        Route::delete('/access-control/roles/{role}', [AdminManagementController::class, 'destroyRole'])->name('access-control.roles.destroy');
        Route::post('/access-control/permissions', [AdminManagementController::class, 'storePermission'])->name('access-control.permissions.store');
        Route::delete('/access-control/permissions/{permission}', [AdminManagementController::class, 'destroyPermission'])->name('access-control.permissions.destroy');
    });
});

require __DIR__.'/settings.php';
