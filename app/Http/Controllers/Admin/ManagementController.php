<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\HardwareModel;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class ManagementController extends Controller
{
    public function categories(): Response
    {
        return Inertia::render('Admin/Categories/Index', [
            'categories' => Category::query()->latest()->paginate(20),
        ]);
    }

    public function showCategory(Category $category): Response
    {
        return Inertia::render('Admin/Categories/Show', [
            'category' => $category,
        ]);
    }

    public function editCategory(Category $category): Response
    {
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
        ]);
    }

    public function storeCategory(Request $request): RedirectResponse
    {
        Category::query()->create($request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:categories,name'],
            'description' => ['nullable', 'string'],
        ]));

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Category created successfully.']);

        return back();
    }

    public function updateCategory(Request $request, Category $category): RedirectResponse
    {
        $category->update($request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:categories,name,'.$category->id],
            'description' => ['nullable', 'string'],
        ]));

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Category updated successfully.']);

        return back();
    }

    public function destroyCategory(Category $category): RedirectResponse
    {
        $category->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Category deleted successfully.']);

        return back();
    }

    public function models(): Response
    {
        return Inertia::render('Admin/Models/Index', [
            'models' => HardwareModel::query()->with('category')->latest()->paginate(20),
            'categories' => Category::query()->orderBy('name')->get(),
        ]);
    }

    public function showModel(HardwareModel $model): Response
    {
        return Inertia::render('Admin/Models/Show', [
            'model' => $model->load('category'),
            'categories' => Category::query()->orderBy('name')->get(),
        ]);
    }

    public function editModel(HardwareModel $model): Response
    {
        return Inertia::render('Admin/Models/Edit', [
            'model' => $model->load('category'),
            'categories' => Category::query()->orderBy('name')->get(),
        ]);
    }

    public function storeModel(Request $request): RedirectResponse
    {
        HardwareModel::query()->create($request->validate([
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255', 'unique:hardware_models,name'],
            'description' => ['nullable', 'string'],
        ]));

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Model created successfully.']);

        return back();
    }

    public function updateModel(Request $request, HardwareModel $model): RedirectResponse
    {
        $model->update($request->validate([
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255', 'unique:hardware_models,name,'.$model->id],
            'description' => ['nullable', 'string'],
        ]));

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Model updated successfully.']);

        return back();
    }

    public function destroyModel(HardwareModel $model): RedirectResponse
    {
        $model->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Model deleted successfully.']);

        return back();
    }

    public function customers(): Response
    {
        return Inertia::render('Admin/Customers/Index', [
            'customers' => User::query()->where('is_admin', false)->latest()->paginate(20),
        ]);
    }

    public function showCustomer(User $customer): Response
    {
        return Inertia::render('Admin/Customers/Show', [
            'customer' => $customer,
        ]);
    }

    public function editCustomer(User $customer): Response
    {
        return Inertia::render('Admin/Customers/Edit', [
            'customer' => $customer,
        ]);
    }

    public function storeCustomer(Request $request): RedirectResponse
    {
        $user = User::query()->create($request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
        ]));

        $user->assignRole('customer');

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Customer created successfully.']);

        return back();
    }

    public function updateCustomer(Request $request, User $customer): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email,'.$customer->id],
            'password' => ['nullable', 'string', 'min:8'],
        ]);

        if (! isset($validated['password']) || $validated['password'] === '') {
            unset($validated['password']);
        }

        $customer->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Customer updated successfully.']);

        return back();
    }

    public function destroyCustomer(User $customer): RedirectResponse
    {
        $customer->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Customer deleted successfully.']);

        return back();
    }

    public function accessControl(): Response
    {
        return Inertia::render('Admin/AccessControl/Index', [
            'users' => User::query()->with('roles')->latest()->paginate(20),
            'roles' => Role::query()->withCount('permissions')->orderBy('name')->get(),
            'permissions' => Permission::query()->orderBy('name')->get(),
        ]);
    }

    public function storeRole(Request $request): RedirectResponse
    {
        $role = Role::query()->create($request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles,name'],
        ]));

        $permissionIds = $request->validate([
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['integer', 'exists:permissions,id'],
        ])['permissions'] ?? [];

        $role->syncPermissions(Permission::query()->whereIn('id', $permissionIds)->pluck('name'));

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Role created successfully.']);

        return back();
    }

    public function destroyRole(Role $role): RedirectResponse
    {
        $role->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Role deleted successfully.']);

        return back();
    }

    public function storePermission(Request $request): RedirectResponse
    {
        Permission::query()->create($request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:permissions,name'],
        ]));

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Permission created successfully.']);

        return back();
    }

    public function destroyPermission(Permission $permission): RedirectResponse
    {
        $permission->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Permission deleted successfully.']);

        return back();
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

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Role assigned successfully.']);

        return back();
    }
}
