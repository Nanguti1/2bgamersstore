import { router } from '@inertiajs/react';

type Role = {
    id: number;
    name: string;
    permissions_count: number;
};

type User = {
    id: number;
    name: string;
    email: string;
    roles: Array<{ name: string }>;
};

export default function AdminAccessControlIndex({ users, roles }: { users: { data: User[] }; roles: Role[] }): JSX.Element {
    const assignRole = (userId: number, role: string): void => {
        router.patch(`/admin/access-control/users/${userId}/role`, { role });
    };

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">Roles & Permissions</h1>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
                {roles.map((role) => (
                    <div key={role.id} className="rounded border p-3">
                        <p className="font-semibold capitalize">{role.name}</p>
                        <p className="text-sm text-zinc-500">{role.permissions_count} permissions</p>
                    </div>
                ))}
            </div>

            <div className="mt-6 rounded border">
                <div className="grid grid-cols-12 border-b bg-zinc-50 px-3 py-2 text-sm font-semibold">
                    <p className="col-span-4">User</p>
                    <p className="col-span-4">Email</p>
                    <p className="col-span-4">Role Assignment</p>
                </div>

                {users.data.map((user) => {
                    const currentRole = user.roles[0]?.name ?? '';

                    return (
                        <div key={user.id} className="grid grid-cols-12 items-center border-b px-3 py-2 text-sm">
                            <p className="col-span-4">{user.name}</p>
                            <p className="col-span-4 text-zinc-500">{user.email}</p>
                            <div className="col-span-4 flex items-center gap-2">
                                <select
                                    defaultValue={currentRole}
                                    className="rounded border px-2 py-1"
                                    onChange={(event) => assignRole(user.id, event.target.value)}
                                >
                                    <option value="" disabled>
                                        Select role
                                    </option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.name}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
