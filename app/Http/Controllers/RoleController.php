<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Http\Requests\RoleStoreRequest;
use App\Http\Requests\RoleUpdateRequest;

class RoleController extends Controller
{
    /**
     * Display a listing of the roles.
     */
    public function index()
    {
        $roles = Role::all();
        return response()->json($roles, 200);
    }


    public function show($id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json(['message' => 'Role not found'], 404);
        }
        return response()->json($role, 200);
    }
    public function store(RoleStoreRequest $request)
    {
        $request->validate([]);
        $role = Role::create($request->only('name', 'description'));
        return response()->json($role, 201);
    }


    public function update(RoleUpdateRequest $request, $id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json(['message' => 'Role not found'], 404);
        }
        // Properly grab data from request
        $data = $request->only('name', 'description');
        // Update and refresh
        $role->update($data);
        $role->refresh();
        return response()->json($role, 200);
    }
    /**
     * Remove the specified role from storage.
     */
    public function destroy($id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json(['message' => 'Role not found'], 404);
        }
        $role->delete();
        return response()->json(['message' => 'Role deleted successfully'], 200);
    }
}
