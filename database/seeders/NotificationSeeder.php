<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Notification;

class NotificationSeeder extends Seeder
{
    public function run(): void
    {
        Notification::create([
            'user_id' => 1,
            'message' => 'Your quiz result is available.',
            'type' => 'quiz',
            'is_read' => false,
        ]);
    }
}