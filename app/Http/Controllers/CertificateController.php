<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Certificates",
 *     description="API Endpoints for managing certificates"
 * )
 */
class CertificateController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/certificates",
     *     summary="Get all certificates",
     *     tags={"Certificates"},
     *     @OA\Response(
     *         response=200,
     *         description="List of certificates"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No certificates found"
     *     )
     * )
     */
    public function index()
    {
        $Certificates = Certificate::all();

        if ($Certificates->isEmpty()) {
            return response()->json(['message' => 'No Certificates found'], 404);
        }

        return response()->json($Certificates, 200);
    }

    /**
     * @OA\Post(
     *     path="/api/certificates",
     *     summary="Create a new certificate",
     *     tags={"Certificates"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"user_id", "course_id", "certificate_path"},
     *             @OA\Property(property="user_id", type="integer", example=1),
     *             @OA\Property(property="course_id", type="integer", example=2),
     *             @OA\Property(property="issued_at", type="string", format="date", example="2025-05-23"),
     *             @OA\Property(property="certificate_path", type="string", example="/certificates/cert_123.pdf")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Certificate created successfully"
     *     )
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'course_id' => 'required|exists:courses,id',
            'issued_at' => 'nullable|date',
            'certificate_path' => 'required|string|max:255',
        ]);

        $certificate = Certificate::create([
            'user_id' => $request->user_id,
            'course_id' => $request->course_id,
            'issued_at' => $request->issued_at,
            'certificate_path' => $request->certificate_path,
        ]);

        return response()->json(['message' => 'Certificate created successfully', 'certificate' => $certificate], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/certificates/{id}",
     *     summary="Get certificate by ID",
     *     tags={"Certificates"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Certificate details"
     *     )
     * )
     */
    public function show(Certificate $certificate)
    {
       return response()->json($certificate, 200);
    }

    /**
     * @OA\Put(
     *     path="/api/certificates/{id}",
     *     summary="Update a certificate",
     *     tags={"Certificates"},
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
     *             @OA\Property(property="issued_at", type="string", format="date", example="2025-05-23"),
     *             @OA\Property(property="certificate_path", type="string", example="/certificates/cert_123_updated.pdf")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Certificate updated successfully"
     *     )
     * )
     */
    public function update(Request $request, Certificate $certificate)
    {
        $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'course_id' => 'sometimes|required|exists:courses,id',
            'issued_at' => 'nullable|date',
            'certificate_path' => 'sometimes|required|string|max:255',
        ]);

        if ($request->has('user_id')) {
            $certificate->user_id = $request->user_id;
        }

        if ($request->has('course_id')) {
            $certificate->course_id = $request->course_id;
        }

        if ($request->has('issued_at')) {
            $certificate->issued_at = $request->issued_at;
        }

        if ($request->has('certificate_path')) {
            $certificate->certificate_path = $request->certificate_path;
        }

        $certificate->save();

        return response()->json(['message' => 'Certificate updated successfully', 'certificate' => $certificate], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/certificates/{id}",
     *     summary="Delete a certificate",
     *     tags={"Certificates"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Certificate deleted successfully"
     *     )
     * )
     */
    public function destroy(Certificate $certificate)
    {
        $certificate->delete();

        return response()->json(['message' => 'Certificate deleted successfully'], 200);
    }
}
