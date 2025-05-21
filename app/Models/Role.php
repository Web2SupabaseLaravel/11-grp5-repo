<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class role extends Model
{
    protected $table = 'roles';
    protected $fillable = ['name', 'description','created_at',"updated_at"];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}