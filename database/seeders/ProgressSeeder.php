<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Progress;

class ProgressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $progressRecords = [
            [
                'enrollment_id' => 1,
                'lesson_id' => 1,
                'is_completed' => true,
                'completed_at' => now()->subDays(8),
            ],
            [
                'enrollment_id' => 1,
                'lesson_id' => 2,
                'is_completed' => true,
                'completed_at' => now()->subDays(6),
            ],
            [
                'enrollment_id' => 1,
                'lesson_id' => 3,
                'is_completed' => true,
                'completed_at' => now()->subDays(4),
            ],
            [
                'enrollment_id' => 1,
                'lesson_id' => 4,
                'is_completed' => true,
                'completed_at' => now()->subDays(2),
            ],
            [
                'enrollment_id' => 2,
                'lesson_id' => 1,
                'is_completed' => true,
                'completed_at' => now()->subDays(5),
            ],
            [
                'enrollment_id' => 2,
                'lesson_id' => 2,
                'is_completed' => true,
                'completed_at' => now()->subDays(3),
            ],
            [
                'enrollment_id' => 2,
                'lesson_id' => 3,
                'is_completed' => false,
                'completed_at' => null,
            ],
            [
                'enrollment_id' => 2,
                'lesson_id' => 4,
                'is_completed' => false,
                'completed_at' => null,
            ],
            [
                'enrollment_id' => 3,
                'lesson_id' => 5,
                'is_completed' => true,
                'completed_at' => now()->subDays(10),
            ],
            [
                'enrollment_id' => 3,
                'lesson_id' => 6,
                'is_completed' => true,
                'completed_at' => now()->subDays(8),
            ],
            [
                'enrollment_id' => 3,
                'lesson_id' => 7,
                'is_completed' => true,
                'completed_at' => now()->subDays(5),
            ],
            [
                'enrollment_id' => 4,
                'lesson_id' => 8,
                'is_completed' => true,
                'completed_at' => now()->subDays(15),
            ],
            [
                'enrollment_id' => 4,
                'lesson_id' => 9,
                'is_completed' => true,
                'completed_at' => now()->subDays(12),
            ],
            [
                'enrollment_id' => 5,
                'lesson_id' => 1,
                'is_completed' => true,
                'completed_at' => now()->subDays(7),
            ],
            [
                'enrollment_id' => 5,
                'lesson_id' => 2,
                'is_completed' => false,
                'completed_at' => null,
            ],
            [
                'enrollment_id' => 6,
                'lesson_id' => 5,
                'is_completed' => false,
                'completed_at' => null,
            ],
            [
                'enrollment_id' => 7,
                'lesson_id' => 8,
                'is_completed' => true,
                'completed_at' => now()->subDays(20),
            ],
            [
                'enrollment_id' => 7,
                'lesson_id' => 9,
                'is_completed' => true,
                'completed_at' => now()->subDays(18),
            ],
            [
                'enrollment_id' => 8,
                'lesson_id' => 5,
                'is_completed' => true,
                'completed_at' => now()->subDays(10),
            ],
            [
                'enrollment_id' => 8,
                'lesson_id' => 6,
                'is_completed' => true,
                'completed_at' => now()->subDays(5),
            ],
        ];

        foreach ($progressRecords as $progress) {
            Progress::create($progress);
       }
    }
}
