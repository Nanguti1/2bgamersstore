<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ConsultationAppointment;
use App\Notifications\ConsultationAppointmentStatusUpdatedNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;
use Inertia\Response;

class ConsultationAppointmentController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Consultations/Index', [
            'appointments' => ConsultationAppointment::query()
                ->latest()
                ->paginate(20)
                ->withQueryString(),
        ]);
    }

    public function updateStatus(Request $request, ConsultationAppointment $appointment): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:pending,approved,declined'],
            'admin_note' => ['nullable', 'string', 'max:2000'],
        ]);

        $appointment->update([
            'status' => $validated['status'],
            'admin_note' => $validated['admin_note'] ?? null,
            'reviewed_at' => in_array($validated['status'], ['approved', 'declined'], true) ? now() : null,
        ]);

        if (in_array($validated['status'], ['approved', 'declined'], true)) {
            Notification::route('mail', $appointment->email)
                ->notify(new ConsultationAppointmentStatusUpdatedNotification($appointment->fresh()));
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Appointment status updated.']);

        return back();
    }
}
