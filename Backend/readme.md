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

## Endpoint: `/users/login`

### Description

This endpoint is used to authenticate a user and provide a JWT token for subsequent requests.

### Method

`POST`

### Request Body

The following fields are required in the request body:

| Field      | Type   | Required | Description                         |
| ---------- | ------ | -------- | ----------------------------------- |
| `email`    | String | Yes      | Must be a valid email address.      |
| `password` | String | Yes      | Must be at least 6 characters long. |

### Example Request Body

```json
{
  "email": "example@example.com",
  "password": "securepassword"
}
```

### Response

#### Success (200 OK)

```json
{
  "token": "jwt_token_here",
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
  "details": ["Invalid Email", "Password must be at least 6 characters"]
}
```

#### Error (401 Unauthorized)

```json
{
  "error": "Invalid email or password"
}
```

#### Error (500 Internal Server Error)

```json
{
  "error": "An unexpected error occurred"
}
```

### Notes

- Ensure the `email` exists in the database.
- Passwords are compared securely using hashing.
- The returned JWT token should be included in the `Authorization` header for protected routes.

---

## Endpoint: `/users/profile`

### Description

This endpoint is used to retrieve the profile of the currently authenticated user.

### Method

`GET`

### Headers

| Header          | Type   | Required | Description                      |
| --------------- | ------ | -------- | -------------------------------- |
| `Authorization` | String | Yes      | Bearer token for authentication. |

### Response

#### Success (200 OK)

```json
{
  "id": "unique_user_id",
  "email": "example@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  }
}
```

#### Error (401 Unauthorized)

```json
{
  "error": "Unauthorized: No token provided"
}
```

#### Error (500 Internal Server Error)

```json
{
  "error": "An unexpected error occurred"
}
```

### Notes

- Requires a valid JWT token in the `Authorization` header.
- The token must not be blacklisted.

---

## Endpoint: `/users/logout`

### Description

This endpoint is used to log out the currently authenticated user by clearing the authentication token.

### Method

`GET`

### Headers

| Header          | Type   | Required | Description                      |
| --------------- | ------ | -------- | -------------------------------- |
| `Authorization` | String | Yes      | Bearer token for authentication. |

### Response

#### Success (200 OK)

```json
{
  "message": "Logout successful"
}
```

#### Error (401 Unauthorized)

```json
{
  "error": "Unauthorized: No token provided"
}
```

#### Error (500 Internal Server Error)

```json
{
  "error": "An unexpected error occurred"
}
```

### Notes

- Requires a valid JWT token in the `Authorization` header.
- The token is cleared from cookies and can no longer be used.

---

# Captain Routes Documentation

## Endpoint: `/captain/register`

### Description

This endpoint is used to register a new captain in the system. It validates the input data and creates a new captain record in the database.

### Method

`POST`

### Request Body

The following fields are required in the request body:

| Field                 | Type   | Required | Description                                              |
| --------------------- | ------ | -------- | -------------------------------------------------------- |
| `email`               | String | Yes      | Must be a valid email address.                           |
| `fullname.firstname`  | String | Yes      | Must be at least 3 characters long.                      |
| `fullname.lastname`   | String | No       | Optional, but must be at least 3 characters if provided. |
| `password`            | String | Yes      | Must be at least 6 characters long.                      |
| `vehicle.color`       | String | Yes      | Must be at least 3 characters long.                      |
| `vehicle.plate`       | String | Yes      | Must be at least 3 characters long.                      |
| `vehicle.capacity`    | Number | Yes      | Must be at least 1.                                      |
| `vehicle.vehicleType` | String | Yes      | Must be either `car`, `bike`, or `auto`.                 |

### Example Request Body

```json
{
  "email": "captain@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "securepassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Response

#### Success (201 Created)

```json
{
  "message": "Captain registered successfully",
  "captain": {
    "id": "unique_captain_id",
    "email": "captain@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
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
    "Password must be at least 6 characters",
    "Vehicle type must be either car, bike or auto"
  ]
}
```

#### Error (500 Internal Server Error)

```json
{
  "error": "An unexpected error occurred"
}
```

---

## Endpoint: `/captain/login`

### Description

This endpoint is used to authenticate a captain and provide a JWT token for subsequent requests.

### Method

`POST`

### Request Body

The following fields are required in the request body:

| Field      | Type   | Required | Description                         |
| ---------- | ------ | -------- | ----------------------------------- |
| `email`    | String | Yes      | Must be a valid email address.      |
| `password` | String | Yes      | Must be at least 6 characters long. |

### Example Request Body

```json
{
  "email": "captain@example.com",
  "password": "securepassword"
}
```

### Response

#### Success (200 OK)

```json
{
  "token": "jwt_token_here",
  "captain": {
    "id": "unique_captain_id",
    "email": "captain@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### Error (400 Bad Request)

```json
{
  "error": "Validation failed",
  "details": ["Invalid Email", "Password must be at least 6 characters"]
}
```

#### Error (401 Unauthorized)

```json
{
  "error": "Invalid email or password"
}
```

#### Error (500 Internal Server Error)

```json
{
  "error": "An unexpected error occurred"
}
```

---

## Endpoint: `/captain/profile`

### Description

This endpoint is used to retrieve the profile of the currently authenticated captain.

### Method

`GET`

### Headers

| Header          | Type   | Required | Description                      |
| --------------- | ------ | -------- | -------------------------------- |
| `Authorization` | String | Yes      | Bearer token for authentication. |

### Response

#### Success (200 OK)

```json
{
  "captain": {
    "id": "unique_captain_id",
    "email": "captain@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### Error (401 Unauthorized)

```json
{
  "error": "Unauthorized: No token provided"
}
```

#### Error (500 Internal Server Error)

```json
{
  "error": "An unexpected error occurred"
}
```

---

## Endpoint: `/captain/logout`

### Description

This endpoint is used to log out the currently authenticated captain by blacklisting the authentication token.

### Method

`GET`

### Headers

| Header          | Type   | Required | Description                      |
| --------------- | ------ | -------- | -------------------------------- |
| `Authorization` | String | Yes      | Bearer token for authentication. |

### Response

#### Success (200 OK)

```json
{
  "message": "Logout successful"
}
```

#### Error (401 Unauthorized)

```json
{
  "error": "Unauthorized: No token provided"
}
```

#### Error (500 Internal Server Error)

```json
{
  "error": "An unexpected error occurred"
}
```

---

### Notes

- Ensure that the `email` field is unique for registration.
- Passwords are hashed before being stored in the database.
- The token must not be blacklisted for protected routes.
