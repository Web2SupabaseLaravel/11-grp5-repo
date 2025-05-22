<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{

    public function index()
    {
        $quiz = Quiz::all();

        if ($quiz->isEmpty()) {
            return response()->json(['message' => 'No quiz found'], 404);
        }

        return response()->json($quiz, 200);
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'lesson_id' => 'exists:lessons,id',
            'title'=>'required|string|max:255',
            'description'=>'nullable|string'
        ]);

        $quiz=Quiz::create([
            'lesson_id'=>$request->lesson_id,
            'title'=>$request->title,
            'description'=>$request->description,
        ]);
        return response()->json(['message' => 'Quiz created successfully','quiz' => $quiz,], 201);
    }


    public function show(Quiz $quiz)
    {
        return response()->json($quiz);
    }

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


    public function destroy(Quiz $quiz)
    {
       $quiz->delete();

        return response()->json(['message' => 'Quiz deleted successfully']);
    }
}
