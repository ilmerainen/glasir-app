<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public function files()
    {
        return $this->belongsToMany('App\File')->using('App\UserFile');
    }

    public function orders()
    {
        return $this->hasMany('App\Order');
    }

    public $timestamps = false;
}
