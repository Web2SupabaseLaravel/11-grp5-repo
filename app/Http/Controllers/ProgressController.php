<?php

namespace App\Http\Controllers;

use App\Models\Progress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProgressController extends Controller
{
    public function test()
    {
        return 'Hello';
    }

    public function index()
    {
        $progress = Progress::all();

        if ($progress->isEmpty()) {
            return response()->json(['message' => 'No users found'], 404);
        }

        return response()->json($progress, 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'enrollment_id' => 'required|exists:enrollment,id',
            'lesson_id' => 'required|exists:lesson,id',
            'is_completed' => 'required|bool',
            'completed_at' => 'required|timestamp',

        ]);

        $progress = ProgressController::create([
            'enrollment_id' => $request->enrollment_id,
            'lesson_id' => $request->lesson_id,
            'is_completed' => $request->is_completed,
            'completed_at' => $request->completed_at,

        ]);

        return response()->json(['message' => 'Progress created successfully', 'data' => $progress], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ProgressController $progress)
    {
        return response()->json($progress, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProgressController $progress)
    {
        $request->validate([
            'enrollment_id' => 'sometimes|exists:enrollment,id',
            'lesson_id' => 'sometimes|exists:lesson,id',
            'is_completed' => 'sometimes|required|bool',
            'completed_at' => 'sometimes|required|timestamp',

        ]);

        if ($request->has('enrollment_id')) {
            $progress->enrollment_id= $request->enrollment_id;
        }

       if ($request->has('lesson_id')) {
            $progress->lesson_id = $request->lesson_id;
        }

       if ($request->has('is_completed')) {
            $progress->is_completed = $request->is_completed;
        }

         if ($request->has('completed_at')) {
            $progress->completed_at = $request->completed_at;
        }



         $progress ->save();

        return response()->json(['message' => 'Progress updated successfully', 'data' => $progress], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProgressController $progress)
    {
        $progress->delete();

        return response()->json(['message' => 'Progress deleted successfully'], 200);
    }
}
