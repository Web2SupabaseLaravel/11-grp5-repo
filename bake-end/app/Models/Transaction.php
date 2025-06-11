<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table ='Transaction';
    protected $fillable = [
        'id',
        'user_id',
        'course_id',
        'amount',
        'payment_date',
        'status',

    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
     public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }
}
