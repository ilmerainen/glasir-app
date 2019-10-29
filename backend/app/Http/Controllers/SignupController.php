<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\User;
use App\File;
use Socialite;

class SignupController extends Controller
{
    public function store(Request $request)
    {
        $token = $request->input('access_token');
        $user = Socialite::driver('google')->userFromToken($token);

        if (User::where('email', $user['email'])->exists()) {
            return response('User already exists', 409);
        }

        $userModel = new User;
        $fileModel = new File;
        $userModel->name = $user['given_name'];
        $userModel->email = $user['email'];
        $token;

        do {
            $token = Str::random(100);
        } while (User::where('token', $token)->exists());

        $userModel->token = $token;

        $avatar = $user->getAvatar();
        $userId = $user->getId();
        $fileModel->system_name = "avatar-{$userId}";
        $fileModel->path = $avatar;

        if (isset($user['family_name'])) {
            $userModel->surname = $user['family_name'];
        }

        $fileModel->save();
        $userModel->save();
        $userModel->files()->attach($fileModel->id);

        $userData = User::with('files:id,path')
            ->select()
            ->where('id', $userModel->id)
            ->first()
            ->toJson();

        return response($userData);
    }
}
