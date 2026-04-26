import { router } from '@inertiajs/react';

type Appointment = {
    id: number;
    name: string;
    email: string;
    phone: string;
    preferred_at: string;
    status: 'pending' | 'approved' | 'declined';
    message: string | null;
    admin_note: string | null;
};

type PaginatedAppointments = {
    data: Appointment[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
};

export default function AdminConsultationsIndex({ appointments }: { appointments: PaginatedAppointments }): JSX.Element {
    return (
        <main className="min-h-screen bg-[#f3f4f6] p-6 md:p-8">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-3xl font-semibold text-slate-900">Consultation Appointments</h1>

                <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                    <table className="min-w-full text-left text-sm text-slate-900">
                        <thead className="bg-[#053354] text-white">
                            <tr>
                                <th className="px-4 py-3">Client</th>
                                <th className="px-4 py-3">Preferred Date</th>
                                <th className="px-4 py-3">Message</th>
                                <th className="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.data.map((appointment, index) => (
                                <tr key={appointment.id} className={index % 2 === 0 ? 'bg-white' : 'bg-rose-50/40'}>
                                    <td className="px-4 py-4">
                                        <p className="font-semibold">{appointment.name}</p>
                                        <p className="text-xs text-zinc-500">{appointment.email}</p>
                                        <p className="text-xs text-zinc-500">{appointment.phone}</p>
                                    </td>
                                    <td className="px-4 py-4">{new Date(appointment.preferred_at).toLocaleString()}</td>
                                    <td className="px-4 py-4 text-zinc-600">{appointment.message ?? '—'}</td>
                                    <td className="px-4 py-4">
                                        <div className="flex flex-col gap-2">
                                            <select
                                                value={appointment.status}
                                                onChange={(event) => router.patch(`/admin/consultation-appointments/${appointment.id}/status`, { status: event.target.value })}
                                                className="rounded border border-zinc-300 px-2 py-1"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="approved">Approved</option>
                                                <option value="declined">Declined</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                    {appointments.links.map((link, index) => (
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
