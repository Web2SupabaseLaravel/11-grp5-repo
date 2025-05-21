<?php

namespace App\Http\Controllers;

use App\Models\Transactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class TransactionsController extends Controller
{
    public function test()
    {
        return 'Hello';
    }

    public function index()
    {
        $Transactions = Transactions::all();

        if ($Transactions->isEmpty()) {
            return response()->json(['message' => 'No users found'], 404);
        }

        return response()->json($Transactions, 200);
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


        $Transactions = Transactions::create([
            'user_id' => $request->user_id,
            'course_id' => $request->course_id,
            'amount' => $request->amount,
            'payment_date' => $request->payment_date,
            'status' => $request->status,
            

        ]);

        return response()->json(['message' => 'Transaction created successfully', 'Transactions' => $Transactions], 201);
    }

    public function show(Transactions $Transactions)
    {
        return response()->json($Transactions, 200);
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
            $Transactions->name = $request->name;
        }

        if ($request->has('course_id')) {
            $Transactions->course_id = $request->course_id;
        }


        if ($request->has('amount')) {
            $Transactions->amount = $request->amount;
        }

         if ($request->has('payment_date')) {
            $Transactions->payment_date = $request->payment_date;

        } 
        
        if ($request->has('status')) {
            $Transactions->status = $request->status;
        } 

        

        $Transactions->save();

        return response()->json(['message' => 'Categories updated successfully', 'Transactions' => $Transactions], 200);
    }

    public function destroy(Transactions $Transactions)
    {
        $Transactions->delete();

        return response()->json(['message' => 'Transactions deleted successfully'], 200);
    }
}