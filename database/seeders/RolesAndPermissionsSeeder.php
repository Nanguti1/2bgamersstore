<?php

namespace Database\Seeders;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Database\Seeder;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // Products
            'view-products',
            'create-products',
            'edit-products',
            'delete-products',

            // Orders
            'view-orders',
            'edit-orders',
            'delete-orders',

            // Users
            'view-users',
            'create-users',
            'edit-users',
            'delete-users',

            // Testimonials
            'view-testimonials',
            'create-testimonials',
            'edit-testimonials',
            'delete-testimonials',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo(Permission::all());

        $moderator = Role::create(['name' => 'moderator']);
        $moderator->givePermissionTo([
            'view-products',
            'create-products',
            'edit-products',
            'view-orders',
            'edit-orders',
        ]);

        $customer = Role::create(['name' => 'customer']);
        $customer->givePermissionTo([
            'view-products',
        ]);

        // Assign admin role to first user if exists
        $user = User::first();
        if ($user) {
            $user->assignRole('admin');
        }
    }
}

