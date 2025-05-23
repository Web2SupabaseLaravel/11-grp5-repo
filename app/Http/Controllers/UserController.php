<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Requests\RegisterUser;
use App\Mail\ConfirmEmail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    /**
     * Register a new user and send verification email.
     */
    public function register(RegisterUser $request)
    {
        $validated = $request->validated();

        // Create user with verification token
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role_id' => 2,
            'email_verification_token' => Str::random(64),
        ]);

        // Send confirmation email
        Mail::to($user->email)->send(new ConfirmEmail($user));

        // Issue JWT token
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'Registered! Please check your email to verify your account.',
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    /**
     * Authenticate user and issue token (only if email is verified).
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Attempt authentication
        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = JWTAuth::user();

        // Block login if email not verified
        if (! $user->email_verified_at) {
            return response()->json([
                'message' => 'Please verify your email before logging in.'
            ], 403);
        }

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token,
        ], 200);
    }

    /**
     * Invalidate the current token.
     */
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['message' => 'Logout successful'], 200);
    }

    /**
     * List all users (admin).
     */
    public function index()
    {
        $users = User::all();

        if ($users->isEmpty()) {
            return response()->json(['message' => 'No users found'], 404);
        }

        return response()->json($users, 200);
    }

    /**
     * Create a new user (admin).
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role_id'  => 'required|exists:roles,id',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role_id'  => $request->role_id,
        ]);

        return response()->json(['message' => 'User created', 'user' => $user], 201);
    }

    /**
     * Show a specific user.
     */
    public function show(User $user)
    {
        return response()->json($user, 200);
    }

    /**
     * Update an existing user.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name'     => 'sometimes|required|string|max:255',
            'email'    => 'sometimes|required|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|required|string|min:6',
        ]);

        $user->update([
            'name'     => $request->name     ?? $user->name,
            'email'    => $request->email    ?? $user->email,
            'password' => $request->password ? Hash::make($request->password) : $user->password,
        ]);

        return response()->json(['message' => 'User updated', 'user' => $user], 200);
    }

    /**
     * Delete a user.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message' => 'User deleted'], 200);
    }
}
