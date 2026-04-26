<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductRequest;
use App\Http\Requests\Admin\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
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

    public function edit(Product $product): Response
    {
        $this->authorize('update', $product);

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product->load('category'),
            'categories' => Category::query()->orderBy('name')->get(),
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
        } else {
            unset($validated['image']);
        }

        if ($request->hasFile('gallery')) {
            $validated['gallery'] = collect($request->file('gallery', []))
                ->map(fn (UploadedFile $file): string => $this->storeImage($file))
                ->values()
                ->all();
        }

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

    public function toggleFeatured(Product $product): RedirectResponse
    {
        $this->authorize('update', $product);

        $product->update([
            'featured' => ! $product->featured,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Product updated successfully.']);

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
