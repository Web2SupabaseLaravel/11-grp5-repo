<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Models\User;

Route::get('/verify-email/{id}/{token}', function ($id, $token) {
    $user = User::findOrFail($id);

    if ($user->email_verified_at) {
        return view('email_verified');
    }

    if ($user->email_verification_token === $token) {
        $user->email_verified_at = now();
        $user->email_verification_token = null;
        $user->save();

        return view('email_verified');
    }

    return response()->json(['message' => 'Invalid verification link.'], 400);
});



require __DIR__.'/auth.php';
