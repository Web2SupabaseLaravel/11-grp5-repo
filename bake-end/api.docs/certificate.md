# Certificates API Documentation

## Tags

- **Certificates:** API Endpoints for managing certificates

---

## Get All Certificates

**GET** `/api/certificates`

- **Summary:** Retrieve a list of all certificates
- **Tags:** Certificates
- **Responses:**
  - `200 OK`: Returns list of certificates
  - `404 Not Found`: No certificates found

---

## Create a New Certificate

**POST** `/api/certificates`

- **Summary:** Create a new certificate
- **Tags:** Certificates
- **Request Body:**

```json
{
  "user_id": 1,
  "course_id": 2,
  "issued_at": "2025-05-23",
  "certificate_path": "/certificates/cert_123.pdf"
}
````

* **Required fields:** `user_id`, `course_id`, `certificate_path`
* **Field Details:**

  * `user_id` (integer): Must exist in users table
  * `course_id` (integer): Must exist in courses table
  * `issued_at` (string, date, optional)
  * `certificate_path` (string): Max length 255
* **Responses:**

  * `201 Created`: Certificate created successfully, returns created certificate data

---

## Get Certificate by ID

**GET** `/api/certificates/{id}`

* **Summary:** Retrieve details of a specific certificate by its ID
* **Tags:** Certificates
* **Parameters:**

  * `id` (path, integer, required): Certificate ID
* **Responses:**

  * `200 OK`: Returns certificate details

---

## Update a Certificate

**PUT** `/api/certificates/{id}`

* **Summary:** Update an existing certificate
* **Tags:** Certificates
* **Parameters:**

  * `id` (path, integer, required): Certificate ID
* **Request Body (all fields optional):**

```json
{
  "user_id": 1,
  "course_id": 2,
  "issued_at": "2025-05-23",
  "certificate_path": "/certificates/cert_123_updated.pdf"
}
```

* **Field validation:**

  * `user_id`: integer, must exist in users table
  * `course_id`: integer, must exist in courses table
  * `issued_at`: date string, nullable
  * `certificate_path`: string, max length 255
* **Responses:**

  * `200 OK`: Certificate updated successfully, returns updated certificate data

---

## Delete a Certificate

**DELETE** `/api/certificates/{id}`

* **Summary:** Delete a certificate by ID
* **Tags:** Certificates
* **Parameters:**

  * `id` (path, integer, required): Certificate ID
* **Responses:**

  * `200 OK`: Certificate deleted successfully

```
```
