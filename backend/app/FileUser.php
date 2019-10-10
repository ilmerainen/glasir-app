<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class UserFile extends Pivot
{
    protected $primaryKey = ['file_id', 'user_id'];  
    public $timestamps = false;
}
