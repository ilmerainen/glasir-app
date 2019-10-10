<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class FileProduct extends Pivot
{
	protected $primaryKey = ['product_id', 'file_id'];
	public $timestamps = false;
}
