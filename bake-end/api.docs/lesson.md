
# Lessons API Documentation

## Tags

- **Lessons:** API Endpoints for managing lessons

---

## Get All Lessons

**GET** `/api/lessons`

- **Summary:** Retrieve a list of all lessons
- **Tags:** Lessons
- **Responses:**
  - `200 OK`: Returns list of lessons
  - `404 Not Found`: No lessons found

---

## Create a New Lesson

**POST** `/api/lessons`

- **Summary:** Create a new lesson
- **Tags:** Lessons
- **Request Body:**

```json
{
  "course_id": 1,
  "title": "Introduction to Variables",
  "content": "This lesson covers the basics of variables...",
  "content_type": "video",
  "lesson_order": 1
}
````

* **Required fields:** `course_id`, `title`, `content`, `content_type`, `lesson_order`
* **Field Details:**

  * `course_id` (integer): Must exist in courses table
  * `title` (string, max 255 chars)
  * `content` (string)
  * `content_type` (string): One of `"video"`, `"article"`, `"quiz"`
  * `lesson_order` (integer)
* **Responses:**

  * `201 Created`: Lesson created successfully, returns the lesson object

---

## Get a Lesson by ID

**GET** `/api/lessons/{id}`

* **Summary:** Retrieve details of a lesson by its ID
* **Tags:** Lessons
* **Parameters:**

  * `id` (path, integer, required): Lesson ID
* **Responses:**

  * `200 OK`: Returns lesson data

---

## Update a Lesson

**PUT** `/api/lessons/{id}`

* **Summary:** Update an existing lesson
* **Tags:** Lessons
* **Parameters:**

  * `id` (path, integer, required): Lesson ID
* **Request Body:**

```json
{
  "course_id": 1,
  "title": "Updated Lesson Title",
  "content": "Updated content",
  "content_type": "article",
  "lesson_order": 2
}
```

* **All fields optional but if present must be validated:**

  * `course_id`: must exist in courses table
  * `title`: string, max 255 chars
  * `content`: string
  * `content_type`: one of `"video"`, `"article"`, `"quiz"`
  * `lesson_order`: integer
* **Responses:**

  * `200 OK`: Lesson updated successfully, returns updated lesson object

---

## Delete a Lesson

**DELETE** `/api/lessons/{id}`

* **Summary:** Delete a lesson by ID
* **Tags:** Lessons
* **Parameters:**

  * `id` (path, integer, required): Lesson ID
* **Responses:**

  * `200 OK`: Lesson deleted successfully

```
```
