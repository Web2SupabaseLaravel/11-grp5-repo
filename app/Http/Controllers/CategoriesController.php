<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CategoriesController extends Controller
{
    public function test()
    {
        return 'Hello';
    }

    public function index()
    {
        $Categories = Categories::all();

        if ($Categories->isEmpty()) {
            return response()->json(['message' => 'No users found'], 404);
        }

        return response()->json($Categories, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            

        ]);

        $Categories = Categories::create([
            'name' => $request->name,
            'description' => $request->description,
            
        ]);

        return response()->json(['message' => 'Categories created successfully', 'Categories' => $Categories], 201);
    }

    public function show(Categories $Categories)
    {
        return response()->json($Categories, 200);
    }

   

    public function update(Request $request, Categories $Categories)
    {
        $request->validate([
             'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            
        ]);

        if ($request->has('name')) {
            $Categories->name = $request->name;
        }

        if ($request->has('description')) {
            $Categories->description = $request->description;
        }

       
        $Categories->save();

        return response()->json(['message' => 'Categories updated successfully', 'Categories' => $Categories], 200);
    }

    public function destroy(Categories $Categories)
    {
        $Categories->delete();

        return response()->json(['message' => 'Categories deleted successfully'], 200);
    }
}