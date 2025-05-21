<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\QuizQuestion;

class QuizQuestionSeeder extends Seeder
{
    public function run(): void
    {
        QuizQuestion::create([
            'question' => 'What is the capital of France?',
            'answer' => 'Paris',
        ]);

        QuizQuestion::create([
            'question' => 'What is 2 + 2?',
            'answer' => '4',
        ]);
    }
}