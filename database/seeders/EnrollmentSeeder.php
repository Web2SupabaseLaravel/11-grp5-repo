<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Enrollment;

class EnrollmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $enrollments = [
            [
                'user_id' => 1,
                'course_id' => 1,
                'enrollment_date' => now()->subDays(10),
                'completed_at' => now()->subDays(2),
            ],
            [
                'user_id' => 2,
                'course_id' => 1,
                'enrollment_date' => now()->subDays(8),
                'completed_at' => null,
            ],
            [
                'user_id' => 3,
                'course_id' => 2,
                'enrollment_date' => now()->subDays(15),
                'completed_at' => now()->subDays(1),
            ],
            [
                'user_id' => 1,
                'course_id' => 3,
                'enrollment_date' => now()->subDays(20),
                'completed_at' => now()->subDays(5),
            ],
            [
                'user_id' => 2,
                'course_id' => 2,
                'enrollment_date' => now()->subDays(12),
                'completed_at' => null,
            ],
            [
                'user_id' => 4,
                'course_id' => 1,
                'enrollment_date' => now()->subDays(7),
                'completed_at' => null,
            ],
            [
                'user_id' => 3,
                'course_id' => 3,
                'enrollment_date' => now()->subDays(25),
                'completed_at' => now()->subDays(10),
            ],
            [
                'user_id' => 4,
                'course_id' => 2,
                'enrollment_date' => now()->subDays(18),
                'completed_at' => now()->subDays(3),
            ],
            [
                'user_id' => 5,
                'course_id' => 1,
                'enrollment_date' => now()->subDays(9),
                'completed_at' => null,
            ],
            [
                'user_id' => 5,
                'course_id' => 3,
                'enrollment_date' => now()->subDays(30),
                'completed_at' => now()->subDays(15),
            ],
        ];

        foreach ($enrollments as $enrollment) {
            Enrollment::create($enrollment);
       }
    }
}
