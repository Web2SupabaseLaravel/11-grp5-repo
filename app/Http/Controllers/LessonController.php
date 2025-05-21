<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function index()
    {
        $lessons = Lesson::all();

        if ($lessons->isEmpty()) {
            return response()->json(['message' => 'No lessons found'], 404);
        }

        return response()->json($lessons, 200);
    }

    public function store(Request $request)
{
    $request->validate([
        'course_id' => 'required|exists:courses,id',
        'title' => 'required|string|max:255',
        'content' => 'required|string',
        'content_type' => 'required|in:video,article,quiz',
        'lesson_order' => 'required|integer',
    ]);

    $lesson = Lesson::create([
    'course_id' => $request->course_id,
    'title' => $request->title,
    'content' => $request->content,
    'content_type' => $request->content_type,
    'lesson_order' => $request->lesson_order,
    ]);


    return response()->json(['message' => 'Lesson created successfully', 'lesson' => $lesson], 201);
}

    public function show(Lesson $lesson)
    {
        return response()->json($lesson, 200);
    }

    public function update(Request $request, Lesson $lesson)
{
    $request->validate([
        'course_id' => 'sometimes|required|exists:courses,id',
        'title' => 'sometimes|required|string|max:255',
        'content' => 'sometimes|required|string',
        'content_type' => 'sometimes|required|in:video,article,quiz',
        'lesson_order' => 'sometimes|required|integer',
    ]);

    if ($request->has('course_id')) {
        $lesson->course_id = $request->course_id;
    }

    if ($request->has('title')) {
        $lesson->title = $request->title;
    }

    if ($request->has('content')) {
        $lesson->content = $request->content;
    }

    if ($request->has('content_type')) {
        $lesson->content_type = $request->content_type;
    }

    if ($request->has('lesson_order')) {
        $lesson->lesson_order = $request->lesson_order;
    }

    $lesson->save();

    return response()->json(['message' => 'Lesson updated successfully', 'lesson' => $lesson], 200);
}

    public function destroy(Lesson $lesson)
    {
        $lesson->delete();

        return response()->json(['message' => 'Lesson deleted successfully'], 200);
    }
}
