<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductRequest;
use App\Http\Requests\Admin\ToggleProductFeaturedRequest;
use App\Http\Requests\Admin\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Product::class);

        return Inertia::render('Admin/Products/Index', [
            'products' => Product::query()->with('category')->latest()->paginate(20)->withQueryString(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Product::class);

        return Inertia::render('Admin/Products/Create', [
            'categories' => Category::query()->orderBy('name')->get(),
        ]);
    }

    public function show(Product $product): Response
    {
        $this->authorize('view', $product);

        return Inertia::render('Admin/Products/Show', [
            'product' => $product->load('category'),
        ]);
    }

    public function edit(Product $product, Request $request): Response
    {
        $this->authorize('update', $product);

        $activeTab = $request->query('tab', 'general');

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product->load(['category', 'variants']),
            'categories' => Category::query()->orderBy('name')->get(),
            'activeTab' => $activeTab,
        ]);
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        $this->authorize('create', Product::class);

        $validated = $request->validated();
        $validated['image'] = $this->storeImage($request->file('image'));
        $validated['gallery'] = collect($request->file('gallery', []))
            ->map(fn (UploadedFile $file): string => $this->storeImage($file))
            ->values()
            ->all();

        Product::query()->create($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Product created successfully.']);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Product created successfully.']);

        return redirect()->route('admin.products.index');
    }

    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $this->authorize('update', $product);

        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $validated['image'] = $this->storeImage($request->file('image'));
        } elseif ($request->boolean('remove_primary_image')) {
            $validated['image'] = null;
        } else {
            unset($validated['image']);
        }

        $existingGallery = collect($request->input('existing_gallery', $product->gallery ?? []))
            ->filter(fn (mixed $image): bool => is_string($image) && $image !== '')
            ->values();

        if ($request->hasFile('gallery')) {
            $newGalleryImages = collect($request->file('gallery', []))
                ->map(fn (UploadedFile $file): string => $this->storeImage($file))
                ->values();

            $validated['gallery'] = $existingGallery
                ->merge($newGalleryImages)
                ->take(4)
                ->values()
                ->all();
        } else {
            $validated['gallery'] = $existingGallery->take(4)->all();
        }

        unset($validated['remove_primary_image'], $validated['existing_gallery']);

        $product->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Product updated successfully.']);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Product updated successfully.']);

        return back();
    }

    public function destroy(Product $product): RedirectResponse
    {
        $this->authorize('delete', $product);
        $product->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Product deleted successfully.']);

        return back();
    }

    public function duplicate(Product $product): RedirectResponse
    {
        $this->authorize('create', Product::class);

        $duplicateProduct = $product->replicate(['slug']);
        $duplicateProduct->name = $product->name.' Copy';
        $duplicateProduct->slug = $product->slug.'-copy-'.strtolower((string) str()->random(6));
        $duplicateProduct->save();

        foreach ($product->variants as $variant) {
            $duplicateProduct->variants()->create([
                'name' => $variant->name,
                'sku' => $variant->sku.'-COPY',
                'price' => $variant->price,
                'stock' => $variant->stock,
                'is_active' => $variant->is_active,
            ]);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Product duplicated successfully.']);

        return redirect()->route('admin.products.edit', $duplicateProduct);
    }

    public function toggleFeatured(ToggleProductFeaturedRequest $request, Product $product): RedirectResponse
    {
        $this->authorize('update', $product);

        $product->update([
            'featured' => $request->validated('featured'),
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Product updated successfully.']);

        return back();
    }

    public function updateVariants(Request $request, Product $product): RedirectResponse
    {
        $this->authorize('update', $product);

        $variants = $request->input('variants', []);

        // Delete existing variants
        $product->variants()->delete();

        // Create new variants
        foreach ($variants as $variant) {
            if (! empty($variant['name']) && ! empty($variant['sku']) && isset($variant['price']) && isset($variant['stock'])) {
                ProductVariant::query()->create([
                    'product_id' => $product->id,
                    'name' => $variant['name'],
                    'sku' => $variant['sku'],
                    'price' => $variant['price'],
                    'stock' => $variant['stock'],
                    'is_active' => $variant['is_active'] ?? true,
                ]);
            }
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Variants updated successfully.']);

        return back();
    }

    private function storeImage(?UploadedFile $file): string
    {
        if (! $file instanceof UploadedFile) {
            return '';
        }

        return Storage::url($file->store('products', 'public'));
    }
}
