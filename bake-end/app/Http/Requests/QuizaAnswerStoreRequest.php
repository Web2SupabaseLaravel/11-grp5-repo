<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class QuizaAnswerStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [

            'quiz_question_id' => 'required|exists:quiz_questions,id',
            'user_id' => 'required|exists:users,id',
            'answer' => 'required|string',
            'is_correct' => 'required|boolean',
            'score' => 'required|integer',
        ];
    }
}
