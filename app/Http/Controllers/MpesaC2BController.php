<?php

namespace App\Http\Controllers;

use App\Mpesa\C2B;
use Iankumu\Mpesa\Facades\Mpesa;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MpesaC2BController extends Controller
{
    public function registerURLS(Request $request): JsonResponse
    {
        $request->validate([
            'shortcode' => 'required|string',
        ]);

        $shortcode = $request->input('shortcode');

        $response = Mpesa::c2bregisterURLS($shortcode);

        return response()->json($response->json());
    }

    public function validation(): JsonResponse
    {
        $result = (new C2B())->validate(request());

        return response()->json($result);
    }

    public function confirmation(Request $request): JsonResponse
    {
        $result = (new C2B())->confirm($request);

        return response()->json($result);
    }
}
