<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Lesson;//عدلت هاد ضفتو جديد
use App\Models\Quiz;//عدلت هاد ضفتو جديد


class AdminController extends Controller
{
    // GET /api/admin/stats
   public function stats(Request $request)
{
    $totalUsers       = User::count();
    $totalCourses     = Course::count();
    $totalLessons     = Lesson::count();
    $totalQuizzes     = Quiz::count();
    $totalEnrollments = Enrollment::count(); // احتياطيًا لو تحتاجه لاحقًا

    return response()->json([
        'total_users'   => $totalUsers,
        'total_courses' => $totalCourses,
        'total_lessons' => $totalLessons,
        'total_quizzes' => $totalQuizzes,
    ]);
}///الكود هاد عدلتو


    // GET /api/admin/recent-activity
    public function recentActivity(Request $request)
    {
        // Example: last 5 enrollments
        $recent = Enrollment::with('user', 'course')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(fn($e) => [
                'user'       => $e->user->name,
                'course'     => $e->course->title,
                'enrolledAt' => $e->created_at->toDateTimeString(),
            ]);

        return response()->json($recent);
    }
}
