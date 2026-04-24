<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\ManagementController as AdminManagementController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Storefront\CartController;
use App\Http\Controllers\Storefront\CheckoutController;
use App\Http\Controllers\Storefront\HomeController;
use App\Http\Controllers\Storefront\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::patch('/cart/{item}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/{item}', [CartController::class, 'destroy'])->name('cart.destroy');

    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');

    Route::get('/dashboard', AdminDashboardController::class)->name('dashboard')->middleware('is_admin');

    Route::prefix('admin')->name('admin.')->middleware('is_admin')->group(function (): void {
        Route::get('/dashboard', AdminDashboardController::class)->name('dashboard');
        Route::get('/products', [AdminProductController::class, 'index'])->name('products.index');
        Route::get('/products/create', [AdminProductController::class, 'create'])->name('products.create');
        Route::post('/products', [AdminProductController::class, 'store'])->name('products.store');
        Route::patch('/products/{product}', [AdminProductController::class, 'update'])->name('products.update');
        Route::delete('/products/{product}', [AdminProductController::class, 'destroy'])->name('products.destroy');
        Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders.index');
        Route::patch('/orders/{order}', [AdminOrderController::class, 'update'])->name('orders.update');
        Route::delete('/orders/{order}', [AdminOrderController::class, 'destroy'])->name('orders.destroy');
        Route::get('/categories', [AdminManagementController::class, 'categories'])->name('categories.index');
        Route::post('/categories', [AdminManagementController::class, 'storeCategory'])->name('categories.store');
        Route::patch('/categories/{category}', [AdminManagementController::class, 'updateCategory'])->name('categories.update');
        Route::delete('/categories/{category}', [AdminManagementController::class, 'destroyCategory'])->name('categories.destroy');
        Route::get('/models', [AdminManagementController::class, 'models'])->name('models.index');
        Route::post('/models', [AdminManagementController::class, 'storeModel'])->name('models.store');
        Route::patch('/models/{model}', [AdminManagementController::class, 'updateModel'])->name('models.update');
        Route::delete('/models/{model}', [AdminManagementController::class, 'destroyModel'])->name('models.destroy');
        Route::get('/customers', [AdminManagementController::class, 'customers'])->name('customers.index');
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
