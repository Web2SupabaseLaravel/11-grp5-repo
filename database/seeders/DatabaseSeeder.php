<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            CategorySeeder::class,
            NotificationSeeder::class,
            CertificateSeeder::class,
            CourseSeeder::class,
            LessonSeeder::class,
            QuizSeeder::class,
            QuizQuestionSeeder::class,
            QuizAnswerSeeder::class,
        ]);
    }
}
