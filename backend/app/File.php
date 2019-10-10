<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    function users()
    {
        return $this->belongsToMany('App\User')->using('App\UserFile');
    }

    function products()
    {
        return $this->belongsToMany('App\Product', 'ProductFile')->using('App\UserFile');
    }

    public $timestamps = false;
}
