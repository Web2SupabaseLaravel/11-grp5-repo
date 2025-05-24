
---

## Quizzes API

### `GET /api/quizzes`

**Summary:** Get all quizzes
**Tags:** Quizzes
**Responses:**

* `200 OK` – List of quizzes
* `404 Not Found` – No quizzes found

---

### `POST /api/quizzes`

**Summary:** Create a new quiz
**Tags:** Quizzes
**Request Body:**

```json
{
  "lesson_id": 1,
  "title": "Quiz Title",
  "description": "Optional description"
}
```

* Required fields: `lesson_id`, `title`

**Responses:**

* `201 Created` – Quiz created successfully
* `422 Unprocessable Entity` – Validation error

---

### `GET /api/quizzes/{id}`

**Summary:** Get quiz by ID
**Tags:** Quizzes
**Parameters:**

* `id` (in `path`, required, `integer`) — Quiz ID

**Responses:**

* `200 OK` – Quiz data
* `404 Not Found` – Quiz not found

---

### `PUT /api/quizzes/{id}`

**Summary:** Update a quiz
**Tags:** Quizzes
**Parameters:**

* `id` (in `path`, required, `integer`) — Quiz ID

**Request Body:**

```json
{
  "lesson_id": 1,
  "title": "Updated Title",
  "description": "Updated description"
}
```

* All fields optional but validated if present

**Responses:**

* `200 OK` – Quiz updated successfully
* `404 Not Found` – Quiz not found

---

### `DELETE /api/quizzes/{id}`

**Summary:** Delete a quiz
**Tags:** Quizzes
**Parameters:**

* `id` (in `path`, required, `integer`) — Quiz ID

**Responses:**

* `200 OK` – Quiz deleted successfully
* `404 Not Found` – Quiz not found

---

