<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\QuizAnswer;
use App\Models\User;

class QuizAnswerSeeder extends Seeder
{
    public function run(): void
    {
        $userId = User::first()?->id; // get actual existing user ID

        if (!$userId) {
            return; // no user in DB, skip seeding
        }

        QuizAnswer::create([
            'quiz_question_id' => 1,
            'user_id' => $userId,
            'answer' => 'Paris',
            'is_correct' => true,
            'score' => 10,
        ]);

        QuizAnswer::create([
            'quiz_question_id' => 2,
            'user_id' => $userId,
            'answer' => '3',
            'is_correct' => false,
            'score' => 0,
        ]);
    }
}
