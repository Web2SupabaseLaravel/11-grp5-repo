# Profile API Documentation

## Get Authenticated User's Profile Information

**GET** `/profile/edit`

- **Summary:** Get the authenticated user's profile information (for editing)
- **Tags:** Profile
- **Security:** Sanctum authentication required
- **Responses:**
  - `200 OK`: Returns profile form with user info.

---

## Update Authenticated User's Profile

**PUT** `/profile`

- **Summary:** Update the authenticated user's profile
- **Tags:** Profile
- **Security:** Sanctum authentication required
- **Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
````

* **Responses:**

  * `302 Found`: Redirects to profile edit page with status indicating profile updated.

---

## Delete Authenticated User's Account

**DELETE** `/profile`

* **Summary:** Delete the authenticated user's account
* **Tags:** Profile
* **Security:** Sanctum authentication required
* **Request Body:**

```json
{
  "password": "userpassword"
}
```

* **Required Fields:** `password` (current password for confirmation)
* **Responses:**

  * `302 Found`: User logged out and redirected to homepage (`/`).

```

```
