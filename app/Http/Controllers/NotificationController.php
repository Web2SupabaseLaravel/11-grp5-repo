<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use App\Http\Requests\NotificationStore;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    /**
     * @OA\Get(
     *     path="/notifications",
     *     summary="Get all notifications for the authenticated user",
     *     tags={"Notifications"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of notifications"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No notifications found"
     *     )
     * )
     */
    public function index()
{
    $user = Auth::user();

    if (!$user) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    $notifications = $user->notifications()->latest()->take(10)->get();

    return response()->json($notifications, 200);
}

    /**
     * @OA\Post(
     *     path="/notifications",
     *     summary="Create a new notification for the authenticated user",
     *     tags={"Notifications"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"message", "type"},
     *             @OA\Property(property="message", type="string", example="New message received"),
     *             @OA\Property(property="type", type="string", example="info")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Notification created successfully"
     *     )
     * )
     */
    public function store(NotificationStore $request)
    {
        $user_id = Auth::user()->id;
        $validatedData = $request->validated();
        $validatedData['user_id'] = $user_id;
        $notification = Notification::create($validatedData);

        return response()->json([
            'message' => 'Notification created successfully',
            'notification' => $notification
        ], 201);
    }

    /**
     * @OA\Get(
     *     path="/notifications/{id}",
     *     summary="Get a specific notification by ID",
     *     tags={"Notifications"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Notification details"
     *     )
     * )
     */
    public function show(Notification $notification)
    {
        return response()->json($notification, 200);
    }

    /**
     * @OA\Put(
     *     path="/notifications/{id}",
     *     summary="Update a notification",
     *     tags={"Notifications"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=false,
     *         @OA\JsonContent(
     *             @OA\Property(property="user_id", type="integer", example=1),
     *             @OA\Property(property="message", type="string", example="Updated notification message"),
     *             @OA\Property(property="type", type="string", example="warning"),
     *             @OA\Property(property="is_read", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Notification updated successfully"
     *     )
     * )
     */
    public function update(Request $request, Notification $notification)
    {
        $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'message' => 'sometimes|required|string',
            'type' => 'sometimes|required|string|max:255',
            'is_read' => 'sometimes|required|boolean',
        ]);

        $notification->fill($request->only([
            'user_id', 'message', 'type', 'is_read'
        ]));

        $notification->save();

        return response()->json([
            'message' => 'Notification updated successfully',
            'notification' => $notification
        ], 200);
    }

    /**
     * @OA\Delete(
     *     path="/notifications/{id}",
     *     summary="Delete a notification",
     *     tags={"Notifications"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Notification deleted successfully"
     *     )
     * )
     */
    public function destroy(Notification $notification)
    {
        $notification->delete();

        return response()->json([
            'message' => 'Notification deleted successfully'
        ], 200);
    }
}
