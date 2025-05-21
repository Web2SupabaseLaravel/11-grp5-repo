<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Http\Controllers\UserController;
use App\Http\Controllers\QuizAnswerController;
use App\Http\Controllers\QuizQuestionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\CategoriesController;

// Public routes
Route::post('login', [UserController::class, 'login']);
Route::post('register', [UserController::class, 'register']);

// Authenticated routes
Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('logout', [UserController::class, 'logout']);

    // Admin-only routes
    Route::middleware('is_admin')->group(function () {
        Route::apiResource('users', UserController::class);
        Route::apiResource('roles', RoleController::class);
    });

    // Instructor-only route
    Route::middleware('is_instructer')->group(function () {
        Route::apiResource('quizzes', QuizController::class);
    });

    // General authenticated user routes
    Route::apiResource('quiz-questions', QuizQuestionController::class);
    Route::apiResource('quiz-answers', QuizAnswerController::class);
    Route::apiResource('certificates', CertificateController::class);
    Route::apiResource('lessons', LessonController::class);
    Route::apiResource('enrollments', EnrollmentController::class);
    Route::apiResource('progress', ProgressController::class);
    Route::apiResource('categories', CategoriesController::class);
    Route::apiResource('notifications', NotificationController::class);
    Route::apiResource('Course',CourseController::class);
});
