<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizAnswer extends Model
{
    use HasFactory;

    // ✅ Correct table name
    protected $table = 'quiz_answers';

    protected $fillable = [
        'quiz_question_id',
        'user_id',
        'answer',
        'is_correct',
        'score',
    ];

    /**
     * Get the question associated with the answer.
     */
    public function question()
    {
        // ✅ Correct foreign key
        return $this->belongsTo(QuizQuestion::class, 'quiz_question_id');
    }

    /**
     * Get the user who answered.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
