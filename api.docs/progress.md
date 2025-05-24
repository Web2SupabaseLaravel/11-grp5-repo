
# Progress API Documentation

## Get All Progress Records

**GET** `/api/progress`

- **Summary:** Get all progress records
- **Tags:** Progress
- **Responses:**
  - `200 OK`: Successful operation, returns list of progress records.
  - `404 Not Found`: No progress records found.

---

## Create a New Progress Record

**POST** `/api/progress`

- **Summary:** Create a new progress record
- **Tags:** Progress
- **Request Body:**

```json
{
  "enrollment_id": 1,
  "lesson_id": 5,
  "is_completed": true,
  "completed_at": "2024-01-01"
}
````

* **Required Fields:** `enrollment_id`, `lesson_id`, `is_completed`, `completed_at`
* **Responses:**

  * `201 Created`: Progress created successfully.
  * `422 Unprocessable Entity`: Validation error.

---

## Get a Specific Progress Record

**GET** `/api/progress/{id}`

* **Summary:** Get a specific progress record by ID
* **Tags:** Progress
* **Parameters:**

  * `id` (integer, path): Progress record ID
* **Responses:**

  * `200 OK`: Progress found.
  * `404 Not Found`: Progress not found.

---

## Update an Existing Progress Record

**PUT** `/api/progress/{id}`

* **Summary:** Update an existing progress record
* **Tags:** Progress
* **Parameters:**

  * `id` (integer, path): Progress record ID
* **Request Body:** (All fields optional)

```json
{
  "enrollment_id": 1,
  "lesson_id": 5,
  "is_completed": true,
  "completed_at": "2024-01-01"
}
```

* **Responses:**

  * `200 OK`: Progress updated successfully.
  * `422 Unprocessable Entity`: Validation error.

---

## Delete a Progress Record

**DELETE** `/api/progress/{id}`

* **Summary:** Delete a progress record by ID
* **Tags:** Progress
* **Parameters:**

  * `id` (integer, path): Progress record ID
* **Responses:**

  * `200 OK`: Progress deleted successfully.
  * `404 Not Found`: Progress not found.

```
```
