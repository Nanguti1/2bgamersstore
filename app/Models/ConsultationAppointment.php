<?php

namespace App\Models;

use Database\Factories\ConsultationAppointmentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ConsultationAppointment extends Model
{
    /** @use HasFactory<ConsultationAppointmentFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'preferred_at',
        'message',
        'status',
        'admin_note',
        'reviewed_at',
    ];

    protected function casts(): array
    {
        return [
            'preferred_at' => 'datetime',
            'reviewed_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected static function newFactory(): ConsultationAppointmentFactory
    {
        return ConsultationAppointmentFactory::new();
    }
}
