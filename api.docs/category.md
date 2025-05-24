# Categories API Documentation

## Tags

- **Categories:** API Endpoints for managing categories

---

## Get All Categories

**GET** `/api/categories`

- **Summary:** Retrieve a list of all categories
- **Tags:** Categories
- **Responses:**
  - `200 OK`: Returns list of categories
  - `404 Not Found`: No categories found

---

## Create a New Category

**POST** `/api/categories`

- **Summary:** Create a new category
- **Tags:** Categories
- **Request Body:**

```json
{
  "name": "Science",
  "description": "All science-related content"
}
````

* **Required fields:** `name`
* **Field Details:**

  * `name` (string): max length 255
  * `description` (string, optional)
* **Responses:**

  * `201 Created`: Category created successfully, returns created category data
  * `422 Unprocessable Entity`: Validation error

---

## Get Category by ID

**GET** `/api/categories/{id}`

* **Summary:** Retrieve details of a specific category by its ID
* **Tags:** Categories
* **Parameters:**

  * `id` (path, integer, required): Category ID
* **Responses:**

  * `200 OK`: Returns category details
  * `404 Not Found`: Category not found

---

## Update a Category

**PUT** `/api/categories/{id}`

* **Summary:** Update an existing category
* **Tags:** Categories
* **Parameters:**

  * `id` (path, integer, required): Category ID
* **Request Body (all fields optional):**

```json
{
  "name": "Math",
  "description": "Mathematics courses"
}
```

* **Field validation:**

  * `name`: string, max length 255
  * `description`: string or null
* **Responses:**

  * `200 OK`: Category updated successfully, returns updated category data
  * `422 Unprocessable Entity`: Validation error

---

## Delete a Category

**DELETE** `/api/categories/{id}`

* **Summary:** Delete a category by ID
* **Tags:** Categories
* **Parameters:**

  * `id` (path, integer, required): Category ID
* **Responses:**

  * `200 OK`: Category deleted successfully
  * `404 Not Found`: Category not found

```
```
