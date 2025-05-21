<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{

    public function index()
    {
        $courses = Course::all();

        if ($courses->isEmpty()) {
            return response()->json(['message' => 'No courses found'], 404);
        }

        return response()->json($courses, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'learning_objectives' => 'nullable|string',
            'user_id' => 'required|integer|exists:users,id',
            'category_id' => 'required|integer|exists:categories,id',
            'is_featured' => 'boolean',
        ]);

        $course = Course::create([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'learning_objectives' => $request->learning_objectives,
            'user_id' => $request->user_id,
            'category_id' => $request->category_id,
            'is_featured' => $request->is_featured ?? false,
        ]);

        return response()->json(['message' => 'Course created successfully', 'course' => $course], 201);
    }

    public function show(Course $course)
    {
        return response()->json($course, 200);
    }

    public function update(Request $request, Course $course)
{
    $user = Auth::user();

    $validated = $request->validate([
        'title' => 'sometimes|string|max:255',
        'description' => 'sometimes|string',
        'price' => 'sometimes|numeric|min:0',
        'learning_objectives' => 'sometimes|array',
        'category_id' => 'sometimes|exists:categories,id',
        'is_featured' => 'sometimes|boolean',
    ]);

    $course->fill($validated);
    $course->save();

    return response()->json([
        'message' => 'Course updated successfully',
        'course' => $course
    ], 200);
}



    public function destroy(Course $course)
    {
        $course->delete();

        return response()->json(['message' => 'Course deleted successfully'], 200);
    }
}
