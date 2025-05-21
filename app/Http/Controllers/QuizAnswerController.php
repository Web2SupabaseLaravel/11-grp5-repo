<?php

namespace App\Http\Controllers;

use App\Models\QuizAnswer;
use Illuminate\Http\Request;
use App\Http\Requests\QuizaAnswerStoreRequest;
use App\Http\Requests\QuizaAnswerUpdateRequest;

class QuizAnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $quizAnswers = QuizAnswer::all();

        return response()->json($quizAnswers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(QuizaAnswerStoreRequest $request)
    {
        $validated = $request->validated();

        $quizAnswer = QuizAnswer::create($validated);

        return response()->json($quizAnswer, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(QuizAnswer $quizAnswer)
    {
        return response()->json($quizAnswer);
    }


    public function update(QuizaAnswerUpdateRequest $request, QuizAnswer $quizAnswer)
    {
        $validated = $request->validated();

        $quizAnswer->update($validated);

        return response()->json($quizAnswer);
    }


    public function destroy(QuizAnswer $quizAnswer)
    {
        $quizAnswer->delete();

        return response()->json(null, 204);
    }
}
