<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class OrderProduct extends Pivot
{
    protected $primaryKey = ['product_id', 'order_id'];
    public $timestamps = false;
}
