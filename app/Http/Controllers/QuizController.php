<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Quizzes",
 *     description="API Endpoints for managing quizzes"
 * )
 */
class QuizController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/quizzes",
     *     summary="Get all quizzes",
     *     tags={"Quizzes"},
     *     @OA\Response(
     *         response=200,
     *         description="List of quizzes"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No quizzes found"
     *     )
     * )
     */
    public function index()
    {
        $quiz = Quiz::all();

        if ($quiz->isEmpty()) {
            return response()->json(['message' => 'No quiz found'], 404);
        }

        return response()->json($quiz, 200);
    }

    /**
     * @OA\Post(
     *     path="/api/quizzes",
     *     summary="Create a new quiz",
     *     tags={"Quizzes"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"lesson_id", "title"},
     *             @OA\Property(property="lesson_id", type="integer", example=1),
     *             @OA\Property(property="title", type="string", example="Quiz Title"),
     *             @OA\Property(property="description", type="string", example="Optional description")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Quiz created successfully"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'lesson_id' => 'exists:lessons,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $quiz = Quiz::create([
            'lesson_id' => $validatedData['lesson_id'],
            'title' => $validatedData['title'],
            'description' => $validatedData['description'] ?? null,
        ]);

        return response()->json(['message' => 'Quiz created successfully', 'quiz' => $quiz], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/quizzes/{id}",
     *     summary="Get quiz by ID",
     *     tags={"Quizzes"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Quiz ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Quiz data"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Quiz not found"
     *     )
     * )
     */
    public function show(Quiz $quiz)
    {
        return response()->json($quiz);
    }

    /**
     * @OA\Put(
     *     path="/api/quizzes/{id}",
     *     summary="Update a quiz",
     *     tags={"Quizzes"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Quiz ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="lesson_id", type="integer", example=1),
     *             @OA\Property(property="title", type="string", example="Updated Title"),
     *             @OA\Property(property="description", type="string", example="Updated description")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Quiz updated successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Quiz not found"
     *     )
     * )
     */
    public function update(Request $request, Quiz $quiz)
    {
        $request->validate([
            'lesson_id' => 'sometimes|required|exists:lessons,id',
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
        ]);

        if ($request->has('lesson_id')) {
            $quiz->lesson_id = $request->lesson_id;
        }

        if ($request->has('title')) {
            $quiz->title = $request->title;
        }

        if ($request->has('description')) {
            $quiz->description = $request->description;
        }

        $quiz->save();

        return response()->json([
            'message' => 'Quiz updated successfully',
            'quiz' => $quiz
        ]);
    }

    /**
     * @OA\Delete(
     *     path="/api/quizzes/{id}",
     *     summary="Delete a quiz",
     *     tags={"Quizzes"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Quiz ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Quiz deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Quiz not found"
     *     )
     * )
     */
    public function destroy(Quiz $quiz)
    {
        $quiz->delete();

        return response()->json(['message' => 'Quiz deleted successfully']);
    }
}
