<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\User;
use App\Order;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        $data = $request->all();

        return User::where('id', $data['userId'])
            ->with('files:id,path')
            ->first()
            ->toJson();
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $userData = $request->input();
        $products = $userData['products'];
        $order = new Order;
        $user = User::find($userData['id']);

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:100',
            'surname' => 'required|max:100',
            'country' => 'required|max:100',
            'city' => 'required|max:100',
            'street' => 'required|max:100',
        ]);

        if ($validator->fails()) {
            return response('Invalid data was sent',);
        }

        $user->name = $userData['name'];
        $user->surname = $userData['surname'];
        $order->country = $userData['country'];
        $order->city = $userData['city'];
        $order->street = $userData['street'];
        $order->user_id = $data['userId'];

        $order->save();
        $user->update();

        foreach ($products as $product) {
            $order->products()->attach($product['id'], ['count' => $product['count']]);
        }
    }
}
