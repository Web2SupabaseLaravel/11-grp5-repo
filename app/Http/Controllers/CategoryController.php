<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class CategoryController extends Controller
{
    public function test()
    {
        return 'Hello';
    }

    public function index()
    {
        $Category = Category::all();

        if ($Category->isEmpty()) {
            return response()->json(['message' => 'No users found'], 404);
        }

        return response()->json($Category, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            

        ]);

        $Category = Category::create([
            'name' => $request->name,
            'description' => $request->description,
            
        ]);

        return response()->json(['message' => 'Category created successfully', 'Category' => $Category], 201);
    }

    public function show(Category $Category)
    {
        return response()->json($Category, 200);
    }

   

    public function update(Request $request, Category $Category)
    {
        $request->validate([
             'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            
        ]);

        if ($request->has('name')) {
            $Category->name = $request->name;
        }

        if ($request->has('description')) {
            $Category->description = $request->description;
        }

       
        $Category->save();

        return response()->json(['message' => 'Category updated successfully', 'Category' => $Category], 200);
    }

    public function destroy(Category $Category)
    {
        $Category->delete();

        return response()->json(['message' => 'Category deleted successfully'], 200);
    }
}