<?php

namespace App\Http\Middleware;

use Closure;
use App\User;

class CustomAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $request->header('Authorization');
        $user = User::where('token', $token);

        if (User::where('token', $token)->exists()) {
            $request->merge(['userId' => $user->value('id')]);

            return $next($request);
        } else {
            return response('Invalid token', 401);
        }
    }
}
