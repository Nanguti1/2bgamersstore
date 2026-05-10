<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnforceCanonicalUrl
{
    public function handle(Request $request, Closure $next): Response
    {
        $canonicalHost = config('app.canonical_host');

        if ($canonicalHost && $request->getHost() !== $canonicalHost) {
            $target = $request->getScheme().'://'.$canonicalHost.$request->getRequestUri();

            return redirect()->to($target, 301);
        }

        return $next($request);
    }
}
