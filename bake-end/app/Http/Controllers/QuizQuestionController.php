<?php

namespace App\Http\Controllers;

use App\Http\Requests\QuizQuestionUpdateRequest;
use App\Http\Requests\StoreQuizQuestionRequest;
use App\Models\QuizQuestion;

/**
 * @OA\Tag(
 *     name="Quiz Questions",
 *     description="API Endpoints for managing quiz questions"
 * )
 */
class QuizQuestionController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/quiz-questions",
     *     summary="Get all quiz questions",
     *     tags={"Quiz Questions"},
     *     @OA\Response(
     *         response=200,
     *         description="List of quiz questions"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No quiz questions found"
     *     )
     * )
     */
    public function index()
    {
        $quizQuestions = QuizQuestion::all();
        if ($quizQuestions->isEmpty()) {
            return response()->json(['message' => 'No quiz questions found'], 404);
        }
        return response()->json($quizQuestions, 200);
    }

    /**
     * @OA\Post(
     *     path="/api/quiz-questions",
     *     summary="Create a new quiz question",
     *     tags={"Quiz Questions"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"question", "answer", "quiz_id"},
     *             @OA\Property(property="question", type="string", example="What is the capital of France?"),
     *             @OA\Property(property="answer", type="string", example="Paris"),
     *             @OA\Property(property="quiz_id", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Quiz question created successfully"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     )
     * )
     */
    public function store(StoreQuizQuestionRequest $request)
    {
        $quizQuestion = QuizQuestion::create([
            'question' => $request->question,
            'answer' => $request->answer,
            'quiz_id' => $request->quiz_id,
        ]);
        return response()->json(['message' => 'Quiz question created successfully', 'data' => $quizQuestion], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/quiz-questions/{id}",
     *     summary="Get a specific quiz question",
     *     tags={"Quiz Questions"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Quiz question ID",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Quiz question data"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Quiz question not found"
     *     )
     * )
     */
    public function show(QuizQuestion $quizQuestion)
    {
        return response()->json($quizQuestion, 200);
    }

    /**
     * @OA\Put(
     *     path="/api/quiz-questions/{id}",
     *     summary="Update a quiz question",
     *     tags={"Quiz Questions"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Quiz question ID",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="question", type="string", example="Updated question?"),
     *             @OA\Property(property="answer", type="string", example="Updated answer"),
     *             @OA\Property(property="quiz_id", type="integer", example=2)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Quiz question updated successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Quiz question not found"
     *     )
     * )
     */
    public function update(QuizQuestionUpdateRequest $request, QuizQuestion $quizQuestion)
    {
        if ($request->has('question')) {
            $quizQuestion->question = $request->question;
        }
        if ($request->has('answer')) {
            $quizQuestion->answer = $request->answer;
        }
        if ($request->has('quiz_id')) {
            $quizQuestion->quiz_id = $request->quiz_id;
        }
        $quizQuestion->save();
        return response()->json([
            'message' => 'Quiz question updated successfully',
            'data' => $quizQuestion
        ], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/quiz-questions/{id}",
     *     summary="Delete a quiz question",
     *     tags={"Quiz Questions"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Quiz question ID",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Quiz question deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Quiz question not found"
     *     )
     * )
     */
    public function destroy(QuizQuestion $quizQuestion)
    {
        $quizQuestion->delete();
        return response()->json(['message' => 'Quiz question deleted successfully'], 200);
    }
}
