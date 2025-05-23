<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Transaction::insert([
            [
                'id' => 1,
                'user_id' => 1, 
                'course_id' => 2, 
                'amount' => 100.00,
                'payment_date' => Carbon::now()->subDays(5),
                'status' => 'completed',
            ],
            [
                'id' => 2,
                'user_id' => 2,
                'course_id' => 3,
                'amount' => 150.00,
                'payment_date' => Carbon::now()->subDays(2),
                'status' => 'pending',
            ],
            [
                'id' => 3,
                'user_id' => 1,
                'course_id' => 1,
                'amount' => 200.00,
                'payment_date' => Carbon::now(),
                'status' => 'failed',
            ],
        ]);
    }
}

