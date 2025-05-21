<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EnrollmentController extends Controller
{
    public function test()
    {
        return 'Hello';
    }

    public function index()
    {
        $enrollment = Enrollment::all();

        if ($enrollment->isEmpty()) {
            return response()->json(['message' => 'No users found'], 404);
        }

        return response()->json($enrollment, 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
           'user_id' => 'required|exists:users,id',
            'course_id' => 'required|exists:courses,id',
            'enrollment_date' => 'required|date',
            'completed_at' => 'required|date',

        ]);

        $enrollment = EnrollmentController::create([
            'user_id' => $request->user_id,
            'course_id' => $request->course_id,
            'enrollment_date' => $request->enrollment_date,
            'completed_at' => $request->completed_at,

        ]);

        return response()->json(['message' => 'Enrollment created successfully', 'data' => $enrollment], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(EnrollmentController $enrollment)
    {
        return response()->json($enrollment, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EnrollmentController $enrollment)
    {
        $request->validate([
           'user_id' => 'sometimes|exists:users,id',
            'course_id' => 'sometimes|exists:courses,id',
            'enrollment_date' => 'sometimes|required|date',
            'completed_at' => 'sometimes|required|date',

        ]);

        if ($request->has('user_id')) {
            $enrollment->user_id = $request->user_id;
        }

       if ($request->has('course_id')) {
            $enrollment->course_id = $request->course_id;
        }

       if ($request->has('enrollment_date')) {
            $enrollment->enrollment_date = $request->enrollment_date;
        }

         if ($request->has('completed_at')) {
            $enrollment->completed_at = $request->completed_at;
        }



        $enrollment->save();

        return response()->json(['message' => 'Enrollment updated successfully', 'data' => $enrollment], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EnrollmentController $enrollment)
    {
        $enrollment->delete();

        return response()->json(['message' => 'Enrollment deleted successfully'], 200);
    }
}
