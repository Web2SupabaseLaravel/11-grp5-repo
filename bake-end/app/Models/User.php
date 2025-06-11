<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;               // ← import Notifiable
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, Notifiable;                       // ← add Notifiable here

    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_active'         => 'boolean',
    ];

    // JWTSubject methods...
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
    public function sendPasswordResetNotification($token)
    {
        $url = config('app.frontend_url')
             . "/reset-password?token={$token}&email={$this->email}";

        $this->notify(new \App\Notifications\ResetPasswordNotification($url));
    }
}
