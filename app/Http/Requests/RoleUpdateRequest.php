<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoleUpdateRequest extends FormRequest
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
        // Fix: get role id directly from the route (it's a string or int, no ->id)
        $roleId = $this->route('role');

        return [
            'name' => 'required|string|max:20|unique:roles,name,' . $roleId,
            'description' => 'nullable|string|max:255',
        ];
    }
}
