<?php
namespace App\Http\Controllers;
use App\Http\Requests\QuizQuestionUpdateRequest;
use App\Http\Requests\StoreQuizQuestionRequest;
use App\Models\QuizQuestion;
class QuizQuestionController extends Controller
{
    /**
     * Display a listing of the resource.
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
     * Store a newly created resource in storage.
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
     * Display the specified resource.
     */
    public function show(QuizQuestion $quizQuestion)
    {
        return response()->json($quizQuestion, 200);
    }
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
     * Remove the specified resource from storage.
     */
    public function destroy(QuizQuestion $quizQuestion)
    {
        $quizQuestion->delete();
        return response()->json(['message' => 'Quiz question deleted successfully'], 200);
    }
}












