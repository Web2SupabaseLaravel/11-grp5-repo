<?php

namespace App\Http\Controllers;

use App\Models\Progress;
use Illuminate\Http\Request;

class ProgressController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/progress",
     *     summary="Get all progress records",
     *     tags={"Progress"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No progress records found"
     *     )
     * )
     */
    public function index()
    {
        $progress = Progress::all();

        if ($progress->isEmpty()) {
            return response()->json(['message' => 'No progress records found'], 404);
        }

        return response()->json($progress, 200);
    }

    /**
     * @OA\Post(
     *     path="/api/progress",
     *     summary="Create a new progress record",
     *     tags={"Progress"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"enrollment_id", "lesson_id", "is_completed", "completed_at"},
     *             @OA\Property(property="enrollment_id", type="integer", example=1),
     *             @OA\Property(property="lesson_id", type="integer", example=5),
     *             @OA\Property(property="is_completed", type="boolean", example=true),
     *             @OA\Property(property="completed_at", type="string", format="date", example="2024-01-01")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Progress created successfully"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     )
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            'enrollment_id' => 'required|exists:enrollments,id',
            'lesson_id' => 'required|exists:lessons,id',
            'is_completed' => 'required|boolean',
            'completed_at' => 'required|date',
        ]);

        $progress = Progress::create([
            'enrollment_id' => $request->enrollment_id,
            'lesson_id' => $request->lesson_id,
            'is_completed' => $request->is_completed,
            'completed_at' => $request->completed_at,
        ]);

        return response()->json(['message' => 'Progress created successfully', 'data' => $progress], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/progress/{id}",
     *     summary="Get a specific progress record",
     *     tags={"Progress"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Progress found"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Progress not found"
     *     )
     * )
     */
    public function show(Progress $progress)
    {
        return response()->json($progress, 200);
    }

    /**
     * @OA\Put(
     *     path="/api/progress/{id}",
     *     summary="Update an existing progress record",
     *     tags={"Progress"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="enrollment_id", type="integer", example=1),
     *             @OA\Property(property="lesson_id", type="integer", example=5),
     *             @OA\Property(property="is_completed", type="boolean", example=true),
     *             @OA\Property(property="completed_at", type="string", format="date", example="2024-01-01")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Progress updated successfully"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     )
     * )
     */
    public function update(Request $request, Progress $progress)
    {
        $request->validate([
            'enrollment_id' => 'sometimes|exists:enrollments,id',
            'lesson_id' => 'sometimes|exists:lessons,id',
            'is_completed' => 'sometimes|required|boolean',
            'completed_at' => 'sometimes|required|date',
        ]);

        if ($request->has('enrollment_id')) {
            $progress->enrollment_id = $request->enrollment_id;
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

        $progress->save();

        return response()->json(['message' => 'Progress updated successfully', 'data' => $progress], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/progress/{id}",
     *     summary="Delete a progress record",
     *     tags={"Progress"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Progress deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Progress not found"
     *     )
     * )
     */
    public function destroy(Progress $progress)
    {
        $progress->delete();

        return response()->json(['message' => 'Progress deleted successfully'], 200);
    }
}
