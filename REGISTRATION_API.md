# Registration API Documentation

This document describes the authentication and registration API endpoints for the Voice Agent Platform.

## Base URL
```
http://localhost:8000/api/v1/auth
```

## Endpoints

### 1. Register User
**POST** `/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "full_name": "Full Name",
  "password": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "username",
  "full_name": "Full Name",
  "is_active": true,
  "is_superuser": false,
  "created_at": "2024-01-01T00:00:00",
  "updated_at": null
}
```

**Validation Rules:**
- Email must be a valid email format
- Username must be unique
- Email must be unique
- Password must be at least 8 characters long

### 2. Login User
**POST** `/login`

Authenticate a user and receive an access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

### 3. OAuth2 Login (for Swagger UI)
**POST** `/login/form`

Login using OAuth2 form data (compatible with Swagger UI).

**Form Data:**
- `username`: Email address
- `password`: Password

### 4. Get Current User
**GET** `/me`

Get information about the currently authenticated user.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "username",
  "full_name": "Full Name",
  "is_active": true,
  "is_superuser": false,
  "created_at": "2024-01-01T00:00:00",
  "updated_at": null
}
```

### 5. Update Current User
**PUT** `/me`

Update the current user's information.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "email": "newemail@example.com",
  "username": "newusername",
  "full_name": "New Full Name",
  "password": "newpassword123"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "email": "newemail@example.com",
  "username": "newusername",
  "full_name": "New Full Name",
  "is_active": true,
  "is_superuser": false,
  "created_at": "2024-01-01T00:00:00",
  "updated_at": "2024-01-01T01:00:00"
}
```

### 6. Password Reset Request
**POST** `/password-reset`

Request a password reset (placeholder implementation).

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200 OK):**
```json
{
  "message": "If the email exists, a password reset link has been sent"
}
```

### 7. Password Reset Confirm
**POST** `/password-reset/confirm`

Confirm password reset with token (placeholder implementation).

**Request Body:**
```json
{
  "token": "reset_token_here",
  "new_password": "newpassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Password reset successful"
}
```

## Superuser Endpoints

The following endpoints require superuser privileges:

### 8. List All Users
**GET** `/users`

Get a list of all users (superuser only).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `skip`: Number of records to skip (default: 0)
- `limit`: Number of records to return (default: 100)

### 9. Get User by ID
**GET** `/users/{user_id}`

Get a specific user by ID (superuser only).

### 10. Update User
**PUT** `/users/{user_id}`

Update a specific user (superuser only).

### 11. Delete User
**DELETE** `/users/{user_id}`

Delete a specific user (superuser only).

## Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <access_token>
```

## Error Responses

### 400 Bad Request
```json
{
  "detail": "Email already registered"
}
```

### 401 Unauthorized
```json
{
  "detail": "Could not validate credentials"
}
```

### 403 Forbidden
```json
{
  "detail": "Not enough permissions"
}
```

### 404 Not Found
```json
{
  "detail": "User not found"
}
```

## Environment Variables

The following environment variables can be configured:

- `SECRET_KEY`: JWT secret key (default: "your-secret-key-change-in-production")
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration time in minutes (default: 30)

## Security Features

1. **Password Hashing**: Passwords are hashed using bcrypt
2. **JWT Tokens**: Secure token-based authentication
3. **Email Validation**: Email addresses are validated using Pydantic
4. **Password Strength**: Minimum 8 characters required
5. **Unique Constraints**: Email and username must be unique
6. **User Isolation**: Users can only access their own resources

## Testing

Run the test script to verify the API functionality:

```bash
python test_registration.py
```

Make sure the FastAPI server is running on `http://localhost:8000` before running the tests. 