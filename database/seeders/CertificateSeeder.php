<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Certificate;
use App\Models\User;
use App\Models\Course;
use Carbon\Carbon;

class CertificateSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::inRandomOrder()->take(3)->get();
        $courses = Course::inRandomOrder()->take(3)->get();

        foreach ($users as $user) {
            foreach ($courses as $course) {
                Certificate::firstOrCreate([
                    'user_id' => $user->id,
                    'course_id' => $course->id,
                ], [
                    'certificate_path' => 'certificates/' . uniqid() . '.pdf',
                    'issued_at' => Carbon::now()->subDays(rand(1, 365)),
                ]);
            }
        }
    }
}

