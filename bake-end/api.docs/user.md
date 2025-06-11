
---

# 📘 Users API

Endpoints related to user management: registration, login, logout, and CRUD operations.

## 🔖 Tags

* **Users**: User management endpoints

---

## 📝 Register a new user

**POST** `/api/register`

Register a new user and send a confirmation email.

### Request Body

```json
{
  "name": "Alaa Sousa",
  "email": "alaa@example.com",
  "password": "password123"
}
```

### Responses

* `201 Created`: Registered successfully, email verification required.
* `422 Unprocessable Entity`: Validation error.
* `500 Internal Server Error`: Something went wrong.

---

## 🔐 Login

**POST** `/api/login`

Authenticate user and return JWT token. Requires verified email.

### Request Body

```json
{
  "email": "s12327033@stu.najah.edu",
  "password": "password123"
}
```

### Responses

* `200 OK`: Login successful with token.
* `401 Unauthorized`: Invalid credentials.
* `403 Forbidden`: Email not verified.

---

## 🔓 Logout

**POST** `/api/logout`

Invalidate current token and logout the user.

### Responses

* `200 OK`: Logout successful.

---

## 📋 List All Users

**GET** `/api/users`

Returns a list of all users.

### Responses

* `200 OK`: Array of users.
* `404 Not Found`: No users found.

---

## ➕ Create a New User (Admin)

**POST** `/api/users`

Create a new user with a specific role (typically used by admins).

### Request Body

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "adminpass",
  "role_id": 2
}
```

### Responses

* `201 Created`: User created successfully.
* `422 Unprocessable Entity`: Validation error.

---

## 👁️ View User Details

**GET** `/api/users/{id}`

Retrieve the details of a specific user by ID.

### Parameters

* `id` (path, required): User ID

### Responses

* `200 OK`: User details returned.

---

## ✏️ Update a User

**PUT** `/api/users/{id}`

Update the specified user’s details.

### Parameters

* `id` (path, required): User ID

### Request Body (Partial or Full)

```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "password": "newpassword"
}
```

### Responses

* `200 OK`: User updated successfully.
* `422 Unprocessable Entity`: Validation error.

---

## ❌ Delete a User

**DELETE** `/api/users/{id}`

Delete a specific user by ID.

### Parameters

* `id` (path, required): User ID

### Responses

* `200 OK`: User deleted successfully.

---

