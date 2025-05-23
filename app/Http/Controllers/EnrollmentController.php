<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Enrollments",
 *     description="API Endpoints for managing enrollments"
 * )
 */
class EnrollmentController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/enrollments",
     *     tags={"Enrollments"},
     *     summary="Get all enrollments",
     *     @OA\Response(
     *         response=200,
     *         description="List of enrollments"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No enrollments found"
     *     )
     * )
     */
    public function index()
    {
        $enrollment = Enrollment::all();

        if ($enrollment->isEmpty()) {
            return response()->json(['message' => 'No users found'], 404);
        }

        return response()->json($enrollment, 200);
    }

    /**
     * @OA\Post(
     *     path="/api/enrollments",
     *     tags={"Enrollments"},
     *     summary="Create a new enrollment",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"user_id", "course_id", "enrollment_date", "completed_at"},
     *             @OA\Property(property="user_id", type="integer", example=1),
     *             @OA\Property(property="course_id", type="integer", example=5),
     *             @OA\Property(property="enrollment_date", type="string", format="date", example="2024-06-01"),
     *             @OA\Property(property="completed_at", type="string", format="date", example="2024-09-01")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Enrollment created successfully"
     *     )
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'course_id' => 'required|exists:courses,id',
            'enrollment_date' => 'required|date',
            'completed_at' => 'required|date',
        ]);

        $enrollment = Enrollment::create([
            'user_id' => $request->user_id,
            'course_id' => $request->course_id,
            'enrollment_date' => $request->enrollment_date,
            'completed_at' => $request->completed_at,
        ]);

        return response()->json(['message' => 'Enrollment created successfully', 'data' => $enrollment], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/enrollments/{id}",
     *     tags={"Enrollments"},
     *     summary="Get a specific enrollment",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Enrollment retrieved successfully"
     *     )
     * )
     */
    public function show(Enrollment $enrollment)
    {
        return response()->json($enrollment, 200);
    }

    /**
     * @OA\Put(
     *     path="/api/enrollments/{id}",
     *     tags={"Enrollments"},
     *     summary="Update an enrollment",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="user_id", type="integer", example=1),
     *             @OA\Property(property="course_id", type="integer", example=2),
     *             @OA\Property(property="enrollment_date", type="string", format="date", example="2024-06-01"),
     *             @OA\Property(property="completed_at", type="string", format="date", example="2024-09-01")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Enrollment updated successfully"
     *     )
     * )
     */
    public function update(Request $request, Enrollment $enrollment)
    {
        $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'course_id' => 'sometimes|exists:courses,id',
            'enrollment_date' => 'sometimes|required|date',
            'completed_at' => 'sometimes|required|date',
        ]);

        if ($request->has('user_id')) $enrollment->user_id = $request->user_id;
        if ($request->has('course_id')) $enrollment->course_id = $request->course_id;
        if ($request->has('enrollment_date')) $enrollment->enrollment_date = $request->enrollment_date;
        if ($request->has('completed_at')) $enrollment->completed_at = $request->completed_at;

        $enrollment->save();

        return response()->json(['message' => 'Enrollment updated successfully', 'data' => $enrollment], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/enrollments/{id}",
     *     tags={"Enrollments"},
     *     summary="Delete an enrollment",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Enrollment deleted successfully"
     *     )
     * )
     */
    public function destroy(Enrollment $enrollment)
    {
        $enrollment->delete();

        return response()->json(['message' => 'Enrollment deleted successfully'], 200);
    }
}
