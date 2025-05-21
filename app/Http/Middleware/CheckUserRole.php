<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'test',$user], 401);
        }

        if ($user->role_id != 1) {
            return response()->json(['message' => 'Unauthorized - Insufficient role'], 403);
        }

        return $next($request);
    }
}