import { router, useForm } from '@inertiajs/react';

type Role = {
    id: number;
    name: string;
    permissions_count: number;
};

type Permission = {
    id: number;
    name: string;
};

type User = {
    id: number;
    name: string;
    email: string;
    roles: Array<{ name: string }>;
};

export default function AdminAccessControlIndex({ users, roles, permissions }: { users: { data: User[] }; roles: Role[]; permissions: Permission[] }): JSX.Element {
    const roleForm = useForm({ name: '', permissions: [] as number[] });
    const permissionForm = useForm({ name: '' });

    const assignRole = (userId: number, role: string): void => {
        router.patch(`/admin/access-control/users/${userId}/role`, { role });
    };

    const submitRole = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        roleForm.post('/admin/access-control/roles', {
            onSuccess: () => roleForm.reset(),
        });
    };

    const submitPermission = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        permissionForm.post('/admin/access-control/permissions', {
            onSuccess: () => permissionForm.reset(),
        });
    };

    const togglePermission = (permissionId: number): void => {
        if (roleForm.data.permissions.includes(permissionId)) {
            roleForm.setData('permissions', roleForm.data.permissions.filter((id) => id !== permissionId));
            return;
        }

        roleForm.setData('permissions', [...roleForm.data.permissions, permissionId]);
    };

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">Roles & Permissions</h1>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <form onSubmit={submitRole} className="rounded border p-4">
                    <p className="font-semibold">Create Role</p>
                    <input className="mt-2 w-full rounded border p-2" value={roleForm.data.name} onChange={(event) => roleForm.setData('name', event.target.value)} placeholder="Role name" />
                    <div className="mt-3 grid gap-2 md:grid-cols-2">
                        {permissions.map((permission) => (
                            <label key={permission.id} className="inline-flex items-center gap-2 text-sm">
                                <input type="checkbox" checked={roleForm.data.permissions.includes(permission.id)} onChange={() => togglePermission(permission.id)} />
                                {permission.name}
                            </label>
                        ))}
                    </div>
                    <button className="mt-3 rounded bg-blue-600 px-4 py-2 text-white">Create Role</button>
                </form>

                <form onSubmit={submitPermission} className="rounded border p-4">
                    <p className="font-semibold">Create Permission</p>
                    <input className="mt-2 w-full rounded border p-2" value={permissionForm.data.name} onChange={(event) => permissionForm.setData('name', event.target.value)} placeholder="Permission name" />
                    <button className="mt-3 rounded bg-blue-600 px-4 py-2 text-white">Create Permission</button>
                </form>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="overflow-hidden rounded border">
                    <table className="min-w-full text-sm">
                        <thead className="bg-zinc-50 text-left">
                            <tr>
                                <th className="px-4 py-2">Role</th>
                                <th className="px-4 py-2">Permissions</th>
                                <th className="px-4 py-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role) => (
                                <tr key={role.id} className="border-t">
                                    <td className="px-4 py-2 font-medium capitalize">{role.name}</td>
                                    <td className="px-4 py-2 text-zinc-500">{role.permissions_count}</td>
                                    <td className="px-4 py-2 text-right">
                                        <button type="button" className="text-red-600" onClick={() => router.delete(`/admin/access-control/roles/${role.id}`)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="overflow-hidden rounded border">
                    <table className="min-w-full text-sm">
                        <thead className="bg-zinc-50 text-left">
                            <tr>
                                <th className="px-4 py-2">Permission</th>
                                <th className="px-4 py-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {permissions.map((permission) => (
                                <tr key={permission.id} className="border-t">
                                    <td className="px-4 py-2 font-medium">{permission.name}</td>
                                    <td className="px-4 py-2 text-right">
                                        <button type="button" className="text-red-600" onClick={() => router.delete(`/admin/access-control/permissions/${permission.id}`)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-6 overflow-hidden rounded border">
                <table className="min-w-full text-sm">
                    <thead className="bg-zinc-50 text-left">
                        <tr>
                            <th className="px-4 py-2">User</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Role Assignment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map((user) => {
                            const currentRole = user.roles[0]?.name ?? '';

                            return (
                                <tr key={user.id} className="border-t">
                                    <td className="px-4 py-2 font-medium">{user.name}</td>
                                    <td className="px-4 py-2 text-zinc-500">{user.email}</td>
                                    <td className="px-4 py-2">
                                        <select
                                            defaultValue={currentRole}
                                            className="rounded border px-2 py-1"
                                            onChange={(event) => assignRole(user.id, event.target.value)}
                                        >
                                            <option value="" disabled>Select role</option>
                                            {roles.map((role) => (
                                                <option key={role.id} value={role.name}>{role.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
