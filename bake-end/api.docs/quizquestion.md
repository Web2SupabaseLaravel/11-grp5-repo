
---

# 📘 Quiz Questions API Documentation

Base URL: `http://localhost:8000/api`

## 🏷️ Tags

* **Quiz Questions**: API Endpoints for managing quiz questions

---

## 📄 Endpoints

### 🔍 Get All Quiz Questions

**GET** `/quiz-questions`

#### Description

Retrieve a list of all quiz questions.

#### Responses

* ✅ `200 OK` – List of quiz questions
* ❌ `404 Not Found` – No quiz questions found

---

### ➕ Create a New Quiz Question

**POST** `/quiz-questions`

#### Description

Create a new quiz question.

#### Request Body

```json
{
  "question": "What is the capital of France?",
  "answer": "Paris",
  "quiz_id": 1
}
```

#### Responses

* ✅ `201 Created` – Quiz question created successfully
* ❌ `422 Unprocessable Entity` – Validation error

---

### 📄 Get a Specific Quiz Question

**GET** `/quiz-questions/{id}`

#### Description

Retrieve a specific quiz question by its ID.

#### Parameters

* `id` (integer, required): The ID of the quiz question

#### Responses

* ✅ `200 OK` – Quiz question data
* ❌ `404 Not Found` – Quiz question not found

---

### ✏️ Update a Quiz Question

**PUT** `/quiz-questions/{id}`

#### Description

Update a quiz question by its ID.

#### Parameters

* `id` (integer, required): The ID of the quiz question

#### Request Body

```json
{
  "question": "Updated question?",
  "answer": "Updated answer",
  "quiz_id": 2
}
```

#### Responses

* ✅ `200 OK` – Quiz question updated successfully
* ❌ `404 Not Found` – Quiz question not found

---

### ❌ Delete a Quiz Question

**DELETE** `/quiz-questions/{id}`

#### Description

Delete a quiz question by its ID.

#### Parameters

* `id` (integer, required): The ID of the quiz question

#### Responses

* ✅ `200 OK` – Quiz question deleted successfully
* ❌ `404 Not Found` – Quiz question not found

---


