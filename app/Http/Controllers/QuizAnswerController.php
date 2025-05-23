<?php

namespace App\Http\Controllers;

use App\Models\QuizAnswer;
use Illuminate\Http\Request;
use App\Http\Requests\QuizAnswerStoreRequest;
use App\Http\Requests\QuizAnswerUpdateRequest;

/**
 * @OA\Tag(
 *     name="Quiz Answers",
 *     description="API Endpoints for managing quiz answers"
 * )
 */
class QuizAnswerController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/quiz-answers",
     *     summary="Get all quiz answers",
     *     tags={"Quiz Answers"},
     *     @OA\Response(
     *         response=200,
     *         description="List of quiz answers"
     *     )
     * )
     */
    public function index()
    {
        $quizAnswers = QuizAnswer::all();
        return response()->json($quizAnswers);
    }

    /**
     * @OA\Post(
     *     path="/api/quiz-answers",
     *     summary="Create a new quiz answer",
     *     tags={"Quiz Answers"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"quiz_question_id", "answer_text", "is_correct"},
     *             @OA\Property(property="quiz_question_id", type="integer", example=1),
     *             @OA\Property(property="answer_text", type="string", example="Paris"),
     *             @OA\Property(property="is_correct", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Quiz answer created successfully"
     *     )
     * )
     */
    public function store(QuizAnswerStoreRequest $request)
    {
        $validated = $request->validated();
        $quizAnswer = QuizAnswer::create($validated);
        return response()->json($quizAnswer, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/quiz-answers/{id}",
     *     summary="Get a specific quiz answer",
     *     tags={"Quiz Answers"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Quiz answer data"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Quiz answer not found"
     *     )
     * )
     */
    public function show(QuizAnswer $quizAnswer)
    {
        return response()->json($quizAnswer);
    }

    /**
     * @OA\Put(
     *     path="/api/quiz-answers/{id}",
     *     summary="Update a quiz answer",
     *     tags={"Quiz Answers"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="quiz_question_id", type="integer", example=1),
     *             @OA\Property(property="answer_text", type="string", example="Paris"),
     *             @OA\Property(property="is_correct", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Quiz answer updated successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Quiz answer not found"
     *     )
     * )
     */
    public function update(QuizAnswerUpdateRequest $request, QuizAnswer $quizAnswer)
    {
        $validated = $request->validated();
        $quizAnswer->update($validated);
        return response()->json($quizAnswer);
    }

    /**
     * @OA\Delete(
     *     path="/api/quiz-answers/{id}",
     *     summary="Delete a quiz answer",
     *     tags={"Quiz Answers"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Quiz answer deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Quiz answer not found"
     *     )
     * )
     */
    public function destroy(QuizAnswer $quizAnswer)
    {
        $quizAnswer->delete();
        return response()->json(null, 204);
    }
}
