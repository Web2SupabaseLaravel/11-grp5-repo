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
use App\Http\Controllers\CategoryController;

// Public routes
Route::post('login', [UserController::class, 'login']);
Route::post('register', [UserController::class, 'register']);

Route::middleware('auth:api' , 'is_admin')->group(function () {
    // existing admin resource routes...
    // add these two:
    Route::get('admin/stats', [\App\Http\Controllers\AdminController::class, 'stats']);
    Route::get('admin/recent-activity', [\App\Http\Controllers\AdminController::class, 'recentActivity']);
});
// Routes for Email verification (if using email verification)
Route::get('/email/verify/{id}/{hash}', function (Request $request) {
    $request->user()->markEmailAsVerified();
    return response()->json(['message' => 'Email verified successfully']);
})->middleware(['auth:api', 'signed'])->name('verification.verify');

Route::middleware('auth:api')->group(function () {
    Route::put('/user', [UserController::class, 'updateProfile']);
});

Route::middleware('auth:api')->put('/change-password', [UserController::class, 'changePassword']);
Route::delete('/user', [UserController::class, 'deleteAccount']);



// Resend email verification notification
Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return response()->json(['message' => 'Verification email sent successfully']);
})->middleware(['auth:api', 'throttle:6,1'])->name('verification.send');

// Authenticated routes
Route::middleware(['auth:api'])->group(function () {

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
    Route::middleware('auth:api')->group(function () {
        Route::apiResource('quizzes', QuizController::class);
        Route::get('/my-courses', [CourseController::class, 'myCourses']);
        Route::apiResource('enrollments', EnrollmentController::class);
        Route::apiResource('notifications', NotificationController::class);
        Route::apiResource('lessons', LessonController::class);
    });

    Route::apiResource('courses', CourseController::class);
    // General authenticated user routes
    Route::apiResource('quiz-questions', QuizQuestionController::class);
    Route::apiResource('quiz-answers', QuizAnswerController::class);
    Route::apiResource('certificates', CertificateController::class);
    Route::apiResource('progress', ProgressController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('transaction', TransactionController::class);


});

Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{course}', [CourseController::class, 'show']);
