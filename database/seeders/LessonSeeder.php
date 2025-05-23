<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lesson;
use App\Models\Course;
use Faker\Factory as Faker;

class LessonSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        $courseIds = Course::pluck('id')->toArray();

        if (empty($courseIds)) {
            $this->command->warn('No courses found. Please seed courses first.');
            return;
        }

        foreach ($courseIds as $courseId) {
            $lessonCount = rand(3, 7);

            for ($i = 1; $i <= $lessonCount; $i++) {
                Lesson::create([
                    'course_id' => 1,
                    'title' => $faker->sentence(4),
                    'content' => $faker->paragraphs(rand(1, 3), true),
                    'content_type' => $faker->randomElement(['video', 'text', 'quiz']),
                    'lesson_order' => $i,
                ]);
            }
        }
    }
}
