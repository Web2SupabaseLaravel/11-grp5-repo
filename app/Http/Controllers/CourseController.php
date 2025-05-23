<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Courses",
 *     description="API Endpoints for managing courses"
 * )
 */
class CourseController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/courses",
     *     summary="Get all courses",
     *     tags={"Courses"},
     *     @OA\Response(
     *         response=200,
     *         description="List of all courses"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No courses found"
     *     )
     * )
     */
    public function index()
    {
        $courses = Course::all();

        if ($courses->isEmpty()) {
            return response()->json(['message' => 'No courses found'], 404);
        }

        return response()->json($courses, 200);
    }

    /**
     * @OA\Post(
     *     path="/api/courses",
     *     summary="Create a new course",
     *     tags={"Courses"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title", "price", "user_id", "category_id"},
     *             @OA\Property(property="title", type="string", example="Laravel Basics"),
     *             @OA\Property(property="description", type="string", example="Introduction to Laravel"),
     *             @OA\Property(property="price", type="number", format="float", example=99.99),
     *             @OA\Property(property="learning_objectives", type="string", example="Routing, Controllers, Views"),
     *             @OA\Property(property="user_id", type="integer", example=1),
     *             @OA\Property(property="category_id", type="integer", example=2),
     *             @OA\Property(property="is_featured", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Course created successfully"
     *     )
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'learning_objectives' => 'nullable|string',
            'user_id' => 'required|integer|exists:users,id',
            'category_id' => 'required|integer|exists:categories,id',
            'is_featured' => 'boolean',
        ]);

        $course = Course::create([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'learning_objectives' => $request->learning_objectives,
            'user_id' => $request->user_id,
            'category_id' => $request->category_id,
            'is_featured' => $request->is_featured ?? false,
        ]);

        return response()->json(['message' => 'Course created successfully', 'course' => $course], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/courses/{id}",
     *     summary="Get a course by ID",
     *     tags={"Courses"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Course data"
     *     )
     * )
     */
    public function show(Course $course)
    {
        return response()->json($course, 200);
    }

    /**
     * @OA\Put(
     *     path="/api/courses/{id}",
     *     summary="Update a course",
     *     tags={"Courses"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="title", type="string", example="Advanced Laravel"),
     *             @OA\Property(property="description", type="string", example="Updated course description"),
     *             @OA\Property(property="price", type="number", example=120),
     *             @OA\Property(property="learning_objectives", type="string", example="Middleware, Policies"),
     *             @OA\Property(property="category_id", type="integer", example=3),
     *             @OA\Property(property="is_featured", type="boolean", example=false)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Course updated successfully"
     *     )
     * )
     */
    public function update(Request $request, Course $course)
    {
        $validatedData = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'learning_objectives' => 'sometimes',
            'category_id' => 'sometimes|exists:categories,id',
            'is_featured' => 'sometimes|boolean',
        ]);

        $course->fill($validatedData);
        $course->save();

        return response()->json($course);
    }

    /**
     * @OA\Delete(
     *     path="/api/courses/{id}",
     *     summary="Delete a course",
     *     tags={"Courses"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Course deleted successfully"
     *     )
     * )
     */
    public function destroy(Course $course)
    {
        $course->delete();

        return response()->json(['message' => 'Course deleted successfully'], 200);
    }
}
