
---

## Roles API

### `GET /api/roles`

**Summary:** Get list of all roles
**Tags:** Roles
**Responses:**

* `200 OK` – List of roles

---

### `GET /api/roles/{id}`

**Summary:** Get a single role
**Tags:** Roles
**Parameters:**

* `id` (in `path`, required, `integer`) — Role ID

**Responses:**

* `200 OK` – Role details
* `404 Not Found` – Role not found

---

### `POST /api/roles`

**Summary:** Create a new role
**Tags:** Roles
**Request Body:**

```json
{
  "name": "string",
  "description": "string"
}
```

* Required fields: `name`

**Responses:**

* `201 Created` – Role created
* `422 Unprocessable Entity` – Validation failed

---

### `PUT /api/roles/{id}`

**Summary:** Update an existing role
**Tags:** Roles
**Parameters:**

* `id` (in `path`, required, `integer`) — Role ID

**Request Body:**

```json
{
  "name": "string",
  "description": "string"
}
```

**Responses:**

* `200 OK` – Role updated
* `404 Not Found` – Role not found

---

### `DELETE /api/roles/{id}`

**Summary:** Delete a role
**Tags:** Roles
**Parameters:**

* `id` (in `path`, required, `integer`) — Role ID

**Responses:**

* `200 OK` – Role deleted
* `404 Not Found` – Role not found

---


