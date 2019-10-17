<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function orders()
    {
        return $this->belongsToMany('App\Order')->using('App\OrderProduct');
    }

    public function category() {
        return $this->belongsTo('App\Category');
    }

    public function files() {
        return $this->belongsToMany('App\File')->using('App\FileProduct');
    }
    
    public $timestamps = false;
}
