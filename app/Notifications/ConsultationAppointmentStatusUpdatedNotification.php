<?php

namespace App\Notifications;

use App\Models\ConsultationAppointment;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ConsultationAppointmentStatusUpdatedNotification extends Notification
{
    use Queueable;

    public function __construct(private readonly ConsultationAppointment $appointment)
    {
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $statusText = match ($this->appointment->status) {
            'approved' => 'approved',
            'declined' => 'declined',
            default => 'updated',
        };

        return (new MailMessage)
            ->subject('Consultation Appointment '.ucfirst($statusText))
            ->greeting('Hello '.$this->appointment->name.',')
            ->line('Your consultation appointment request status has been '.$statusText.'.')
            ->line('Requested Date & Time: '.$this->appointment->preferred_at?->format('M d, Y h:i A'))
            ->when(
                filled($this->appointment->admin_note),
                fn (MailMessage $message): MailMessage => $message->line('Admin note: '.$this->appointment->admin_note)
            )
            ->line('Thank you for choosing 2B Gamers Store.');
    }
}
