````markdown
# Courses API Documentation

## Tags

- **Courses:** API Endpoints for managing courses

---

## Get All Courses

**GET** `/api/courses`

- **Summary:** Retrieve a list of all courses
- **Tags:** Courses
- **Responses:**
  - `200 OK`: Returns list of all courses
  - `404 Not Found`: No courses found

---

## Create a New Course

**POST** `/api/courses`

- **Summary:** Create a new course
- **Tags:** Courses
- **Request Body:**

```json
{
  "title": "Laravel Basics",
  "description": "Introduction to Laravel",
  "price": 99.99,
  "learning_objectives": "Routing, Controllers, Views",
  "user_id": 1,
  "category_id": 2,
  "is_featured": true
}
````

* **Required fields:** `title`, `price`, `user_id`, `category_id`
* **Field Details:**

  * `title` (string): Max length 255
  * `description` (string, optional)
  * `price` (number, float)
  * `learning_objectives` (string, optional)
  * `user_id` (integer): Must exist in users table
  * `category_id` (integer): Must exist in categories table
  * `is_featured` (boolean, optional, default `false`)
* **Responses:**

  * `201 Created`: Course created successfully, returns created course data

---

## Get a Course by ID

**GET** `/api/courses/{id}`

* **Summary:** Retrieve details of a specific course by its ID
* **Tags:** Courses
* **Parameters:**

  * `id` (path, integer, required): Course ID
* **Responses:**

  * `200 OK`: Returns course data

---

## Update a Course

**PUT** `/api/courses/{id}`

* **Summary:** Update an existing course
* **Tags:** Courses
* **Parameters:**

  * `id` (path, integer, required): Course ID
* **Request Body (all fields optional):**

```json
{
  "title": "Advanced Laravel",
  "description": "Updated course description",
  "price": 120,
  "learning_objectives": "Middleware, Policies",
  "category_id": 3,
  "is_featured": false
}
```

* **Field validation:**

  * `title`: string, max length 255
  * `description`: string
  * `price`: numeric, minimum 0
  * `learning_objectives`: string
  * `category_id`: must exist in categories table
  * `is_featured`: boolean
* **Responses:**

  * `200 OK`: Course updated successfully, returns updated course data

---

## Delete a Course

**DELETE** `/api/courses/{id}`

* **Summary:** Delete a course by ID
* **Tags:** Courses
* **Parameters:**

  * `id` (path, integer, required): Course ID
* **Responses:**

  * `200 OK`: Course deleted successfully

```
```
