<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Progress extends Model
{
    protected $table ='progress';
    protected $fillable = [
        'id',
        'enrollment_id',
        'lesson_id',
        'is_completed',
        'completed_at'

    ];
public function Enrollment()
    {
        return $this->belongsTo(Enrollment::class, 'enrollment_id');
    }
public function Lesson()
    {
        return $this->belongsTo(Lesson::class, 'lesson_id');
    }
}


