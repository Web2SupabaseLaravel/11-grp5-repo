<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Notification;

class NotificationSeeder extends Seeder
{
    public function run(): void
    {
        $user = \App\Models\User::first();
        if (!$user) {
            return;
        }
        Notification::create([
            'user_id' => $user->id,
            'message' => 'Your quiz result is available.',
            'type' => 'quiz',
            'is_read' => false,
        ]);
    }
}
