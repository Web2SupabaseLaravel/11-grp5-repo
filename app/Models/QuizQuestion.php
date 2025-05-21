<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class QuizQuestion extends Model
{
    protected $table = 'quiz_questions'; // Specify the table name if it's not the default 'users'
    protected $fillable = [
        'question',
        'answer',
        'created_at',
        'updated_at'
    ];
}
