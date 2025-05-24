
# Enrollments API Documentation

## Tags

- **Enrollments:** API Endpoints for managing enrollments

---

## Get All Enrollments

**GET** `/api/enrollments`

- **Summary:** Retrieve a list of all enrollments
- **Tags:** Enrollments
- **Responses:**
  - `200 OK`: Returns list of enrollments
  - `404 Not Found`: No enrollments found

---

## Create a New Enrollment

**POST** `/api/enrollments`

- **Summary:** Create a new enrollment
- **Tags:** Enrollments
- **Request Body:**

```json
{
  "user_id": 1,
  "course_id": 5,
  "enrollment_date": "2024-06-01",
  "completed_at": "2024-09-01"
}
````

* **Required fields:** `user_id`, `course_id`, `enrollment_date`, `completed_at`
* **Field Details:**

  * `user_id` (integer): Must exist in users table
  * `course_id` (integer): Must exist in courses table
  * `enrollment_date` (date string): Format `YYYY-MM-DD`
  * `completed_at` (date string): Format `YYYY-MM-DD`
* **Responses:**

  * `201 Created`: Enrollment created successfully, returns the enrollment data

---

## Get an Enrollment by ID

**GET** `/api/enrollments/{id}`

* **Summary:** Retrieve details of a specific enrollment by its ID
* **Tags:** Enrollments
* **Parameters:**

  * `id` (path, integer, required): Enrollment ID
* **Responses:**

  * `200 OK`: Returns enrollment data

---

## Update an Enrollment

**PUT** `/api/enrollments/{id}`

* **Summary:** Update an existing enrollment
* **Tags:** Enrollments
* **Parameters:**

  * `id` (path, integer, required): Enrollment ID
* **Request Body:**

```json
{
  "user_id": 1,
  "course_id": 2,
  "enrollment_date": "2024-06-01",
  "completed_at": "2024-09-01"
}
```

* **All fields optional but if present must be validated:**

  * `user_id`: must exist in users table
  * `course_id`: must exist in courses table
  * `enrollment_date`: date string `YYYY-MM-DD`
  * `completed_at`: date string `YYYY-MM-DD`
* **Responses:**

  * `200 OK`: Enrollment updated successfully, returns updated enrollment data

---

## Delete an Enrollment

**DELETE** `/api/enrollments/{id}`

* **Summary:** Delete an enrollment by ID
* **Tags:** Enrollments
* **Parameters:**

  * `id` (path, integer, required): Enrollment ID
* **Responses:**

  * `200 OK`: Enrollment deleted successfully

