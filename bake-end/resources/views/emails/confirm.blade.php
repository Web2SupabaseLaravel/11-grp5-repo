<h1>Hello {{ $user->name }},</h1>

<p>Thank you for registering. Please confirm your email by clicking the link below:</p>

<a href="{{ url('/verify-email/' . $user->id . '/' . urlencode($user->email_verification_token)) }}">
    Confirm Email
</a>
