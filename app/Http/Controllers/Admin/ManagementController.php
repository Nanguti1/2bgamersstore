<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class ManagementController extends Controller
{
    public function categories(): Response
    {
        return Inertia::render('Admin/Categories/Index', [
            'categories' => Category::query()->latest()->paginate(20),
        ]);
    }

    public function models(): Response
    {
        return Inertia::render('Admin/Models/Index', [
            'products' => Product::query()->with('category')->latest()->paginate(20),
        ]);
    }

    public function customers(): Response
    {
        return Inertia::render('Admin/Customers/Index', [
            'customers' => User::query()->where('is_admin', false)->latest()->paginate(20),
        ]);
    }

    public function accessControl(): Response
    {
        return Inertia::render('Admin/AccessControl/Index', [
            'users' => User::query()->with('roles')->latest()->paginate(20),
            'roles' => Role::query()->withCount('permissions')->orderBy('name')->get(),
        ]);
    }

    public function assignRole(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'role' => ['required', 'string', 'exists:roles,name'],
        ]);

        $user->syncRoles([$validated['role']]);
        $user->forceFill([
            'is_admin' => $validated['role'] === 'admin',
        ])->save();

        return back();
    }
}
