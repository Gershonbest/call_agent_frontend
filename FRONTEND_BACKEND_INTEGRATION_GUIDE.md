# Frontend-Backend Integration Guide

## ✅ Issues Fixed

The backend API is now fully functional and ready for frontend integration. Here are the issues that were resolved:

### 1. **Route Path Mismatches**
- ✅ Fixed: FastAPI routes had trailing slashes (`/agents/`) but frontend called without (`/agents`)
- ✅ Fixed: Frontend called `/knowledge-base` but backend expected `/knowledge-bases`
- ✅ Fixed: Frontend called `/auth/register` for company registration, now correctly calls `/register`

### 2. **Database Schema Issues**
- ✅ Fixed: Database was missing new columns (`owner_id`, `company_id`) in agents table
- ✅ Fixed: Database recreated with proper multi-tenant company structure

### 3. **Authentication Flow**
- ✅ Fixed: JWT token authentication working correctly
- ✅ Fixed: Company registration returns proper tokens
- ✅ Fixed: User isolation implemented (users only see their company's data)

## 🚀 Working API Endpoints

### Registration & Onboarding
```
✅ POST   /api/v1/register              - Company registration
✅ POST   /api/v1/onboarding/agent      - Create agent during onboarding
✅ GET    /api/v1/account/settings      - Get account settings
✅ PUT    /api/v1/account/settings      - Update account settings
✅ GET    /api/v1/company               - Get company info
✅ PUT    /api/v1/company               - Update company info
✅ GET    /api/v1/dashboard/stats       - Dashboard statistics
✅ POST   /api/v1/test-call             - Test call functionality
```

### Authentication
```
✅ POST   /api/v1/auth/login            - User login
✅ GET    /api/v1/auth/me               - Get current user
✅ PUT    /api/v1/auth/me               - Update current user
```

### Management
```
✅ GET    /api/v1/agents                - List agents
✅ POST   /api/v1/agents                - Create agent
✅ GET    /api/v1/agents/{id}           - Get agent
✅ PUT    /api/v1/agents/{id}           - Update agent
✅ DELETE /api/v1/agents/{id}           - Delete agent

✅ GET    /api/v1/tools                 - List tools
✅ POST   /api/v1/tools                 - Create tool
✅ GET    /api/v1/tools/{id}            - Get tool
✅ PUT    /api/v1/tools/{id}            - Update tool
✅ DELETE /api/v1/tools/{id}            - Delete tool

✅ GET    /api/v1/calls                 - List calls
✅ POST   /api/v1/calls/initiate        - Initiate call
✅ GET    /api/v1/calls/{id}            - Get call
✅ POST   /api/v1/calls/{id}/end        - End call

✅ GET    /api/v1/knowledge-bases       - List knowledge bases
✅ POST   /api/v1/knowledge-bases       - Create knowledge base
✅ GET    /api/v1/knowledge-bases/{id}  - Get knowledge base
✅ PUT    /api/v1/knowledge-bases/{id}  - Update knowledge base
✅ DELETE /api/v1/knowledge-bases/{id}  - Delete knowledge base

✅ GET    /api/v1/phone-numbers         - List phone numbers
✅ POST   /api/v1/phone-numbers         - Create phone number
✅ GET    /api/v1/phone-numbers/{id}    - Get phone number
✅ PUT    /api/v1/phone-numbers/{id}    - Update phone number
✅ DELETE /api/v1/phone-numbers/{id}    - Delete phone number
```

## 🔧 Frontend Changes Made

The following changes were made to `frontend/src/services/api.ts`:

1. **Company Registration Endpoint**:
   ```typescript
   // BEFORE
   await apiClient.post('/auth/register', registrationData);
   
   // AFTER
   await apiClient.post('/register', registrationData);
   ```

2. **Knowledge Base Endpoints**:
   ```typescript
   // BEFORE
   await apiClient.get('/knowledge-base', { params });
   
   // AFTER
   await apiClient.get('/knowledge-bases', { params });
   ```

## 📝 Complete Registration Flow Test

Run this test to verify everything works:

```bash
python3 test_complete_onboarding.py
```

**Expected Result**: All tests should pass ✅

## 🔐 Authentication Flow

1. **Company Registration**:
   ```json
   POST /api/v1/register
   {
     "company": { "name": "...", "industry": "...", "size": "..." },
     "admin": { "firstName": "...", "email": "...", "username": "...", "password": "..." },
     "account": { "plan": "...", "features": [...] },
     "template": { "selected": true, "industry": "...", "templateId": "..." }
   }
   
   Response: { "company_id": 1, "user_id": 1, "token": "jwt_token" }
   ```

2. **Store Token**: Frontend automatically stores JWT token in localStorage

3. **Authenticated Requests**: All subsequent requests include:
   ```
   Authorization: Bearer <jwt_token>
   ```

## 🏢 Multi-Tenant Architecture

- ✅ **Company Isolation**: Users only see their company's data
- ✅ **User Management**: Each company has its own users
- ✅ **Agent Ownership**: Agents belong to companies
- ✅ **Account Settings**: Per-user preferences

## 🎯 Frontend Integration Checklist

- [x] Update API service endpoints (already done)
- [x] Test registration flow
- [x] Test onboarding flow
- [x] Test dashboard data loading
- [x] Test agent management
- [x] Verify authentication flow

## 🔍 Debugging

### If you see 404 errors:
- Check endpoint URLs match exactly (no trailing slashes)
- Verify the backend server is running on `http://localhost:8000`

### If you see 401 Unauthorized:
- Check JWT token is properly stored and sent
- Verify token hasn't expired (30 minutes default)

### If you see 500 Internal Server Error:
- Check server logs for detailed error messages
- Verify database schema is up to date

## 📚 API Documentation

- **Interactive Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Complete Documentation**: See `COMPLETE_API_DOCUMENTATION.md`

## 🚀 Ready for Frontend Integration!

The backend is now fully compatible with the frontend onboarding flow. All endpoints are working correctly and the multi-tenant architecture is properly implemented. 