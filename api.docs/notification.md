
# Notifications API Documentation

## Get All Notifications for Authenticated User

**GET** `/notifications`

- **Summary:** Retrieve all notifications for the authenticated user
- **Tags:** Notifications
- **Security:** Sanctum authentication required
- **Responses:**
  - `200 OK`: Returns list of notifications
  - `404 Not Found`: No notifications found for the user

---

## Create a New Notification for Authenticated User

**POST** `/notifications`

- **Summary:** Create a new notification for the authenticated user
- **Tags:** Notifications
- **Security:** Sanctum authentication required
- **Request Body:**

```json
{
  "message": "New message received",
  "type": "info"
}
````

* **Required fields:** `message`, `type`
* **Responses:**

  * `201 Created`: Notification created successfully, returns the created notification object

---

## Get a Specific Notification by ID

**GET** `/notifications/{id}`

* **Summary:** Get details of a specific notification by its ID
* **Tags:** Notifications
* **Security:** Sanctum authentication required
* **Parameters:**

  * `id` (path, integer, required): Notification ID
* **Responses:**

  * `200 OK`: Returns the notification details

---

## Update a Notification

**PUT** `/notifications/{id}`

* **Summary:** Update an existing notification
* **Tags:** Notifications
* **Security:** Sanctum authentication required
* **Parameters:**

  * `id` (path, integer, required): Notification ID
* **Request Body:**

```json
{
  "user_id": 1,
  "message": "Updated notification message",
  "type": "warning",
  "is_read": true
}
```

* **Fields are optional but if present, must conform to:**

  * `user_id`: integer, must exist in users table
  * `message`: string
  * `type`: string, max length 255
  * `is_read`: boolean
* **Responses:**

  * `200 OK`: Notification updated successfully, returns the updated notification object

---

## Delete a Notification

**DELETE** `/notifications/{id}`

* **Summary:** Delete a notification by ID
* **Tags:** Notifications
* **Security:** Sanctum authentication required
* **Parameters:**

  * `id` (path, integer, required): Notification ID
* **Responses:**

  * `200 OK`: Notification deleted successfully


