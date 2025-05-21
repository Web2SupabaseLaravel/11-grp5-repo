<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    protected $table ='enrollment';
    protected $fillable = [
        'id',
        'user_id',
        'course_id',
        'enrollment_date',
        'completed_at'

    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
public function course()
    {
        return $this->belongsTo(courses::class, 'course_id');
    }
}
