<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Course extends Model
{

    protected $fillable = [
        'title',
        'description',
        'price',
        'learning_objectives',
        'user_id',
        'category_id',
        'is_featured',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function category()
    {
        return $this->belongsTo(Categories::class);
    }
}
