<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\User;
use App\Models\Category;
use Faker\Factory as Faker;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
       $user=User::first();
        $category = Category::first();

        if (empty($userIds) || empty($categoryIds)) {
            $this->command->warn('Users or Categories table is empty!');
            return;
        }

        foreach (range(1, 10) as $i) {
            Course::create([
                'title' => $faker->sentence(3),
                'description' => $faker->paragraph,
                'price' => $faker->randomFloat(2, 20, 300),
                'learning_objectives' => "test",
                'user_id' => $user->id,
                'category_id' => $category->id,
                'is_featured' => $faker->boolean,
            ]);
        }
    }
}
