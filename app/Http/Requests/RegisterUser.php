<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterUser extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
              'name' => [
            'required',
            'string',
            'max:255',
            'regex:/^[a-zA-Z0-9\s\p{Arabic}]+$/u'
        ],
        'email' => [
            'required',
            'string',
            'email:rfc,dns',
            'max:255',
            'unique:users,email'
        ],
        'password' => [
            'required',
            'string',
            'min:8',
            'max:64',
            'confirmed',
            'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/'
        ],
        'password_confirmation' => ['required'],
            //
        ];
    }
}