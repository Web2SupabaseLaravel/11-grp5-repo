<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use App\Http\Requests\NotificationStore;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index()
    {
         $notifications = Auth::user()->notifications;


        if ($notifications->isEmpty()) {
            return response()->json(['message' => 'No notifications found'], 404);
        }

        return response()->json($notifications, 200);
    }

    public function store(NotificationStore $request)
    {
        $user_id = Auth::user()->id;
       $validatedData= $request->validated();
        $validatedData['user_id'] = $user_id;
        $notification = Notification::create($validatedData);


        return response()->json([
            'message' => 'Notification created successfully',
            'notification' => $notification
        ], 201);
    }

    public function show(Notification $notification)
    {
        return response()->json($notification, 200);
    }

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

    public function destroy(Notification $notification)
    {
        $notification->delete();

        return response()->json([
            'message' => 'Notification deleted successfully'
        ], 200);
    }
}