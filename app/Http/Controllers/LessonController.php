<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Lessons",
 *     description="API Endpoints for managing lessons"
 * )
 */
class LessonController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/lessons",
     *     summary="Get all lessons",
     *     tags={"Lessons"},
     *     @OA\Response(
     *         response=200,
     *         description="List of all lessons"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No lessons found"
     *     )
     * )
     */
    public function index()
    {
        $lessons = Lesson::all();

        if ($lessons->isEmpty()) {
            return response()->json(['message' => 'No lessons found'], 404);
        }

        return response()->json($lessons, 200);
    }

    /**
     * @OA\Post(
     *     path="/api/lessons",
     *     summary="Create a new lesson",
     *     tags={"Lessons"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"course_id", "title", "content", "content_type", "lesson_order"},
     *             @OA\Property(property="course_id", type="integer", example=1),
     *             @OA\Property(property="title", type="string", example="Introduction to Variables"),
     *             @OA\Property(property="content", type="string", example="This lesson covers the basics of variables..."),
     *             @OA\Property(property="content_type", type="string", enum={"video", "article", "quiz"}, example="video"),
     *             @OA\Property(property="lesson_order", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Lesson created successfully"
     *     )
     * )
     */
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

    /**
     * @OA\Get(
     *     path="/api/lessons/{id}",
     *     summary="Get a lesson by ID",
     *     tags={"Lessons"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lesson data"
     *     )
     * )
     */
    public function show(Lesson $lesson)
    {
        return response()->json($lesson, 200);
    }

    /**
     * @OA\Put(
     *     path="/api/lessons/{id}",
     *     summary="Update a lesson",
     *     tags={"Lessons"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="course_id", type="integer", example=1),
     *             @OA\Property(property="title", type="string", example="Updated Lesson Title"),
     *             @OA\Property(property="content", type="string", example="Updated content"),
     *             @OA\Property(property="content_type", type="string", enum={"video", "article", "quiz"}, example="article"),
     *             @OA\Property(property="lesson_order", type="integer", example=2)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lesson updated successfully"
     *     )
     * )
     */
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

    /**
     * @OA\Delete(
     *     path="/api/lessons/{id}",
     *     summary="Delete a lesson",
     *     tags={"Lessons"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lesson deleted successfully"
     *     )
     * )
     */
    public function destroy(Lesson $lesson)
    {
        $lesson->delete();

        return response()->json(['message' => 'Lesson deleted successfully'], 200);
    }
}
