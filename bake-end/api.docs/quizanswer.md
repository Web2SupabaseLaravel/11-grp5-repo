# Quiz Answers API Documentation

## Tags

- **Quiz Answers:** API Endpoints for managing quiz answers

---

## Get All Quiz Answers

**GET** `/api/quiz-answers`

- **Summary:** Retrieve a list of all quiz answers
- **Tags:** Quiz Answers
- **Responses:**
  - `200 OK`: Returns list of quiz answers

---

## Create a New Quiz Answer

**POST** `/api/quiz-answers`

- **Summary:** Create a new quiz answer
- **Tags:** Quiz Answers
- **Request Body:**

```json
{
  "quiz_question_id": 1,
  "answer_text": "Paris",
  "is_correct": true
}
````

* **Required fields:** `quiz_question_id`, `answer_text`, `is_correct`
* **Field Details:**

  * `quiz_question_id` (integer)
  * `answer_text` (string)
  * `is_correct` (boolean)
* **Responses:**

  * `201 Created`: Quiz answer created successfully

---

## Get Quiz Answer by ID

**GET** `/api/quiz-answers/{id}`

* **Summary:** Retrieve details of a specific quiz answer by its ID
* **Tags:** Quiz Answers
* **Parameters:**

  * `id` (path, integer, required): Quiz answer ID
* **Responses:**

  * `200 OK`: Returns quiz answer data
  * `404 Not Found`: Quiz answer not found

---

## Update a Quiz Answer

**PUT** `/api/quiz-answers/{id}`

* **Summary:** Update an existing quiz answer
* **Tags:** Quiz Answers
* **Parameters:**

  * `id` (path, integer, required): Quiz answer ID
* **Request Body (optional fields):**

```json
{
  "quiz_question_id": 1,
  "answer_text": "Paris",
  "is_correct": true
}
```

* **Responses:**

  * `200 OK`: Quiz answer updated successfully
  * `404 Not Found`: Quiz answer not found

---

## Delete a Quiz Answer

**DELETE** `/api/quiz-answers/{id}`

* **Summary:** Delete a quiz answer by ID
* **Tags:** Quiz Answers
* **Parameters:**

  * `id` (path, integer, required): Quiz answer ID
* **Responses:**

  * `204 No Content`: Quiz answer deleted successfully
  * `404 Not Found`: Quiz answer not found

```
```
