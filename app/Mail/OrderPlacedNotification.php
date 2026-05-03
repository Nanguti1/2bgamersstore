<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderPlacedNotification extends Mailable
{
    use Queueable;
    use SerializesModels;

    public function __construct(public Order $order)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Order #'.$this->order->id.' - '.ucfirst($this->order->status->value),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.orders.placed',
            with: [
                'order' => $this->order,
                'items' => $this->order->items,
                'customerName' => trim($this->order->first_name.' '.$this->order->last_name),
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
