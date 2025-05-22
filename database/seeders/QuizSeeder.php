<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Quiz;
use App\Models\Lesson;
use Faker\Factory as Faker;

class QuizSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        $lessonIds = Lesson::pluck('id')->toArray();

        if (empty($lessonIds)) {
            $this->command->warn('No lessons found. Please seed lessons first.');
            return;
        }

        foreach ($lessonIds as $lessonId) {
            Quiz::create([
                'lesson_id' => $lessonId,
                'title' => $faker->sentence(3),
                'description' => $faker->paragraph,
            ]);
        }
    }
}
