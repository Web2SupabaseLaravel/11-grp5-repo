<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class categories extends Model
{
    protected $table ='Categories';
    protected $fillable = [
        'id',
        'name',
        'descriptions',

    ];

}
