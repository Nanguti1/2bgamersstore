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

type PaginatedUsers = {
    data: User[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
};

export default function AdminAccessControlIndex({ users, roles, permissions }: { users: PaginatedUsers; roles: Role[]; permissions: Permission[] }): JSX.Element {
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
        <main className="min-h-screen bg-[#f3f4f6] p-6 md:p-8">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-3xl font-semibold text-slate-900">Roles & Permissions</h1>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    <form onSubmit={submitRole} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <p className="font-semibold text-slate-900">Create Role</p>
                        <input className="mt-3 w-full rounded-lg border border-zinc-300 px-3 py-2" value={roleForm.data.name} onChange={(event) => roleForm.setData('name', event.target.value)} placeholder="Role name" />
                        <div className="mt-4 grid gap-2 md:grid-cols-2">
                            {permissions.map((permission) => (
                                <label key={permission.id} className="inline-flex items-center gap-2 rounded-lg bg-zinc-50 px-3 py-2 text-sm">
                                    <input type="checkbox" checked={roleForm.data.permissions.includes(permission.id)} onChange={() => togglePermission(permission.id)} />
                                    {permission.name}
                                </label>
                            ))}
                        </div>
                        <button className="mt-4 cursor-pointer rounded-xl bg-pink-200 px-4 py-2.5 font-medium text-slate-900 hover:bg-pink-300">Create Role</button>
                    </form>

                    <form onSubmit={submitPermission} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <p className="font-semibold text-slate-900">Create Permission</p>
                        <input className="mt-3 w-full rounded-lg border border-zinc-300 px-3 py-2" value={permissionForm.data.name} onChange={(event) => permissionForm.setData('name', event.target.value)} placeholder="Permission name" />
                        <button className="mt-4 cursor-pointer rounded-xl bg-pink-200 px-4 py-2.5 font-medium text-slate-900 hover:bg-pink-300">Create Permission</button>
                    </form>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                        <table className="min-w-full text-left text-base text-slate-900">
                            <thead className="bg-[#053354] text-white">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Role</th>
                                    <th className="px-6 py-4 font-semibold">Permissions</th>
                                    <th className="px-6 py-4 text-right font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.map((role, index) => (
                                    <tr key={role.id} className={index % 2 === 0 ? 'bg-white' : 'bg-rose-50/40'}>
                                        <td className="px-6 py-5 font-medium capitalize">{role.name}</td>
                                        <td className="px-6 py-5">{role.permissions_count}</td>
                                        <td className="px-6 py-5 text-right">
                                            <button type="button" className="cursor-pointer rounded-xl bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700" onClick={() => router.delete(`/admin/access-control/roles/${role.id}`)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                        <table className="min-w-full text-left text-base text-slate-900">
                            <thead className="bg-[#053354] text-white">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Permission</th>
                                    <th className="px-6 py-4 text-right font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {permissions.map((permission, index) => (
                                    <tr key={permission.id} className={index % 2 === 0 ? 'bg-white' : 'bg-rose-50/40'}>
                                        <td className="px-6 py-5 font-medium">{permission.name}</td>
                                        <td className="px-6 py-5 text-right">
                                            <button type="button" className="cursor-pointer rounded-xl bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700" onClick={() => router.delete(`/admin/access-control/permissions/${permission.id}`)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                    <table className="min-w-full text-left text-base text-slate-900">
                        <thead className="bg-[#053354] text-white">
                            <tr>
                                <th className="px-6 py-4 font-semibold">User</th>
                                <th className="px-6 py-4 font-semibold">Email</th>
                                <th className="px-6 py-4 font-semibold">Role Assignment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map((user, index) => {
                                const currentRole = user.roles[0]?.name ?? '';

                                return (
                                    <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-rose-50/40'}>
                                        <td className="px-6 py-5 font-medium">{user.name}</td>
                                        <td className="px-6 py-5">{user.email}</td>
                                        <td className="px-6 py-5">
                                            <select
                                                defaultValue={currentRole}
                                                className="rounded-lg border border-zinc-300 bg-white px-3 py-2"
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
                <div className="mt-4 flex flex-wrap items-center gap-2">
                    {users.links.map((link, index) => (
                        <button
                            key={`${link.label}-${index}`}
                            type="button"
                            className={`cursor-pointer rounded-lg border px-3 py-1 text-sm ${link.active ? 'border-blue-700 bg-blue-700 text-white' : 'border-zinc-300 bg-white text-slate-800'}`}
                            disabled={link.url === null}
                            onClick={() => link.url && router.visit(link.url)}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
