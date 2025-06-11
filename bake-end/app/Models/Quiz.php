<?php

namespace App\Models;
use App\Models\Lesson;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $fillable = [
        'lesson_id',
        'title',
        'description',
    ];

    public function Lesson () {
        return $this->belongsTo(Lesson::class);
    }
}
