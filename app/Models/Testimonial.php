<?php

namespace App\Models;

use Database\Factories\TestimonialFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = ['author', 'role', 'avatar', 'content', 'rating', 'is_published'];

    protected $casts = [
        'rating' => 'integer',
        'is_published' => 'boolean',
    ];

    protected static function newFactory()
    {
        return TestimonialFactory::new();
    }
}
