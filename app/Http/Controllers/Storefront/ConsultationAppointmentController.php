<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreConsultationAppointmentRequest;
use App\Models\ConsultationAppointment;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ConsultationAppointmentController extends Controller
{
    public function store(StoreConsultationAppointmentRequest $request): RedirectResponse
    {
        ConsultationAppointment::query()->create([
            ...$request->validated(),
            'user_id' => $request->user()?->id,
            'status' => 'pending',
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Your consultation request has been submitted.']);

        return back();
    }
}
