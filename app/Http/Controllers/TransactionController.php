<?php

namespace App\Http\Controllers;

use App\Models\Transactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class TransactionController extends Controller
{
    public function test()
    {
        return 'Hello';
    }

    public function index()
    {
        $Transaction = Transaction::all();

        if ($Transaction->isEmpty()) {
            return response()->json(['message' => 'No users found'], 404);
        }

        return response()->json($Transaction, 200);
    }

   public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'course_id' => 'required|exists:courses,id',
            'amount' => 'required|numeric',
            'payment_date' => 'nullable|date',
            'status' => 'sometimes|in:draft,published,archived',
        ]);


        $Transaction = Transaction::create([
            'user_id' => $request->user_id,
            'course_id' => $request->course_id,
            'amount' => $request->amount,
            'payment_date' => $request->payment_date,
            'status' => $request->status,
            

        ]);

        return response()->json(['message' => 'Transaction created successfully', 'Transaction' => $Transaction], 201);
    }

    public function show(Transaction $Transaction)
    {
        return response()->json($Transaction, 200);
    }

   

    public function update(Request $request, Transaction $transaction)
    {

        $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'course_id' => 'sometimes|exists:courses,id',
            'amount' => 'sometimes|numeric',
            'payment_date' => 'nullable|date',
            'status' => 'sometimes|in:draft,published,archived',
        ]);

        if ($request->has('user_id')) {
            $Transaction->name = $request->name;
        }

        if ($request->has('course_id')) {
            $Transaction->course_id = $request->course_id;
        }


        if ($request->has('amount')) {
            $Transaction->amount = $request->amount;
        }

         if ($request->has('payment_date')) {
            $Transaction->payment_date = $request->payment_date;

        } 
        
        if ($request->has('status')) {
            $Transaction->status = $request->status;
        } 

        

        $Transaction->save();

        return response()->json(['message' => 'Transaction updated successfully', 'Transaction' => $Transaction], 200);
    }

    public function destroy(Transaction $Transaction)
    {
        $Transaction->delete();

        return response()->json(['message' => 'Transaction deleted successfully'], 200);
    }
}