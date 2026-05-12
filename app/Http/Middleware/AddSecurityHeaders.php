<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AddSecurityHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // HSTS - Force HTTPS and prevent downgrade attacks
        if (config('app.env') === 'production' && $request->secure()) {
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
        }

        // Security headers
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        // Cache headers for static assets and dynamic content
        if ($request->getPathInfo() === '/robots.txt' || $request->getPathInfo() === '/sitemap.xml') {
            // Cache robots.txt and sitemap.xml for 7 days
            $response->headers->set('Cache-Control', 'public, max-age=604800, immutable');
        } elseif ($this->isBuildAsset($request)) {
            // Cache build assets (JS, CSS) for 1 year since they have content hash
            $response->headers->set('Cache-Control', 'public, max-age=31536000, immutable');
        } elseif ($request->getPathInfo() === '/') {
            // Cache homepage for 1 hour
            $response->headers->set('Cache-Control', 'public, max-age=3600');
        }

        return $response;
    }

    /**
     * Check if the request is for a build asset (has content hash in filename)
     */
    private function isBuildAsset(Request $request): bool
    {
        $path = $request->getPathInfo();
        
        return str_contains($path, '/build/') || 
               preg_match('/\.[a-f0-9]{8,}\.(js|css|woff2|png|jpg|webp)$/i', $path);
    }
}
