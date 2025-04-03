# API Documentation

## Endpoint: `/users/register`

### Description

This endpoint is used to register a new user in the system. It validates the input data and creates a new user record in the database.

### Method

`POST`

### Request Body

The following fields are required in the request body:

| Field                | Type   | Required | Description                                              |
| -------------------- | ------ | -------- | -------------------------------------------------------- |
| `email`              | String | Yes      | Must be a valid email address.                           |
| `fullname.firstname` | String | Yes      | Must be at least 3 characters long.                      |
| `fullname.lastname`  | String | No       | Optional, but must be at least 3 characters if provided. |
| `password`           | String | Yes      | Must be at least 6 characters long.                      |

### Example Request Body

```json
{
  "email": "example@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "securepassword"
}
```

### Response

#### Success (201 Created)

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "unique_user_id",
    "email": "example@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    }
  }
}
```

#### Error (400 Bad Request)

```json
{
  "error": "Validation failed",
  "details": [
    "Invalid Email",
    "First name must be at least 3 characters",
    "Password must be at least 6 characters"
  ]
}
```

#### Error (500 Internal Server Error)

```json
{
  "error": "An unexpected error occurred"
}
```

### Notes

- Ensure that the `email` field is unique.
- Passwords are hashed before being stored in the database.
- The `socketId` field is optional and can be updated later.
