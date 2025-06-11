<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Transactions",
 *     description="API Endpoints for managing transactions"
 * )
 */
class TransactionController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/transactions",
     *     tags={"Transactions"},
     *     summary="Get all transactions",
     *     @OA\Response(
     *         response=200,
     *         description="List of transactions"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No transactions found"
     *     )
     * )
     */
    public function index()
    {
        $transactions = Transaction::all();

        if ($transactions->isEmpty()) {
            return response()->json(['message' => 'No transactions found'], 404);
        }

        return response()->json($transactions, 200);
    }

    /**
     * @OA\Post(
     *     path="/api/transactions",
     *     tags={"Transactions"},
     *     summary="Create a new transaction",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"user_id", "course_id", "amount"},
     *             @OA\Property(property="user_id", type="integer", example=1),
     *             @OA\Property(property="course_id", type="integer", example=3),
     *             @OA\Property(property="amount", type="number", format="float", example=99.99),
     *             @OA\Property(property="payment_date", type="string", format="date", example="2025-05-01"),
     *             @OA\Property(property="status", type="string", example="published")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Transaction created successfully"
     *     )
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'course_id' => 'required|exists:courses,id',
            'amount' => 'required|numeric',
            'payment_date' => 'nullable|date',
            'status' => 'sometimes|in:draft,published,archived',
        ]);

        $transaction = Transaction::create([
            'user_id' => $request->user_id,
            'course_id' => $request->course_id,
            'amount' => $request->amount,
            'payment_date' => $request->payment_date,
            'status' => $request->status,
        ]);

        return response()->json(['message' => 'Transaction created successfully', 'transaction' => $transaction], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/transactions/{id}",
     *     tags={"Transactions"},
     *     summary="Get a specific transaction",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Transaction retrieved successfully"
     *     )
     * )
     */
    public function show(Transaction $transaction)
    {
        return response()->json($transaction, 200);
    }

    /**
     * @OA\Put(
     *     path="/api/transactions/{id}",
     *     tags={"Transactions"},
     *     summary="Update a transaction",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="user_id", type="integer", example=1),
     *             @OA\Property(property="course_id", type="integer", example=3),
     *             @OA\Property(property="amount", type="number", format="float", example=49.99),
     *             @OA\Property(property="payment_date", type="string", format="date", example="2025-05-20"),
     *             @OA\Property(property="status", type="string", example="archived")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Transaction updated successfully"
     *     )
     * )
     */
    public function update(Request $request, Transaction $transaction)
    {
        $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'course_id' => 'sometimes|exists:courses,id',
            'amount' => 'sometimes|numeric',
            'payment_date' => 'nullable|date',
            'status' => 'sometimes|in:draft,published,archived',
        ]);

        if ($request->has('user_id')) $transaction->user_id = $request->user_id;
        if ($request->has('course_id')) $transaction->course_id = $request->course_id;
        if ($request->has('amount')) $transaction->amount = $request->amount;
        if ($request->has('payment_date')) $transaction->payment_date = $request->payment_date;
        if ($request->has('status')) $transaction->status = $request->status;

        $transaction->save();

        return response()->json(['message' => 'Transaction updated successfully', 'transaction' => $transaction], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/transactions/{id}",
     *     tags={"Transactions"},
     *     summary="Delete a transaction",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Transaction deleted successfully"
     *     )
     * )
     */
    public function destroy(Transaction $transaction)
    {
        $transaction->delete();

        return response()->json(['message' => 'Transaction deleted successfully'], 200);
    }
}
