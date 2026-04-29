<?php

use App\Http\Controllers\MpesaC2BController;
use App\Http\Controllers\MpesaSTKPUSHController;
use Illuminate\Support\Facades\Route;

// Mpesa STK Push Callback Route
Route::post('v1/confirm', [MpesaSTKPUSHController::class, 'STKConfirm'])->name('mpesa.confirm');

// Mpesa C2B Callback Routes
Route::post('validation', [MpesaC2BController::class, 'validation'])->name('mpesa.c2b.validate');
Route::post('confirmation', [MpesaC2BController::class, 'confirmation'])->name('mpesa.c2b.confirm');
