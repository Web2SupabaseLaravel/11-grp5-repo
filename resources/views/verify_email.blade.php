<!-- resources/views/email_verified.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Email Verified</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light d-flex justify-content-center align-items-center vh-100">
    <div class="text-center bg-white p-5 rounded shadow">
        <h1 class="text-success">Email Verified ✅</h1>
        <p class="mt-3">Thank you! Your email has been successfully verified.</p>
        <a href="{{ url('/') }}" class="btn btn-primary mt-3">Go to Homepage</a>
    </div>
</body>
</html>
