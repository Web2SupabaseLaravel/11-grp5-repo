
---

## 📘 Transactions API

Manage course purchase transactions including creation, retrieval, update, and deletion.

---

### 🔹 Get All Transactions

**Endpoint:** `GET /api/transactions`
**Description:** Retrieves all transaction records.

**Responses:**

* `200 OK`: Returns a list of transactions.
* `404 Not Found`: No transactions found.

---

### 🔹 Create a New Transaction

**Endpoint:** `POST /api/transactions`
**Description:** Creates a new transaction.

**Request Body:**

```json
{
  "user_id": 1,
  "course_id": 3,
  "amount": 99.99,
  "payment_date": "2025-05-01",
  "status": "published"
}
```

**Required Fields:**

* `user_id` (integer) — must exist in `users` table.
* `course_id` (integer) — must exist in `courses` table.
* `amount` (float)

**Optional Fields:**

* `payment_date` (date)
* `status` (string) — one of: `draft`, `published`, `archived`

**Responses:**

* `201 Created`: Transaction created successfully.

---

### 🔹 Get a Specific Transaction

**Endpoint:** `GET /api/transactions/{id}`
**Description:** Retrieves a transaction by its ID.

**Path Parameter:**

* `id` (integer) — Transaction ID

**Response:**

* `200 OK`: Returns the transaction data.

---

### 🔹 Update a Transaction

**Endpoint:** `PUT /api/transactions/{id}`
**Description:** Updates the specified fields of a transaction.

**Path Parameter:**

* `id` (integer) — Transaction ID

**Request Body Example:**

```json
{
  "user_id": 1,
  "course_id": 3,
  "amount": 49.99,
  "payment_date": "2025-05-20",
  "status": "archived"
}
```

**Validation:**

* `user_id`, `course_id` must exist in their respective tables.
* `amount` must be numeric.
* `status` must be `draft`, `published`, or `archived`.

**Response:**

* `200 OK`: Transaction updated successfully.

---

### 🔹 Delete a Transaction

**Endpoint:** `DELETE /api/transactions/{id}`
**Description:** Deletes the specified transaction.

**Path Parameter:**

* `id` (integer) — Transaction ID

**Response:**

* `200 OK`: Transaction deleted successfully.

---

