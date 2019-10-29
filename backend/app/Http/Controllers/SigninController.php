<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Socialite;
use \GuzzleHttp\Exception\ClientException;
use App\User;

class SigninController extends Controller
{
    public function store(Request $request)
    {
        $token = $request->input('access_token');
        $unauthResponse = response("User doesn't exist", 401);
        $googleData;

        try {
            $googleData = Socialite::driver('google')->userFromToken($token);
        } catch(ClientException $error) {
            return $unauthResponse;
        }

        if (User::where('email', $googleData['email'])->doesntExist()) {
            return $unauthResponse;
        }

        return User::where('email', $googleData['email'])
            ->with('files:id,path')
            ->select()
            ->first()
            ->toJson();
    }
}
