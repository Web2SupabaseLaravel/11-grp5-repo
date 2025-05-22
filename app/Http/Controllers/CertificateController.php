<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    public function index()
    {
        $Certificates = Certificate::all();

        if ($Certificates->isEmpty()) {
            return response()->json(['message' => 'No Certificates found'], 404);
        }

        return response()->json($Certificates, 200);
    }


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




    public function show(Certificate $certificate)
    {
       return response()->json($certificate, 200);
    }




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


    public function destroy(Certificate $certificate)
    {
        $certificate->delete();

        return response()->json(['message' => 'certificate deleted successfully'], 200);
    }
}
