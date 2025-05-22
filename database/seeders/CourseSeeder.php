<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\User;
use App\Models\categories;
use Faker\Factory as Faker;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        $userIds = User::pluck('id')->toArray();
        $categoryIds = categories::pluck('id')->toArray();

        if (empty($userIds) || empty($categoryIds)) {
            $this->command->warn('Users or Categories table is empty!');
            return;
        }

        foreach (range(1, 10) as $i) {
            Course::create([
                'title' => $faker->sentence(3),
                'description' => $faker->paragraph,
                'price' => $faker->randomFloat(2, 20, 300),
                'learning_objectives' => $faker->text(200),
                'user_id' => $faker->randomElement($userIds),
                'category_id' => $faker->randomElement($categoryIds),
                'is_featured' => $faker->boolean,
            ]);
        }
    }
}
