# StageFund Backend Architecture

## 1. Backend Overview

### Purpose

This document defines the backend architecture of the StageFund platform. It describes how requests are processed, how business logic is organized, how data flows through different backend layers, and how the backend communicates with the database.

The backend architecture is designed to provide:

- Clean Code Organization
- Scalability
- Maintainability
- Security
- Performance
- Reusability
- Separation of Responsibilities

Every architectural decision in this document is derived from the approved:

- Business Requirements Document (BRD)
- Application Workflow
- Database Design
- API Design

---

### Backend Responsibilities

The backend is responsible for:

- User Authentication
- User Authorization
- Profile Verification
- Project Management
- Investment Processing
- Wallet Management
- Financial Transactions
- Support Ticket Management
- Notification Management
- Business Rule Validation
- Database Communication
- API Response Management
- Security Enforcement

---

### Backend Design Goals

- Maintain a modular architecture.
- Keep business logic independent from API routes.
- Keep database operations isolated from business logic.
- Reuse common services across modules.
- Support future feature expansion.
- Maintain secure financial operations.
- Ensure data consistency across all modules.

---

### Backend Flow

Client Request

↓

Route

↓

Middlewares

↓

Controller

↓

Service

↓

Repository

↓

Database

↓

Repository

↓

Service

↓

Controller

↓

API Response

↓

Client

---

### Architecture Principles

- Single Responsibility Principle
- Separation of Concerns
- Layered Architecture
- REST API Architecture
- Role-Based Access Control (RBAC)
- Secure by Design
- Modular Development
- Reusable Components
---------------------------------------------------------------

## 2. Technology Stack

### Purpose

This section defines the complete backend technology stack used to develop the StageFund platform. All backend components are selected to ensure scalability, security, maintainability, and production readiness.

The technology stack is finalized before implementation and will remain consistent across the project unless officially revised.

---

## Runtime Environment

### Node.js

Purpose

- Executes JavaScript on the server.
- Handles asynchronous operations.
- Manages backend execution.

---

## Backend Framework

### Express.js

Purpose

- Builds REST APIs.
- Handles routing.
- Supports middleware architecture.
- Simplifies backend development.

---

## Database

### MongoDB

Purpose

- Stores application data.
- Provides flexible document-based storage.
- Supports scalable architecture.

---

## ODM (Object Document Mapper)

### Mongoose

Purpose

- Connects Express.js with MongoDB.
- Defines database schemas.
- Performs data validation.
- Manages relationships between collections.

---

## Request Validation

### Zod

Purpose

- Validates request body.
- Validates query parameters.
- Validates route parameters.
- Prevents invalid data before business logic execution.

---

## Authentication

### JSON Web Token (JWT)

Purpose

- Authenticates users.
- Protects secured APIs.
- Maintains user sessions.

Authentication Strategy

- Access Token
- Refresh Token

---

## Password Security

### Argon2

Purpose

- Hashes user passwords.
- Prevents password exposure.
- Provides secure password verification.

---

## File Upload

### Multer

Purpose

- Receives uploaded files from client requests.
- Validates uploaded files before processing.

---

### Cloudinary

Purpose

- Stores uploaded files securely in cloud storage.
- Returns secure file URLs.
- Eliminates dependency on local server storage.

---

## Logging

### Pino

Purpose

- Records application logs.
- Tracks financial operations.
- Records authentication events.
- Logs unexpected system errors.

---

## Environment Configuration

### dotenv

Purpose

- Manages environment variables.
- Protects sensitive configuration.
- Keeps secrets outside source code.

---

## API Documentation

### Swagger

Purpose

- Documents REST APIs.
- Provides API testing interface.
- Simplifies frontend-backend integration.

---

## Package Management

### npm

Purpose

- Installs project dependencies.
- Manages packages.
- Handles project scripts.

---

## Version Control

### Git

Purpose

- Tracks source code changes.
- Supports collaborative development.

---

### GitHub

Purpose

- Hosts source code repositories.
- Manages version history.
- Supports team collaboration.

---

## Technology Stack Summary

| Layer | Technology |
|--------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Validation | Zod |
| Authentication | JWT |
| Password Hashing | Argon2 |
| File Upload | Multer + Cloudinary |
| Logging | Pino |
| Environment | dotenv |
| API Documentation | Swagger |
| Package Manager | npm |
| Version Control | Git + GitHub |

---

## Technology Selection Principles

- Production-ready technologies only.
- Industry-standard libraries.
- Secure by default.
- Highly maintainable.
- Easily scalable.
- Strong community support.
- Long-term compatibility.
-------------------------------------------------------------

## 3. Backend Architecture Pattern

### Purpose

This section defines the complete backend technology stack used to develop the StageFund platform. All backend components are selected to ensure scalability, security, maintainability, and production readiness.

The technology stack is finalized before implementation and will remain consistent across the project unless officially revised.

---

## Runtime Environment

### Node.js

Purpose

- Executes JavaScript on the server.
- Handles asynchronous operations.
- Manages backend execution.

---

## Backend Framework

### Express.js

Purpose

- Builds REST APIs.
- Handles routing.
- Supports middleware architecture.
- Simplifies backend development.

---

## Database

### MongoDB

Purpose

- Stores application data.
- Provides flexible document-based storage.
- Supports scalable architecture.

---

## ODM (Object Document Mapper)

### Mongoose

Purpose

- Connects Express.js with MongoDB.
- Defines database schemas.
- Performs data validation.
- Manages relationships between collections.

---

## Request Validation

### Zod

Purpose

- Validates request body.
- Validates query parameters.
- Validates route parameters.
- Prevents invalid data before business logic execution.

---

## Authentication

### JSON Web Token (JWT)

Purpose

- Authenticates users.
- Protects secured APIs.
- Maintains user sessions.

Authentication Strategy

- Access Token
- Refresh Token

---

## Password Security

### Argon2

Purpose

- Hashes user passwords.
- Prevents password exposure.
- Provides secure password verification.

---

## File Upload

### Multer

Purpose

- Receives uploaded files from client requests.
- Validates uploaded files before processing.

---

### Cloudinary

Purpose

- Stores uploaded files securely in cloud storage.
- Returns secure file URLs.
- Eliminates dependency on local server storage.

---

## Logging

### Pino

Purpose

- Records application logs.
- Tracks financial operations.
- Records authentication events.
- Logs unexpected system errors.

---

## Environment Configuration

### dotenv

Purpose

- Manages environment variables.
- Protects sensitive configuration.
- Keeps secrets outside source code.

---

## API Documentation

### Swagger

Purpose

- Documents REST APIs.
- Provides API testing interface.
- Simplifies frontend-backend integration.

---

## Package Management

### npm

Purpose

- Installs project dependencies.
- Manages packages.
- Handles project scripts.

---

## Version Control

### Git

Purpose

- Tracks source code changes.
- Supports collaborative development.

---

### GitHub

Purpose

- Hosts source code repositories.
- Manages version history.
- Supports team collaboration.

---

## Technology Stack Summary

| Layer | Technology |
|--------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Validation | Zod |
| Authentication | JWT |
| Password Hashing | Argon2 |
| File Upload | Multer + Cloudinary |
| Logging | Pino |
| Environment | dotenv |
| API Documentation | Swagger |
| Package Manager | npm |
| Version Control | Git + GitHub |

---

## Technology Selection Principles

- Production-ready technologies only.
- Industry-standard libraries.
- Secure by default.
- Highly maintainable.
- Easily scalable.
- Strong community support.
- Long-term compatibility.
------------------------------------------------------------

## 4. Request Lifecycle

### Purpose

This section defines the complete lifecycle of an API request within the StageFund backend. It explains how every client request flows through different backend layers before reaching the database and how the response is returned to the client.

The Request Lifecycle ensures that every request is processed securely, consistently, and according to the approved business rules.

---

## Standard Request Lifecycle

Client Request

↓

Express Route

↓

Authentication Middleware

↓

Authorization Middleware

↓

Validation Middleware

↓

Controller

↓

Service

↓

Repository

↓

Mongoose Model

↓

MongoDB

↓

Repository

↓

Service

↓

Controller

↓

Response Formatter

↓

Client Response

---

## Step 1 — Client Request

Purpose

- The Frontend sends an HTTP request.
- Request contains:
  - HTTP Method
  - API Endpoint
  - Headers
  - Parameters
  - Request Body (If Applicable)

Example

Customer clicks **Invest Now**.

Frontend sends:

POST /api/v1/customer/investments

---

## Step 2 — Route Layer

Purpose

- Matches the incoming endpoint.
- Applies required middlewares.
- Passes the request to the correct Controller.

Responsibilities

- Route Mapping
- Middleware Registration
- Controller Mapping

Does Not

- Execute Business Logic
- Access Database

---

## Step 3 — Authentication Middleware

Purpose

- Validates the Access Token.
- Confirms the user is authenticated.

Checks

- Token Exists
- Token Is Valid
- Token Is Not Expired
- User Exists

If Validation Fails

↓

Return Unauthorized Response

Request Stops Here.

---

## Step 4 — Authorization Middleware

Purpose

- Verifies whether the authenticated user has permission to access the requested API.

Checks

- User Role
- Resource Ownership
- API Permission

If Authorization Fails

↓

Return Forbidden Response

Request Stops Here.

---

## Step 5 — Validation Middleware

Purpose

- Validates all incoming data before business processing.

Validates

- Request Body
- Query Parameters
- Route Parameters
- Uploaded Files

If Validation Fails

↓

Return Validation Error

Request Stops Here.

---

## Step 6 — Controller Layer

Purpose

- Receives the validated request.
- Calls the appropriate Service.
- Returns the standardized API response.

Responsibilities

- Read Request
- Call Service
- Return Response

Does Not

- Execute Business Logic
- Perform Database Queries

---

## Step 7 — Service Layer

Purpose

- Executes all business logic.

Responsibilities

- Business Rule Validation
- Workflow Execution
- Financial Processing
- Module Coordination

Can Call

- One Repository
- Multiple Repositories

Does Not

- Access HTTP Objects
- Perform Direct Database Queries

---

## Step 8 — Repository Layer

Purpose

- Executes all database operations.

Responsibilities

- Read Data
- Insert Data
- Update Data
- Delete Data (Where Allowed)

Communicates Only With

- Mongoose Models

Contains

- No Business Logic

---

## Step 9 — Database Layer

Purpose

- Stores and retrieves application data.

Responsibilities

- Execute Queries
- Maintain Data Integrity
- Store Relationships
- Preserve Financial History

---

## Step 10 — Response Processing

Flow

Database

↓

Repository

↓

Service

↓

Controller

↓

Response Formatter

↓

Client

Purpose

- Converts the result into the standard API response format.
- Returns the appropriate HTTP Status Code.
- Prevents exposure of internal system information.

---

## Request Termination Points

A request may stop immediately if:

- Authentication Fails
- Authorization Fails
- Validation Fails
- Business Rule Validation Fails
- Database Operation Fails

Further processing must not continue after a failure.

---

## Lifecycle Principles

- Every request follows the same lifecycle.
- Validation always executes before business logic.
- Business logic always executes before database operations.
- Controllers remain lightweight.
- Services contain all business logic.
- Repositories contain all database logic.
- Every response follows the Common Response Structure.
------------------------------------------------------------

## 5. Folder Structure

### Purpose

This section defines the complete backend folder structure of the StageFund platform. The folder organization follows a Layered Architecture to ensure clean code organization, modular development, scalability, maintainability, and AI-assisted code generation.

Each folder has a single responsibility and should contain only related files.

---

## Backend Folder Structure

backend/

├── src/

│

├── config/

├── routes/

├── middlewares/

├── controllers/

├── services/

├── repositories/

├── models/

├── validators/

├── schemas/

├── utils/

├── constants/

├── helpers/

├── events/

├── jobs/

├── docs/

├── types/

├── database/

├── logs/

├── tests/

│

├── app.js

├── server.js

│

├── .env

├── .env.example

├── .gitignore

├── package.json

├── package-lock.json

├── README.md

---

## Folder Responsibilities

### config/

Stores application configuration.

Examples

- Database Configuration
- Cloudinary Configuration
- JWT Configuration
- Environment Configuration

---

### routes/

Contains all API route definitions.

Responsibilities

- Register Endpoints
- Apply Middlewares
- Connect Controllers

No business logic allowed.

---

### middlewares/

Contains reusable middleware.

Examples

- Authentication
- Authorization
- Validation
- Error Handler
- Logger

---

### controllers/

Handles HTTP Requests and Responses.

Responsibilities

- Read Request
- Call Service
- Return Response

No business logic.

---

### services/

Contains all business logic.

Responsibilities

- Execute Workflows
- Business Rules
- Financial Processing
- Module Coordination

---

### repositories/

Contains all database operations.

Responsibilities

- CRUD Operations
- Database Queries
- Mongoose Interaction

No business logic.

---

### models/

Contains all Mongoose Models.

Examples

- User
- Project
- Wallet
- Investment
- Notification

---

### validators/

Contains Zod validation schemas for API requests.

Examples

- Auth Validation
- Project Validation
- Investment Validation
- Wallet Validation

---

### schemas/

Contains reusable database and application schemas where required.

---

### utils/

Contains reusable utility functions.

Examples

- Token Generator
- Date Formatter
- Response Builder
- ID Generator

---

### constants/

Stores application constants.

Examples

- User Roles
- Project Status
- Wallet Status
- Notification Types
- Error Messages

---

### helpers/

Contains reusable helper functions.

Examples

- Financial Calculations
- Percentage Calculations
- Common Formatters

---

### events/

Contains application event definitions.

Examples

- Notification Events
- Investment Events
- Wallet Events

---

### jobs/

Contains scheduled background jobs.

Examples

- Notification Jobs
- Cleanup Jobs
- Scheduled Tasks

---

### docs/

Stores API documentation and technical documentation.

---

### types/

Stores shared application types and interfaces (future-ready for TypeScript).

---

### database/

Contains database initialization and connection logic.

---

### logs/

Stores application log files.

---

### tests/

Contains automated tests.

Examples

- Unit Tests
- Integration Tests
- API Tests

---

## Root Files

### app.js

Initializes the Express application.

---

### server.js

Starts the HTTP server.

---

### .env

Stores production environment variables.

---

### .env.example

Template for required environment variables.

---

### package.json

Defines project dependencies and scripts.

---

### README.md

Provides project documentation and setup instructions.

---

## Folder Structure Rules

- Every folder has a single responsibility.
- Business logic belongs only in the Service layer.
- Database operations belong only in the Repository layer.
- Controllers remain lightweight.
- Middlewares remain reusable.
- Configuration remains centralized.
- Utility functions remain framework-independent.
- Folder naming follows lowercase convention.
- File naming follows the project coding standards.
------------------------------------------------------------

## 6. Route Layer

### Purpose

The Route Layer is the entry point of every API request. It receives incoming HTTP requests, matches them to the appropriate endpoint, applies required middlewares, and forwards the request to the corresponding Controller.

The Route Layer contains no business logic and performs no database operations.

---

## Responsibilities

- Register API endpoints.
- Match incoming requests to Controllers.
- Apply Authentication Middleware.
- Apply Authorization Middleware.
- Apply Validation Middleware.
- Forward validated requests to Controllers.

---

## Route Flow

Client Request

↓

Express Route

↓

Authentication Middleware

↓

Authorization Middleware

↓

Validation Middleware

↓

Controller

---

## Route Organization

Routes follow a Feature-Based Architecture.

Example

routes/

├── auth/

├── customer/

├── owner/

├── admin/

├── project/

├── investment/

├── wallet/

├── notification/

├── support/

├── dashboard/

├── profile/

├── kyc/

---

## Route Responsibilities

Each Route file should only:

- Define API Endpoints.
- Attach Required Middlewares.
- Call the appropriate Controller.
- Export Express Router.

---

## Route Must NOT

- Execute Business Logic.
- Access MongoDB.
- Validate Business Rules.
- Perform Financial Calculations.
- Generate Notifications.
- Modify Database Records.

---

## Middleware Execution Order

Every protected API follows this sequence:

Authentication Middleware

↓

Authorization Middleware

↓

Validation Middleware

↓

Controller

---

## Public Routes

Examples

- Register
- Login
- Verify Email
- Verify Mobile

These routes do not require authentication.

---

## Protected Routes

Examples

- Wallet APIs
- Investment APIs
- Project APIs
- Dashboard APIs
- Support APIs

Authentication is mandatory.

---

## Route Naming Convention

Each feature has its own Route file.

Examples

auth.routes.js

customer.routes.js

owner.routes.js

admin.routes.js

project.routes.js

investment.routes.js

wallet.routes.js

notification.routes.js

support.routes.js

dashboard.routes.js

---

## Route Design Principles

- One Feature = One Route File.
- Keep Routes lightweight.
- Never duplicate endpoint definitions.
- Apply only required middlewares.
- Routes should only coordinate request flow.

---

## Route Layer Rules

- Routes communicate only with Controllers.
- Routes never communicate with Services.
- Routes never communicate with Repositories.
- Routes never communicate with MongoDB.
- Every Route must follow the approved API Design.
------------------------------------------------------------

## 7. Middleware Layer

### Purpose

The Middleware Layer is responsible for processing requests before they reach the Controller Layer. It performs authentication, authorization, request validation, file validation, logging, error handling, and other cross-cutting concerns.

Middlewares ensure that only valid and authorized requests reach the business logic.

---

## Middleware Execution Flow

Client Request

↓

Express Route

↓

Authentication Middleware

↓

Authorization Middleware

↓

Validation Middleware

↓

Upload Middleware (If Required)

↓

Rate Limiter Middleware (If Required)

↓

Controller

---

## Middleware Responsibilities

- Authenticate users.
- Authorize user roles.
- Validate request data.
- Validate uploaded files.
- Apply rate limiting.
- Log requests.
- Handle unexpected errors.
- Prevent unauthorized access.

---

## Middleware Organization

Middlewares follow a Feature-Independent Architecture.

Examples

middlewares/

├── authentication.middleware.js

├── authorization.middleware.js

├── validation.middleware.js

├── upload.middleware.js

├── rateLimiter.middleware.js

├── logger.middleware.js

├── error.middleware.js

---

## Authentication Middleware

Purpose

- Verify Access Token.
- Verify authenticated user.
- Attach authenticated user information to the request.

Responsibilities

- Validate JWT.
- Check token expiration.
- Reject invalid tokens.

Stops Request If

- Token Missing
- Token Invalid
- Token Expired

---

## Authorization Middleware

Purpose

- Verify user permissions.

Responsibilities

- Validate User Role.
- Validate resource ownership where applicable.
- Restrict unauthorized access.

Supported Roles

- Customer
- Owner
- Admin

Stops Request If

- Role mismatch.
- Unauthorized resource access.

---

## Validation Middleware

Purpose

- Validate incoming request data using Zod schemas.

Validates

- Request Body
- Query Parameters
- Route Parameters

Stops Request If

- Required fields missing.
- Invalid data types.
- Invalid formats.
- Validation failure.

---

## Upload Middleware

Purpose

- Process uploaded files.

Responsibilities

- Receive uploaded files.
- Validate supported formats.
- Validate file size.
- Prepare files for Cloudinary upload.

Stops Request If

- Unsupported format.
- File size exceeded.
- Empty upload.

---

## Rate Limiter Middleware

Purpose

- Prevent excessive API requests.

Responsibilities

- Limit repeated requests.
- Protect authentication APIs.
- Reduce abuse and automated attacks.

Stops Request If

- Request limit exceeded.

---

## Logger Middleware

Purpose

- Record request activity.

Logs

- Request Method
- API Endpoint
- Response Status
- Processing Time
- User ID (If Authenticated)

Sensitive information such as passwords, tokens, and uploaded document contents must never be logged.

---

## Error Middleware

Purpose

- Handle unexpected application errors.

Responsibilities

- Catch unhandled exceptions.
- Return standardized error responses.
- Prevent exposure of internal implementation details.
- Record errors using the logging system.

---

## Middleware Communication Rules

Middleware

↓

Controller

Only after successful execution.

Middlewares never communicate directly with:

- Services
- Repositories
- Database

---

## Middleware Design Principles

- One middleware performs one responsibility.
- Middlewares remain reusable.
- Middlewares remain independent.
- Business logic must never exist inside middleware.
- Middleware execution should stop immediately on failure.

---

## Middleware Layer Rules

- Authentication executes before Authorization.
- Authorization executes before Validation.
- Validation executes before Controller execution.
- Upload Middleware executes only for file upload APIs.
- Rate Limiter executes only where required.
- Error Middleware handles all unexpected application errors.
- Logger Middleware records request activity without exposing sensitive data.
--------------------------------------------------------------

## 8. Controller Layer

### Purpose

The Controller Layer acts as the bridge between the HTTP request and the Service Layer. It receives validated requests from the Route Layer, invokes the appropriate Service, and returns standardized API responses.

Controllers remain lightweight and never contain business logic or direct database operations.

---

## Controller Flow

Express Route

↓

Authentication Middleware

↓

Authorization Middleware

↓

Validation Middleware

↓

Controller

↓

Service

---

## Controller Responsibilities

- Receive validated HTTP requests.
- Extract request data.
- Call the appropriate Service.
- Return standardized API responses.
- Forward unexpected errors to the Error Middleware.

---

## Controller Organization

Controllers follow a Feature-Based Architecture.

Examples

controllers/

├── auth/

├── customer/

├── owner/

├── admin/

├── project/

├── investment/

├── wallet/

├── notification/

├── support/

├── dashboard/

├── profile/

├── kyc/

---

## Controller Input

Controllers may receive:

- Request Body
- Route Parameters
- Query Parameters
- Uploaded Files
- Authenticated User Information

---

## Controller Output

Controllers return:

- Success Response
- Error Response

All responses must follow the Common Response Structure.

---

## Controller Communication

Controller

↓

Service

Controllers communicate only with Services.

Controllers never communicate directly with:

- MongoDB
- Mongoose Models
- Repositories

---

## Controller Must

- Receive requests.
- Read request data.
- Call the correct Service.
- Return standardized responses.
- Pass unexpected errors to the Error Middleware.

---

## Controller Must NOT

- Execute business logic.
- Perform financial calculations.
- Validate business rules.
- Access MongoDB directly.
- Execute Mongoose queries.
- Generate JWT tokens directly.
- Upload files directly to Cloudinary.
- Send notifications directly.

---

## Error Handling

Controllers should never implement custom error handling.

Unexpected errors must be forwarded to the centralized Error Middleware.

---

## Controller Design Principles

- Keep Controllers lightweight.
- One Controller per Feature.
- One Responsibility per Controller.
- No duplicated request handling.
- Reuse common helper functions where applicable.

---

## Controller Layer Rules

- Controllers communicate only with Services.
- Controllers must remain framework-focused.
- Business rules belong only to the Service Layer.
- Database operations belong only to the Repository Layer.
- Every Controller must follow the approved API Design.
- Every Controller must return standardized API responses.
-------------------------------------------------------------

## 9. Service Layer

### Purpose

The Service Layer contains all business logic of the StageFund platform. It is responsible for executing workflows, enforcing business rules, coordinating multiple repositories, and managing application behavior.

The Service Layer acts as the central processing unit of the backend architecture.

---

## Service Flow

Controller

↓

Service

↓

Repository

---

## Service Responsibilities

- Execute business logic.
- Enforce business rules.
- Execute application workflows.
- Coordinate multiple repositories.
- Process financial operations.
- Trigger notifications.
- Return processed results to Controllers.

---

## Service Organization

Services follow a Feature-Based Architecture.

Examples

services/

├── auth/

├── customer/

├── owner/

├── admin/

├── project/

├── investment/

├── wallet/

├── notification/

├── support/

├── dashboard/

├── profile/

├── kyc/

---

## Service Communication

Service

↓

Repository

Services communicate only with Repositories.

Services never communicate directly with:

- MongoDB
- Mongoose Models
- Express Request
- Express Response

---

## Service Responsibilities by Feature

### Authentication Service

Responsibilities

- Register Users
- Verify Email
- Verify Mobile
- Login Users
- Logout Users
- Generate Access Tokens
- Generate Refresh Tokens

---

### Customer Service

Responsibilities

- Customer Dashboard
- Profile Management
- Investment Processing
- Wallet Operations
- Support Requests

---

### Owner Service

Responsibilities

- Project Creation
- Project Submission
- Project Updates
- Withdrawal Requests
- Owner Dashboard

---

### Admin Service

Responsibilities

- Verification Approval
- Project Approval
- Project Rejection
- Withdrawal Approval
- Platform Monitoring

---

### Project Service

Responsibilities

- Project Lifecycle
- Funding Progress
- Project Visibility
- Project Statistics

---

### Investment Service

Responsibilities

- Investment Validation
- Investment Processing
- Investment History
- Return Calculation

---

### Wallet Service

Responsibilities

- Wallet Balance
- Add Funds
- Customer Withdrawal
- Owner Withdrawal Processing
- Wallet Summary

---

### Notification Service

Responsibilities

- Generate Notifications
- Mark Notifications as Read
- Notification History

---

### Support Service

Responsibilities

- Ticket Creation
- Reply Processing
- Ticket Status
- Ticket History

---

### KYC Service

Responsibilities

- KYC Submission
- Verification Status
- Resubmission Processing

---

## Service May Coordinate Multiple Repositories

Example

Investment Service

↓

Wallet Repository

↓

Investment Repository

↓

Project Repository

↓

Notification Repository

This is allowed because business workflows often involve multiple modules.

---

## Service Must

- Execute business rules.
- Coordinate workflows.
- Validate business conditions.
- Process financial logic.
- Call one or more Repositories.
- Return processed results.

---

## Service Must NOT

- Read HTTP Requests.
- Return HTTP Responses.
- Execute Express Middleware.
- Access MongoDB directly.
- Execute Mongoose queries.
- Contain routing logic.

---

## Transaction Processing

For operations affecting multiple collections:

Example

Investment

↓

Wallet Update

↓

Investment Record

↓

Project Funding Update

↓

Notification

The Service Layer is responsible for coordinating the complete workflow to ensure consistency.

---

## Error Handling

Business validation failures are returned to the Controller.

Unexpected errors are forwarded to the centralized Error Middleware.

---

## Service Design Principles

- One Service per Feature.
- One Responsibility per Service.
- Reuse common business logic.
- Avoid duplicated business logic.
- Keep workflows modular.
- Maintain transaction consistency.

---

## Service Layer Rules

- Business logic belongs only in the Service Layer.
- Services communicate only with Repositories.
- Services never communicate directly with MongoDB.
- Services remain independent of Express.js.
- Every Service must follow the approved Business Rules.
- Every Service must follow the approved Workflow.
------------------------------------------------------------

## 10. Repository Layer

### Purpose

The Repository Layer is responsible for all database interactions within the StageFund backend. It acts as the only layer that communicates directly with Mongoose Models and MongoDB.

Repositories isolate database operations from business logic, ensuring clean architecture, maintainability, and easier testing.

---

## Repository Flow

Service

↓

Repository

↓

Mongoose Model

↓

MongoDB

---

## Repository Responsibilities

- Execute database queries.
- Create records.
- Read records.
- Update records.
- Delete records (Only Where Allowed).
- Return database results to the Service Layer.

---

## Repository Organization

Repositories follow a Feature-Based Architecture.

Examples

repositories/

├── auth/

├── customer/

├── owner/

├── admin/

├── project/

├── investment/

├── wallet/

├── notification/

├── support/

├── dashboard/

├── profile/

├── kyc/

---

## Repository Communication

Repository

↓

Mongoose Model

↓

MongoDB

Repositories communicate only with Mongoose Models.

Repositories never communicate directly with:

- Express Routes
- Middlewares
- Controllers
- Services (except returning data)
- HTTP Requests
- HTTP Responses

---

## Repository Responsibilities by Feature

### User Repository

Responsibilities

- Create User
- Find User
- Update User
- Delete User (Where Allowed)

---

### Project Repository

Responsibilities

- Create Project
- Update Project
- Retrieve Projects
- Retrieve Project Statistics

---

### Investment Repository

Responsibilities

- Create Investment
- Retrieve Investments
- Update Investment Records
- Retrieve Investment History

---

### Wallet Repository

Responsibilities

- Retrieve Wallet
- Update Wallet Balance
- Store Wallet Transactions
- Retrieve Wallet History

---

### Notification Repository

Responsibilities

- Create Notification
- Retrieve Notifications
- Mark Notification as Read

---

### Support Repository

Responsibilities

- Create Support Ticket
- Retrieve Support Tickets
- Update Ticket Status
- Store Ticket Replies

---

### KYC Repository

Responsibilities

- Store Verification Data
- Retrieve Verification Data
- Update Verification Status

---

## Repository Must

- Perform CRUD operations.
- Execute optimized database queries.
- Return database results.
- Handle query execution.

---

## Repository Must NOT

- Execute business logic.
- Perform financial calculations.
- Validate business rules.
- Read HTTP Requests.
- Return HTTP Responses.
- Generate JWT Tokens.
- Send Notifications.
- Execute workflow logic.

---

## Database Operations

Repositories may perform

- Create
- Read
- Update
- Delete (Where Allowed)
- Aggregation Queries
- Pagination Queries
- Filtering
- Sorting
- Search Operations

---

## Query Optimization

Repositories should

- Use indexes where applicable.
- Retrieve only required fields.
- Avoid unnecessary database queries.
- Minimize duplicate queries.
- Optimize aggregation pipelines.

---

## Transaction Support

Repositories participate in database transactions when coordinated by the Service Layer.

The Repository Layer must never independently control business transactions.

---

## Error Handling

Database-related errors are returned to the Service Layer.

Repositories must never generate API responses.

---

## Repository Design Principles

- One Repository per Feature.
- One Responsibility per Repository.
- Keep database logic isolated.
- Reuse common query methods.
- Maintain optimized database access.

---

## Repository Layer Rules

- Database access belongs only to the Repository Layer.
- Repositories communicate only with Mongoose Models.
- Repositories never contain business logic.
- Repositories remain independent of Express.js.
- Every Repository follows the approved Database Design.
-------------------------------------------------------------

## 11. Database Layer

### Purpose

The Database Layer is responsible for persistent data storage, data retrieval, relationship management, and maintaining data integrity across the StageFund platform.

The backend communicates with the database only through the Repository Layer using Mongoose Models.

---

## Database Technology

Database

↓

MongoDB

ODM (Object Document Mapper)

↓

Mongoose

---

## Database Communication Flow

Controller

↓

Service

↓

Repository

↓

Mongoose Model

↓

MongoDB

Direct database communication from any other layer is not allowed.

---

## Database Responsibilities

- Store application data.
- Retrieve application data.
- Maintain relationships.
- Preserve transaction history.
- Maintain data consistency.
- Support scalable data storage.

---

## Database Organization

The database consists of the collections defined in the approved Database Design document.

Examples

- Users
- Projects
- Investments
- Wallets
- Wallet Transactions
- Notifications
- Support Tickets
- Project Updates
- KYC Verifications
- Owner Profile Update Requests
- Owner Withdrawal Requests
- Admin Notes

---

## Mongoose Models

Every collection must have one corresponding Mongoose Model.

Examples

models/

├── user.model.js

├── project.model.js

├── investment.model.js

├── wallet.model.js

├── walletTransaction.model.js

├── notification.model.js

├── supportTicket.model.js

├── projectUpdate.model.js

├── kyc.model.js

---

## Schema Responsibilities

Each Mongoose Model is responsible for

- Schema Definition
- Field Validation
- Default Values
- References
- Index Definitions
- Timestamps

Business logic must never exist inside Mongoose Models.

---

## Relationships

Relationships between collections follow the approved Database Design.

Examples

- User → Wallet
- User → Projects
- Project → Investments
- Wallet → Wallet Transactions
- Project → Project Updates

Relationship implementation should use Mongoose References where appropriate.

---

## Data Integrity

The Database Layer must ensure

- Unique Email Address
- Unique Mobile Number
- Valid Collection References
- Required Fields
- Data Consistency

---

## Transactions

Multi-step financial operations should execute within database transactions.

Examples

- Investment Processing
- Wallet Updates
- Owner Withdrawals

The Service Layer coordinates transactions.

Repositories participate in transactions.

---

## Index Strategy

Indexes should be created for frequently queried fields.

Examples

- Email Address
- Mobile Number
- User Role
- Project Status
- Investment Status
- Wallet Transaction Date
- Notification Status

Indexes should improve read performance without unnecessary duplication.

---

## Timestamp Strategy

Every applicable collection should maintain

- Created At
- Updated At

Additional timestamps should be stored where required.

Examples

- Approved Date
- Rejected Date
- Published Date
- Closed Date

---

## Soft Delete Policy

The platform follows a Soft Delete approach wherever historical data must be preserved.

Examples

- Financial Records
- Investments
- Wallet Transactions
- Notifications
- Support Tickets

Permanent deletion should be avoided unless explicitly allowed by business rules.

---

## Database Security

- Sensitive data must be protected.
- Passwords are stored only as hashes.
- Uploaded document URLs are stored instead of local file paths.
- Internal metadata should never be exposed through APIs.

---

## Database Design Principles

- One Model per Collection.
- One Collection per Business Entity.
- Relationships remain consistent.
- Historical records are preserved.
- Financial records are immutable where required.
- Database structure follows the approved Database Design.

---

## Database Layer Rules

- Only the Repository Layer communicates with Mongoose Models.
- Models contain schema definitions only.
- Database operations must follow approved business rules.
- Transactions are coordinated by the Service Layer.
- Every collection follows the approved Database Design document.
-------------------------------------------------------------

## 12. Authentication Architecture

### Purpose

The Authentication Architecture defines how users securely register, verify their identity, log in, maintain authenticated sessions, access protected APIs, refresh authentication tokens, and log out from the StageFund platform.

Authentication is responsible only for verifying user identity.

Authorization is handled separately by the Authorization Architecture.

---

## Authentication Flow

User

↓

Register

↓

Email Verification

↓

Mobile Verification

↓

Login

↓

Password Verification

↓

Access Token + Refresh Token

↓

Protected APIs

↓

Logout

---

## Authentication Components

The Authentication system consists of

- User Registration
- Email Verification
- Mobile Verification
- Login
- Password Verification
- JWT Authentication
- Access Token
- Refresh Token
- Logout

---

## Registration Flow

User

↓

Select Role

(Customer / Owner)

↓

Enter

- Name
- Email Address
- Mobile Number
- Password

↓

Verify Email

↓

Verify Mobile Number

↓

Registration Completed

↓

Dashboard Access

↓

Complete Profile & KYC

Business Rules

- Email verification is mandatory.
- Mobile verification is mandatory.
- Password is securely hashed before storage.
- Duplicate Email Addresses are not allowed.
- Duplicate Mobile Numbers are not allowed.

---

## Login Flow

User

↓

Enter

- Email or Mobile Number
- Password

↓

Password Verification

↓

Generate Access Token

↓

Generate Refresh Token

↓

Return Authentication Response

---

## Password Verification

Passwords are verified using Argon2.

Passwords are never stored in plain text.

Passwords are never returned through APIs.

---

## Access Token

Purpose

- Authenticate protected API requests.

Characteristics

- Short-lived.
- Sent with every protected API request.
- Contains authenticated user information.

---

## Refresh Token

Purpose

- Generate a new Access Token after expiration.

Characteristics

- Longer lifetime than the Access Token.
- Used only for token renewal.
- Never used directly to access protected APIs.

---

## Protected API Flow

Client Request

↓

Access Token

↓

Authentication Middleware

↓

Token Validation

↓

Authenticated User

↓

Continue Request Processing

If token validation fails

↓

Unauthorized Response

---

## Logout Flow

User

↓

Logout Request

↓

Invalidate Authentication Session

↓

Authentication Completed

---

## Authentication Response

Successful authentication returns

- Authenticated User Information
- Access Token
- Refresh Token

Sensitive information must never be included.

---

## Authentication Failure

Authentication fails when

- Invalid Credentials
- Invalid Access Token
- Expired Access Token
- Missing Access Token
- Invalid Refresh Token

The request is rejected immediately.

---

## Authentication Security

- Passwords are hashed using Argon2.
- JWT is used for authentication.
- Access Tokens are validated before every protected request.
- Refresh Tokens are validated before issuing a new Access Token.
- Sensitive user information is never included in tokens.
- Authentication failures are logged.

---

## Authentication Design Principles

- Secure by Default.
- Stateless Authentication.
- Token-Based Authentication.
- Password Hashing.
- Minimal Token Payload.
- Standardized Authentication Responses.

---

## Authentication Architecture Rules

- Every protected API requires a valid Access Token.
- Every login generates a new Access Token and Refresh Token.
- Password verification is mandatory during login.
- Authentication must complete before Authorization.
- Authentication is independent of business logic.
-------------------------------------------------------------

## 13. Authorization Architecture (RBAC)

### Purpose

The Authorization Architecture defines how authenticated users are granted access to backend resources based on their assigned roles and permissions.

Authorization begins only after successful authentication.

The platform follows a Role-Based Access Control (RBAC) architecture with resource ownership validation where applicable.

---

## Authorization Flow

Client Request

↓

Authentication

↓

Authenticated User

↓

Authorization Middleware

↓

Role Validation

↓

Permission Validation

↓

Resource Ownership Validation (If Required)

↓

Controller

---

## Supported Roles

The platform supports the following primary user roles:

- Customer
- Owner
- Admin

The Administrative hierarchy consists of:

- Super Admin
- Sub Admin
- Admin

Each administrative level has different responsibilities and permissions.

---

## Customer Permissions

Customers are allowed to:

- Register
- Complete Profile
- Complete KYC
- View Stage Projects
- Invest in Stage Projects
- View Their Investments
- Manage Their Wallet
- View Their Notifications
- Create Support Tickets
- View Their Dashboard

Customers cannot:

- Create Projects
- Approve Projects
- Access Owner Resources
- Access Admin Resources
- View Other Customers' Data

---

## Owner Permissions

Owners are allowed to:

- Register
- Complete Profile
- Complete KYC
- Create Projects
- Submit Projects
- Publish Project Updates
- View Their Projects
- Request Withdrawals
- View Their Dashboard
- Create Support Tickets

Owners cannot:

- Approve Projects
- Verify Users
- Access Admin Resources
- View Other Owners' Data
- View Customer Financial Information

---

## Administrative Hierarchy

### Super Admin

Responsibilities

- Manage the complete platform.
- Create Sub Admin accounts.
- Create Admin accounts.
- Manage administrative permissions.
- Access all platform resources.

---

### Sub Admin

Responsibilities

- Supervise Admin operations.
- Review platform activities.
- Access assigned administrative resources.

Sub Admin permissions are controlled by the Super Admin.

---

### Admin

Responsibilities

- Verify Customer Profiles.
- Verify Owner Profiles.
- Review Projects.
- Approve or Reject Projects.
- Review Withdrawal Requests.
- Review Profile Update Requests.
- Manage Support Tickets.
- Monitor Platform Operations.

Admins cannot create or manage other Admin accounts.

---

## Resource Ownership Validation

The platform validates ownership before allowing access to protected resources.

Examples

Customer

↓

Own Wallet

Allowed

Customer

↓

Another Customer's Wallet

Denied

Owner

↓

Own Project

Allowed

Owner

↓

Another Owner's Project

Denied

---

## Authorization Middleware

The Authorization Middleware validates:

- User Role
- Assigned Permissions
- Resource Ownership (Where Applicable)

Only authorized requests proceed to the Controller Layer.

---

## Permission Strategy

Authorization is based on:

- User Role
- Resource Ownership
- Business Rules

Permission decisions are evaluated before executing business logic.

---

## Protected Resources

Authorization is required for:

- Wallet Operations
- Investment Operations
- Project Management
- Dashboard APIs
- Profile Management
- Notifications
- Support Tickets
- Administrative APIs

---

## Authorization Failure

Access is denied when:

- User Role is not permitted.
- User attempts to access another user's resources.
- Required permission is missing.
- Administrative privileges are insufficient.

The request is rejected immediately.

---

## Authorization Design Principles

- Least Privilege Principle.
- Role-Based Access Control (RBAC).
- Resource Ownership Protection.
- Permission Validation Before Business Logic.
- Administrative Hierarchy Enforcement.
- Secure by Default.

---

## Authorization Architecture Rules

- Authentication always executes before Authorization.
- Every protected API requires authorization.
- Users can access only resources permitted for their role.
- Resource ownership must be validated where applicable.
- Authorization decisions must complete before Controller execution.
- Administrative permissions follow the approved hierarchy.
--------------------------------------------------------------

## 14. Validation Architecture

### Purpose

The Validation Architecture defines how incoming requests are validated before entering the business logic.

Validation is performed immediately after Authentication and Authorization to ensure that only valid data reaches the Controller and Service layers.

The StageFund platform uses Zod as the standard validation library.

---

## Validation Flow

Client Request

↓

Authentication

↓

Authorization

↓

Validation Middleware

↓

Zod Schema Validation

↓

Controller

↓

Service

---

## Validation Responsibilities

The Validation Layer is responsible for:

- Request Body Validation
- Route Parameter Validation
- Query Parameter Validation
- File Validation
- Data Type Validation
- Required Field Validation
- Format Validation

Business validation is not performed here.

Business validation belongs to the Service Layer.

---

## Validation Organization

Validation files follow the Feature-Based Architecture.

Examples

validators/

├── auth/

├── customer/

├── owner/

├── admin/

├── project/

├── investment/

├── wallet/

├── notification/

├── support/

├── dashboard/

├── profile/

├── kyc/

---

## Validation Types

### Request Body Validation

Validates:

- Required Fields
- Data Types
- Field Length
- Value Constraints
- Allowed Values

---

### Route Parameter Validation

Validates:

- Resource IDs
- Route Parameters

---

### Query Parameter Validation

Validates:

- Pagination
- Search
- Filters
- Sorting

---

### File Validation

Validates:

- File Presence
- File Size
- File Format
- File Type

---

## Validation Responsibilities

Validation Layer MUST

- Validate request structure.
- Reject malformed requests.
- Validate required fields.
- Validate data formats.
- Return standardized validation errors.

Validation Layer MUST NOT

- Access MongoDB.
- Execute business logic.
- Verify business rules.
- Perform financial calculations.
- Generate notifications.

---

## Validation Communication

Validation Middleware

↓

Zod Schema

↓

Controller

Validation never communicates directly with:

- Services
- Repositories
- Database

---

## Validation Failure

If validation fails:

↓

Return Validation Error

↓

Stop Request Processing

Controller execution must not continue.

---

## Validation Design Principles

- Validate Early.
- Fail Fast.
- Keep Validation Independent.
- Reuse Validation Schemas.
- Maintain Consistent Validation Rules.

---

## Validation Architecture Rules

- Validation executes after Authentication.
- Validation executes after Authorization.
- Validation completes before Controller execution.
- Every API endpoint must have a validation schema.
- Validation errors follow the Common Response Structure.
- Business validation belongs only to the Service Layer.
-------------------------------------------------------------

## 15. File Upload Architecture

### Purpose

The File Upload Architecture defines how documents and images are securely received, validated, uploaded, stored, and referenced within the StageFund platform.

The platform uses Multer for receiving uploaded files and Cloudinary for secure cloud storage.

Uploaded files are never permanently stored on the application server.

---

## File Upload Flow

Client

↓

Express Route

↓

Authentication

↓

Authorization

↓

Validation

↓

Upload Middleware (Multer)

↓

Cloudinary

↓

File URL

↓

Repository

↓

MongoDB

↓

API Response

---

## Supported Upload Types

The platform supports uploading:

### Customer Documents

- Aadhaar Card
- PAN Card
- Bank Passbook / Cancelled Cheque
- Profile Photo (If Applicable)

---

### Owner Documents

- Aadhaar Card
- PAN Card
- Bank Passbook / Cancelled Cheque
- Business Documents (If Required)
- Profile Photo (If Applicable)

---

### Project Files

- Project Cover Image
- Additional Project Images (If Supported)

Future project documents may be added without changing the overall architecture.

---

## Upload Components

### Multer

Responsibilities

- Receive uploaded files.
- Parse multipart/form-data requests.
- Validate uploaded files.
- Forward valid files for cloud storage.

Multer does not permanently store files.

---

### Cloudinary

Responsibilities

- Securely store uploaded files.
- Generate secure file URLs.
- Optimize storage and delivery.
- Manage cloud-based file storage.

Only Cloudinary URLs are stored in MongoDB.

---

## Upload Validation

Every uploaded file is validated for:

- File Presence
- File Size
- File Type
- Supported Format

Invalid uploads are rejected before cloud upload.

---

## Supported File Formats

Images

- JPG
- JPEG
- PNG
- WEBP

Documents

- PDF

Additional formats may be introduced in future versions after approval.

---

## Upload Security

The upload system must:

- Reject unsupported file formats.
- Reject empty uploads.
- Reject oversized files.
- Validate authenticated users before upload.
- Prevent unauthorized document uploads.

---

## Storage Strategy

Application Server

↓

Temporary Upload (Multer)

↓

Cloudinary

↓

Secure File URL

↓

MongoDB

No permanent local storage is used.

---

## Database Storage

The database stores only:

- Cloudinary File URL
- Public File Identifier (If Required)

Binary file data is never stored inside MongoDB.

---

## File Access

Customers can access:

- Their own uploaded documents.

Owners can access:

- Their own uploaded documents.
- Their own project images.

Admins can access:

- Verification documents.
- Project-related files.
- Administrative upload resources.

Access follows the Authorization Architecture.

---

## File Replacement

When a document is updated:

- The new file is uploaded.
- The database reference is updated.
- Previous file handling follows the approved business rules.

---

## Error Handling

Upload fails when:

- Authentication fails.
- Authorization fails.
- Validation fails.
- Unsupported file format.
- File exceeds allowed size.
- Cloud upload fails.

The request stops immediately.

---

## File Upload Design Principles

- Cloud Storage First.
- No Permanent Local Storage.
- Secure File Access.
- Centralized Upload Validation.
- Reusable Upload Middleware.
- Consistent File Organization.

---

## File Upload Architecture Rules

- Multer receives uploaded files.
- Cloudinary permanently stores uploaded files.
- MongoDB stores only file references.
- Uploaded files require authentication.
- Upload validation executes before cloud upload.
- File access follows the Authorization Architecture.
---------------------------------------------------------------

## 16. Wallet Processing Architecture

### Purpose

The Wallet Processing Architecture defines how wallet balances, financial transactions, investments, and withdrawals are processed within the StageFund platform.

The architecture ensures financial accuracy, transaction consistency, auditability, and secure balance management.

All wallet operations must follow the approved Business Rules, Database Design, and Application Workflow.

---

## Wallet Processing Flow

Client

↓

Authentication

↓

Authorization

↓

Validation

↓

Controller

↓

Wallet Service

↓

Wallet Repository

↓

Wallet Model

↓

MongoDB

↓

API Response

---

## Wallet Types

The platform provides one wallet per user.

### Customer Wallet

Supports

- Wallet Balance
- Add Funds
- Investments
- Customer Withdrawals
- Transaction History

---

### Owner Wallet

Supports

- Withdrawable Balance
- Owner Withdrawals
- Transaction History

The Owner Wallet does not receive direct deposits from users.

Funds become withdrawable only after approved business workflows.

---

## Wallet Responsibilities

The Wallet System is responsible for:

- Maintaining Wallet Balance
- Recording Wallet Transactions
- Processing Investments
- Processing Withdrawals
- Maintaining Financial History
- Preserving Balance Consistency

---

## Wallet Balance Rules

The system must ensure:

- Wallet Balance never becomes negative.
- Withdrawable Balance never becomes negative.
- Every balance update creates a Wallet Transaction.
- Financial history remains immutable.

---

## Customer Wallet Flow

Customer

↓

Add Funds

↓

Wallet Balance Updated

↓

Wallet Transaction Created

↓

Investment

↓

Wallet Balance Deducted

↓

Investment Record Created

↓

Project Funding Updated

↓

Notification Generated

---

## Owner Wallet Flow

Project Becomes Live

↓

Withdrawable Balance Updated

↓

Owner Creates Withdrawal Request

↓

Admin Review

↓

Approved

↓

Withdrawable Balance Reduced

↓

Wallet Transaction Created

↓

Withdrawal Completed

---

## Wallet Transaction Flow

Every financial operation creates a Wallet Transaction.

Examples

- Add Funds
- Investment
- Customer Withdrawal
- Owner Withdrawal
- Refund (If Applicable)

Wallet Transactions are permanent financial records.

---

## Financial Consistency

The Wallet Service coordinates:

- Wallet Updates
- Investment Records
- Project Funding Updates
- Notifications

The complete workflow must succeed together to maintain financial consistency.

---

## Database Transactions

Operations involving multiple collections should execute within database transactions.

Examples

Investment

↓

Wallet Update

↓

Investment Record

↓

Project Update

↓

Notification

If any operation fails, the complete transaction should be rolled back.

---

## Wallet Security

The Wallet System must:

- Require Authentication.
- Require Authorization.
- Validate available balance.
- Validate withdrawable balance.
- Prevent duplicate financial operations.
- Record every financial activity.

---

## Wallet Communication

Wallet Controller

↓

Wallet Service

↓

Wallet Repository

↓

Wallet Model

↓

MongoDB

Business logic always remains inside the Wallet Service.

---

## Error Handling

Wallet operations fail when:

- Authentication fails.
- Authorization fails.
- Validation fails.
- Insufficient Wallet Balance.
- Insufficient Withdrawable Balance.
- Database Transaction Failure.

No partial financial updates are allowed.

---

## Wallet Design Principles

- One Wallet per User.
- Every Financial Operation Creates a Transaction.
- Financial History is Preserved.
- Business Logic Resides in the Service Layer.
- Database Consistency is Mandatory.
- Financial Operations Must Be Atomic.

---

## Wallet Processing Rules

- Every user owns only one wallet.
- Wallet Balance must always remain consistent.
- Every balance modification creates a Wallet Transaction.
- Owner withdrawals require Admin approval.
- Customer investments immediately update wallet balance.
- Financial operations must use database transactions.
- Financial records must never be modified outside approved workflows.
----------------------------------------------------------

## 17. Investment Processing Architecture

### Purpose

The Investment Processing Architecture defines how customer investments are securely validated, processed, recorded, and reflected across the StageFund platform.

The architecture ensures financial consistency, prevents duplicate investments, maintains accurate project funding, and guarantees transactional integrity.

Investment processing is one of the platform's core business workflows.

---

## Investment Processing Flow

Customer

↓

Authentication

↓

Authorization

↓

Validation

↓

Investment Controller

↓

Investment Service

↓

Wallet Repository

↓

Investment Repository

↓

Project Repository

↓

Notification Repository

↓

MongoDB Transaction

↓

API Response

---

## Investment Responsibilities

The Investment System is responsible for:

- Validating customer eligibility.
- Validating project eligibility.
- Validating investment amount.
- Processing wallet deduction.
- Creating investment records.
- Updating project funding.
- Triggering project status changes.
- Generating notifications.
- Maintaining complete investment history.

---

## Investment Validation

Before processing an investment, the system validates:

- Customer is authenticated.
- Customer profile is verified.
- Customer KYC is approved.
- Project exists.
- Project status is Stage.
- Investment amount meets the minimum investment requirement.
- Wallet balance is sufficient.

If any validation fails, the investment is rejected.

---

## Investment Processing Workflow

Customer

↓

Select Project

↓

Enter Investment Amount

↓

Validate Investment

↓

Validate Wallet Balance

↓

Begin Database Transaction

↓

Deduct Wallet Balance

↓

Create Investment Record

↓

Update Project Funding

↓

Check Funding Target

↓

Generate Notification

↓

Commit Database Transaction

↓

Return Success Response

---

## Project Funding Processing

Every successful investment updates:

- Current Funding Amount
- Total Number of Investors
- Funding Progress

The system recalculates project funding after every investment.

---

## Project Status Transition

If the funding target is not reached:

Stage

↓

Stage

No status change occurs.

---

If the funding target is reached:

Stage

↓

Live

The transition occurs automatically.

---

## Live Project Processing

When a project becomes Live:

- Project Status changes to Live.
- Owner can publish Project Updates.
- Owner becomes eligible to submit Withdrawal Requests.
- Only invested Customers can continue viewing the Live project.
- Non-invested Customers lose visibility according to the approved Project Visibility Rules.

---

## Database Transaction

The following operations execute as a single database transaction:

- Wallet Balance Update
- Investment Record Creation
- Project Funding Update
- Project Status Update (If Required)
- Notification Creation

If any operation fails:

↓

Rollback Transaction

↓

Return Error Response

No partial financial updates are allowed.

---

## Investment History

Every successful investment permanently creates:

- Investment Record
- Wallet Transaction
- Project Funding Update

Investment history is never deleted.

---

## Notification Processing

Successful investments automatically generate notifications for:

Customer

- Investment Successful

Owner

- New Investment Received

Additional notifications may be generated according to future business requirements.

---

## Investment Security

The Investment System must:

- Require Authentication.
- Require Authorization.
- Require Approved KYC.
- Validate Wallet Balance.
- Prevent duplicate processing.
- Maintain financial consistency.

---

## Investment Communication

Investment Controller

↓

Investment Service

↓

Wallet Repository

↓

Investment Repository

↓

Project Repository

↓

Notification Repository

↓

MongoDB

Business logic always remains inside the Investment Service.

---

## Error Handling

Investment processing fails when:

- Authentication fails.
- Authorization fails.
- Validation fails.
- KYC is not approved.
- Wallet balance is insufficient.
- Project is unavailable.
- Project is not in Stage status.
- Database transaction fails.

The complete transaction is rolled back.

---

## Investment Design Principles

- Financial consistency first.
- Transactional processing.
- No partial updates.
- Automatic project funding calculation.
- Automatic project status transition.
- Immutable investment history.

---

## Investment Processing Rules

- Investments are allowed only in Stage projects.
- Every investment creates a permanent Investment Record.
- Every investment creates a Wallet Transaction.
- Wallet balance is deducted immediately after successful validation.
- Project funding is updated immediately after investment.
- Projects automatically transition from Stage to Live upon reaching the funding target.
- All investment operations execute within a database transaction.
--------------------------------------------------------------

## 18. Notification Architecture

### Purpose

The Notification Architecture defines how system-generated notifications are created, stored, delivered, and managed within the StageFund platform.

Notifications keep Customers, Owners, and Admins informed about important platform activities while maintaining a complete notification history.

The architecture is designed to support future expansion to additional delivery channels such as Email, SMS, and Push Notifications.

---

## Notification Flow

Business Event

↓

Notification Service

↓

Notification Repository

↓

Notification Model

↓

MongoDB

↓

Frontend

↓

User

---

## Notification Responsibilities

The Notification System is responsible for:

- Creating notifications.
- Storing notification history.
- Delivering in-app notifications.
- Managing read/unread status.
- Maintaining notification history.
- Supporting future notification channels.

---

## Notification Triggers

Notifications are automatically generated for important platform events.

Examples

### Authentication

- Registration Successful
- Email Verified
- Mobile Verified
- Login Successful

---

### Customer

- KYC Submitted
- KYC Approved
- KYC Rejected
- Wallet Funds Added
- Investment Successful
- Customer Withdrawal Successful

---

### Owner

- Project Submitted
- Project Approved
- Project Rejected
- Project Became Live
- Project Finished
- Withdrawal Request Submitted
- Withdrawal Approved
- Withdrawal Rejected
- Profile Update Approved
- Profile Update Rejected

---

### Admin

- New Project Submitted
- New Withdrawal Request
- New Profile Update Request
- New Support Ticket
- Pending Verification Requests

---

### Support

- Ticket Created
- New Reply Received
- Ticket Resolved
- Ticket Closed

---

## Notification Processing

Whenever a business event occurs:

↓

Business Logic Executes

↓

Notification Service Triggered

↓

Notification Record Created

↓

Notification Stored

↓

Visible To User

Notification generation never interrupts the primary business workflow.

---

## Notification Delivery

Version 1

Supported Delivery

- In-App Notification

Future Versions

- Email Notification
- SMS Notification
- Push Notification

The architecture supports expansion without changing the notification workflow.

---

## Notification Status

Each notification maintains:

- Unread
- Read

Read status is updated by the authenticated user.

Notifications are never deleted.

---

## Notification Access

Customers can access:

- Their own notifications.

Owners can access:

- Their own notifications.

Admins can access:

- Administrative notifications.
- Platform operational notifications.

Authorization follows the approved Authorization Architecture.

---

## Notification Storage

Each notification stores:

- Recipient
- Notification Type
- Title
- Message
- Read Status
- Created Date

Additional metadata may be stored where required.

---

## Notification Communication

Business Event

↓

Notification Service

↓

Notification Repository

↓

Notification Model

↓

MongoDB

The Notification Service never communicates directly with the frontend.

---

## Notification Error Handling

If notification creation fails:

- The primary business operation should remain successful whenever possible.
- Notification failure should be logged.
- The failure should not corrupt business data.

---

## Notification Design Principles

- Event-Driven Generation.
- In-App First.
- Future Channel Expansion.
- Complete Notification History.
- Read/Unread Tracking.
- Role-Based Notification Delivery.

---

## Notification Architecture Rules

- Notifications are generated automatically by business events.
- Notifications are stored before being displayed.
- Notifications cannot be permanently deleted.
- Notification history must be preserved.
- Notification access follows Authorization rules.
- Notification generation remains independent from business logic execution.
-------------------------------------------------------------

## 19. Error Handling Architecture

### Purpose

The Error Handling Architecture defines how errors are detected, propagated, logged, and returned throughout the StageFund backend.

The architecture ensures consistent error responses, centralized error handling, secure logging, and prevents exposure of internal implementation details.

All backend modules follow a common error handling strategy.

---

## Error Handling Flow

Client Request

↓

Route

↓

Middleware

↓

Controller

↓

Service

↓

Repository

↓

Error Occurs

↓

Centralized Error Middleware

↓

Logger

↓

Standard Error Response

↓

Client

---

## Error Sources

Errors may originate from:

- Authentication
- Authorization
- Validation
- Business Logic
- Repository
- Database
- File Upload
- External Services
- Unexpected System Failures

---

## Error Categories

### Authentication Errors

Examples

- Invalid Access Token
- Missing Access Token
- Expired Access Token
- Invalid Login Credentials

---

### Authorization Errors

Examples

- Insufficient Permission
- Unauthorized Resource Access
- Invalid User Role

---

### Validation Errors

Examples

- Required Field Missing
- Invalid Data Type
- Invalid File Format
- Invalid Request Structure

---

### Business Errors

Examples

- Customer Not Verified
- Owner Not Verified
- Insufficient Wallet Balance
- Project Not Available
- Minimum Investment Not Met

---

### Repository Errors

Examples

- Record Not Found
- Duplicate Record
- Invalid Database Reference

---

### Database Errors

Examples

- Database Connection Failure
- Transaction Failure
- Query Execution Failure

---

### Upload Errors

Examples

- Unsupported File Type
- File Too Large
- Cloud Upload Failure

---

### External Service Errors

Examples

- Cloudinary Failure
- Email Service Failure
- SMS Service Failure
- Payment Gateway Failure

---

### Internal Server Errors

Examples

- Unexpected Exception
- Application Failure
- Unknown Runtime Error

---

## Error Propagation

Repository

↓

Service

↓

Controller

↓

Error Middleware

↓

Logger

↓

Client Response

Errors always move upward through the architecture.

---

## Centralized Error Middleware

Responsibilities

- Capture unhandled errors.
- Convert errors into standardized responses.
- Prevent sensitive data exposure.
- Forward errors to the logging system.
- Return appropriate HTTP status codes.

---

## Logging Integration

Every critical error should be logged.

Examples

- Authentication Failures
- Authorization Failures
- Financial Transaction Failures
- Database Errors
- External Service Failures
- Unexpected Exceptions

Sensitive information must never be written to logs.

---

## Error Response

Every error response must follow the Common Response Structure.

Responses include:

- Success Status
- Error Message
- Error Details (When Applicable)
- HTTP Status Code

Internal implementation details are never returned.

---

## Request Termination

Request processing stops immediately when:

- Authentication fails.
- Authorization fails.
- Validation fails.
- Business validation fails.
- Database transaction fails.

Further execution is not allowed.

---

## Recovery Strategy

The backend should:

- Roll back failed database transactions.
- Prevent partial financial updates.
- Preserve data consistency.
- Return meaningful error responses.
- Record the failure for future analysis.

---

## Error Design Principles

- Centralized Error Handling.
- Secure Error Responses.
- Standardized Error Structure.
- Consistent Logging.
- Fail Fast.
- Preserve Data Integrity.

---

## Error Handling Architecture Rules

- Every unexpected error reaches the Centralized Error Middleware.
- Errors must never expose internal implementation details.
- Business errors must return meaningful messages.
- Financial transaction failures must preserve consistency.
- Database failures must never leave partial updates.
- Every error follows the approved Common Response Structure.
------------------------------------------------------------
## 20. Logging Architecture

### Purpose

The Logging Architecture defines how application events, errors, security activities, and financial operations are recorded throughout the StageFund backend.

Logging improves debugging, production monitoring, security auditing, and system maintenance while ensuring that sensitive information is never exposed.

The platform uses Pino as the standard logging library.

---

## Logging Flow

Application Event

↓

Logger Service (Pino)

↓

Log Processing

↓

Log Storage

↓

Monitoring & Analysis

---

## Logging Responsibilities

The Logging System is responsible for:

- Recording application events.
- Recording authentication events.
- Recording authorization failures.
- Recording financial activities.
- Recording unexpected system errors.
- Recording administrative actions.

---

## Logging Categories

### Application Logs

Examples

- Server Started
- Server Stopped
- API Request Received
- API Response Sent

---

### Authentication Logs

Examples

- User Login
- User Logout
- Invalid Login Attempt
- Access Token Validation Failure

---

### Authorization Logs

Examples

- Unauthorized API Access
- Role Validation Failure
- Resource Ownership Violation

---

### Financial Logs

Examples

- Wallet Balance Updated
- Investment Processed
- Withdrawal Approved
- Withdrawal Rejected

Financial logs should preserve audit history.

---

### Administrative Logs

Examples

- Project Approved
- Project Rejected
- KYC Approved
- KYC Rejected
- Profile Update Approved
- Withdrawal Reviewed

---

### Error Logs

Examples

- Database Errors
- Validation Failures
- External Service Failures
- Unexpected Exceptions

---

## Log Levels

The application supports the following log levels:

- Fatal
- Error
- Warn
- Info
- Debug
- Trace

Production environments should avoid unnecessary Debug and Trace logs.

---

## Sensitive Information

The Logging System must never store:

- Passwords
- Access Tokens
- Refresh Tokens
- OTP Codes
- Full KYC Documents
- Complete Payment Details

Only safe metadata may be logged where required.

---

## Log Structure

Each log entry should include:

- Timestamp
- Log Level
- Module Name
- Event Type
- Request ID (If Available)
- Authenticated User ID (If Available)
- Message

Additional metadata may be included when appropriate.

---

## Log Storage

Application logs should be stored separately from business data.

Logs must never be stored inside application collections.

Production log storage may be centralized according to deployment requirements.

---

## Log Retention

Logs should be retained according to operational requirements.

Critical security and financial logs should be preserved for audit purposes.

Retention policies may vary by deployment environment.

---

## Logging Communication

Application Layer

↓

Logger

↓

Log Storage

Business logic must remain independent of the logging implementation.

---

## Logging Design Principles

- Centralized Logging.
- Structured Log Entries.
- Secure Logging.
- Minimal Performance Impact.
- No Sensitive Data Exposure.
- Audit-Friendly Financial Logging.

---

## Logging Architecture Rules

- Every critical backend event should be logged.
- Every unexpected error should be logged.
- Financial operations should always generate audit logs.
- Authentication failures should always be logged.
- Sensitive information must never appear in logs.
- Logging must not interrupt normal business processing.
-------------------------------------------------------------
## 21. Security Architecture

### Purpose

The Security Architecture defines the security standards followed throughout the StageFund backend to protect user accounts, financial operations, sensitive data, uploaded documents, and application resources.

Security is implemented across every backend layer and is enforced before business logic execution.

---

## Security Flow

Client Request

↓

HTTPS

↓

Express Route

↓

Authentication

↓

Authorization

↓

Rate Limiter

↓

Validation

↓

Controller

↓

Service

↓

Repository

↓

MongoDB

↓

Secure Response

---

## Security Responsibilities

The backend is responsible for:

- User Authentication
- User Authorization
- Password Protection
- Token Security
- Request Validation
- File Upload Security
- API Protection
- Data Protection
- Financial Security
- Error Security

---

## Authentication Security

Authentication is based on:

- JWT Access Token
- JWT Refresh Token
- Argon2 Password Hashing

Rules

- Passwords are never stored in plain text.
- Passwords are never returned through APIs.
- Every protected API validates the Access Token.
- Refresh Tokens are used only to obtain new Access Tokens.

---

## Authorization Security

Authorization follows the approved RBAC Architecture.

Security checks include:

- User Role Validation
- Resource Ownership Validation
- Administrative Hierarchy Validation

Users can access only authorized resources.

---

## Password Security

Passwords must:

- Be hashed using Argon2.
- Never be logged.
- Never be stored in plain text.
- Never be exposed through API responses.

Password verification always occurs through secure hash comparison.

---

## Token Security

The Authentication system must:

- Validate Access Tokens.
- Validate Refresh Tokens.
- Reject expired tokens.
- Reject invalid tokens.
- Reject malformed tokens.

Tokens must never contain sensitive application data.

---

## Environment Security

Sensitive configuration values must be stored only in environment variables.

Examples

- JWT Secret
- Database Connection String
- Cloudinary Credentials
- Email Credentials
- Payment Gateway Credentials

Sensitive values must never be hardcoded.

---

## CORS Security

The backend should allow requests only from approved frontend origins.

Untrusted origins should be rejected.

CORS configuration must be managed centrally.

---

## HTTP Security

The backend should apply secure HTTP headers.

Examples

- Content Security Headers
- Frame Protection
- MIME Type Protection

HTTP security configuration should be centralized.

---

## Input Security

Every incoming request must be validated before processing.

Validation includes:

- Request Body
- Route Parameters
- Query Parameters
- Uploaded Files

Invalid requests are rejected immediately.

---

## File Upload Security

Uploaded files must:

- Require Authentication.
- Require Authorization.
- Be validated before upload.
- Use supported file formats only.
- Be stored securely in Cloudinary.

Only file references are stored in MongoDB.

---

## Rate Limiting

The backend should protect against excessive requests.

Higher protection should be applied to:

- Login APIs
- Registration APIs
- OTP Verification APIs
- Password Reset APIs

---

## Data Security

Sensitive information must never be exposed.

Examples

- Password Hashes
- JWT Secrets
- Internal Database Information
- Server Configuration
- Environment Variables

API responses should return only required information.

---

## Financial Security

Financial operations require:

- Authentication
- Authorization
- Business Validation
- Database Transactions
- Audit Logging

Partial financial updates are not allowed.

---

## Error Security

Error responses must never expose:

- Stack Traces
- Internal File Paths
- Database Structure
- Source Code Information

Only standardized error responses are returned.

---

## Logging Security

Logs must never contain:

- Passwords
- Tokens
- OTP Codes
- Full KYC Documents
- Sensitive Financial Information

Only safe metadata should be logged.

---

## Security Design Principles

- Secure by Default.
- Least Privilege Principle.
- Defense in Depth.
- Centralized Security.
- Principle of Minimal Exposure.
- Layered Security.

---

## Security Architecture Rules

- Authentication executes before Authorization.
- Authorization executes before business logic.
- Validation executes before Controller execution.
- Passwords are always hashed.
- Tokens are validated before every protected request.
- Sensitive data is never exposed.
- Financial operations always require database transactions.
- Security configuration remains centralized.
-------------------------------------------------------------
## 22. Configuration Management

### Purpose

The Configuration Management Architecture defines how application configuration, environment variables, secrets, and deployment-specific settings are organized and managed across the StageFund backend.

The objective is to keep configuration centralized, secure, reusable, and independent from business logic.

---

## Configuration Flow

Application Startup

↓

Environment Variables

↓

Configuration Layer

↓

Application Modules

↓

Runtime Configuration

---

## Configuration Responsibilities

The Configuration Layer is responsible for:

- Loading Environment Variables.
- Managing Application Configuration.
- Managing Third-Party Service Configuration.
- Managing Database Configuration.
- Managing Security Configuration.
- Providing centralized configuration access.

Business logic must never contain configuration values.

---

## Configuration Organization

Configuration files are stored inside:

config/

Examples

- database.config.js
- jwt.config.js
- cloudinary.config.js
- cors.config.js
- logger.config.js
- app.config.js

Each configuration file manages one responsibility.

---

## Environment Variables

Sensitive configuration must be stored inside environment variables.

Examples

- Database URL
- JWT Secret
- Cloudinary Credentials
- Email Credentials
- Payment Gateway Credentials
- Application Port

Environment variables must never be hardcoded inside source code.

---

## Environment Files

Supported Environment Files

- .env
- .env.example

Purpose

.env

Contains local runtime configuration.

.env.example

Contains required variable names without sensitive values.

---

## Configuration Categories

### Application Configuration

Examples

- Application Name
- Environment
- Port
- API Version

---

### Database Configuration

Examples

- MongoDB Connection
- Connection Options

---

### Authentication Configuration

Examples

- JWT Configuration
- Token Expiration
- Authentication Settings

---

### File Upload Configuration

Examples

- Cloudinary Configuration
- Upload Settings

---

### Logging Configuration

Examples

- Logger Settings
- Log Levels

---

### Security Configuration

Examples

- CORS Configuration
- Security Headers
- Rate Limiter Configuration

---

## Configuration Access

Application Modules

↓

Configuration Layer

↓

Environment Variables

Application modules should never read environment variables directly.

Configuration should always be accessed through the Configuration Layer.

---

## Configuration Validation

Application startup should validate:

- Required Environment Variables
- Missing Configuration
- Invalid Configuration

The application should fail to start if mandatory configuration is missing.

---

## Configuration Design Principles

- Centralized Configuration.
- Secure Secret Management.
- Environment Independence.
- Reusable Configuration.
- No Hardcoded Secrets.
- Single Source of Truth.

---

## Configuration Management Rules

- Configuration belongs only in the Configuration Layer.
- Secrets are stored only in environment variables.
- Source code must never contain sensitive credentials.
- Configuration is loaded during application startup.
- Every module uses centralized configuration.
- Missing mandatory configuration prevents application startup.
-------------------------------------------------------------

## 23. Third Party Integrations

### Purpose

The Third Party Integrations Architecture defines how external services are integrated with the StageFund platform while keeping the application loosely coupled, maintainable, and provider-independent.

External services should remain replaceable without affecting business logic.

---

## Integration Flow

Application

↓

Service Layer

↓

Integration Layer

↓

Third Party Service

↓

Response

↓

Application

Business logic never communicates directly with third-party providers.

---

## Integration Responsibilities

The Integration Layer is responsible for:

- External API Communication.
- Request Formatting.
- Response Processing.
- Error Handling.
- Retry Handling (Where Applicable).
- Provider Isolation.

---

## Integration Organization

Third-party integrations are organized by service.

Examples

integrations/

├── cloudinary/

├── email/

├── sms/

├── payment/

├── analytics/

├── monitoring/

Each integration remains independent.

---

## Supported Integrations

### Cloud Storage

Purpose

- Store uploaded documents.
- Store project images.
- Return secure file URLs.

Provider

Cloudinary

Cloudinary is the approved cloud storage provider for Version 1.

---

### Email Service

Purpose

- Email Verification
- Password Reset
- Account Notifications
- Platform Notifications

Provider

Provider configurable.

The provider may be changed without modifying business logic.

---

### SMS / OTP Service

Purpose

- Mobile Verification
- OTP Delivery
- Security Notifications

Provider

Provider configurable.

---

### Payment Gateway

Purpose

- Add Funds
- Customer Withdrawals
- Owner Withdrawals
- Future Payment Processing

Provider

Provider configurable.

Business logic remains independent of the selected payment gateway.

---

### Analytics

Purpose

Future platform analytics and reporting.

Version 1

Not implemented.

---

### Monitoring

Purpose

Future production monitoring and health tracking.

Version 1

Not implemented.

---

## Integration Communication

Controller

↓

Service

↓

Integration Layer

↓

Third Party Provider

Controllers and Repositories never communicate directly with external providers.

---

## Error Handling

If a third-party service fails:

- Record the failure.
- Return a standardized error where appropriate.
- Preserve business consistency.
- Avoid exposing provider-specific details.

---

## Configuration

Every integration must use centralized configuration.

Credentials are loaded from the Configuration Layer.

Credentials must never be hardcoded.

---

## Security

Every third-party integration must:

- Use secure credentials.
- Communicate over HTTPS.
- Protect sensitive information.
- Validate responses before processing.

---

## Design Principles

- Loose Coupling.
- Provider Independence.
- Secure Communication.
- Centralized Configuration.
- Reusable Integrations.
- Consistent Error Handling.

---

## Third Party Integration Rules

- Business logic communicates only with the Integration Layer.
- Third-party providers remain replaceable.
- Cloudinary is the approved cloud storage provider.
- Other providers remain configurable.
- Integration failures must never corrupt business data.
- All credentials are managed through the Configuration Layer.
--------------------------------------------------------------

## 24. Performance & Scalability

### Purpose

The Performance & Scalability Architecture defines how the StageFund backend is designed to efficiently handle increasing users, projects, investments, and financial operations while maintaining system stability, responsiveness, and maintainability.

The architecture is designed for Version 1 while remaining ready for future scaling.

---

## Performance Goals

The backend should provide:

- Fast API responses.
- Efficient database operations.
- Consistent financial processing.
- Stable application performance.
- Predictable system behavior under normal workload.

---

## Scalability Principles

The backend follows:

- Stateless Architecture
- Modular Development
- Layered Architecture
- Feature-Based Architecture

These principles allow the platform to scale without major architectural changes.

---

## Stateless Backend

The backend remains stateless.

User session information is maintained through JWT authentication rather than server memory.

Benefits

- Easier horizontal scaling.
- Better load distribution.
- Simpler deployment.

---

## Database Performance

The database should:

- Use indexes on frequently queried fields.
- Retrieve only required data.
- Avoid unnecessary queries.
- Support efficient filtering.
- Support pagination.

Database optimization belongs to the Repository Layer.

---

## API Performance

Every API should:

- Return only required data.
- Support pagination where applicable.
- Avoid unnecessary nested responses.
- Follow standardized response structures.

---

## Pagination Strategy

Large datasets should use pagination.

Examples

- Projects
- Investments
- Notifications
- Wallet Transactions
- Support Tickets

Pagination improves response time and reduces database load.

---

## Search & Filtering

The backend supports:

- Search
- Filtering
- Sorting
- Pagination

These operations should execute efficiently using optimized database queries.

---

## Background Processing

Long-running operations should be capable of running in the background when required.

Future examples

- Email Delivery
- SMS Delivery
- Analytics Processing
- Scheduled Jobs

Version 1 may execute these synchronously where appropriate.

---

## Caching

Caching support is reserved for future versions.

Possible use cases

- Frequently accessed public data.
- Dashboard statistics.
- Platform configuration.

Caching implementation does not require changes to the overall architecture.

---

## Modular Growth

New modules should be added as independent features.

Examples

- Referral System
- Rewards
- Reports
- Analytics
- Audit Module

Existing modules should not require restructuring.

---

## Horizontal Scaling

The backend architecture supports horizontal scaling.

Application instances remain independent and do not rely on in-memory session storage.

---

## Monitoring

Performance monitoring may be introduced in future versions.

Examples

- API Performance
- Database Performance
- Server Health
- Error Rates

The architecture supports monitoring without structural changes.

---

## Performance Design Principles

- Keep APIs lightweight.
- Optimize database access.
- Minimize unnecessary processing.
- Maintain modular architecture.
- Preserve financial consistency.
- Design for future growth.

---

## Performance & Scalability Rules

- APIs should return only necessary data.
- Large datasets must support pagination.
- Database queries should remain optimized.
- The backend remains stateless.
- New modules should integrate without restructuring existing architecture.
- Future caching and background processing should be added without changing core business logic.
--------------------------------------------------------------

## 25. Deployment Architecture

### Purpose

The Deployment Architecture defines how the StageFund backend is prepared for deployment across Development, Testing, Staging, and Production environments.

The objective is to ensure reliable deployment, environment isolation, secure configuration, and consistent application behavior.

Deployment infrastructure may change without affecting the application architecture.

---

## Deployment Flow

Developer

↓

Source Code

↓

Build Process

↓

Environment Configuration

↓

Application Startup

↓

Database Connection

↓

Third Party Integration Initialization

↓

Application Ready

---

## Deployment Environments

The application supports multiple deployment environments.

### Development

Purpose

- Local Development
- Feature Development
- Debugging

---

### Testing

Purpose

- Internal Testing
- API Testing
- Integration Testing

---

### Staging

Purpose

- Pre-Production Validation
- Final Quality Assurance
- Deployment Verification

---

### Production

Purpose

- Live Platform
- Real Users
- Real Financial Operations

---

## Environment Isolation

Each environment maintains independent:

- Environment Variables
- Database Configuration
- Third Party Credentials
- Application Settings

Environments must never share sensitive configuration.

---

## Startup Process

Application Startup

↓

Load Environment Variables

↓

Load Configuration

↓

Initialize Logger

↓

Connect Database

↓

Initialize Third Party Services

↓

Register Routes

↓

Start HTTP Server

↓

Application Ready

If any mandatory startup step fails, the application must not start.

---

## Configuration Management

Deployment uses the centralized Configuration Layer.

Application modules never load environment variables directly.

---

## Database Initialization

During deployment:

- Database Connection is established.
- Required indexes are created (if applicable).
- Application verifies database availability.

If database connection fails, startup is aborted.

---

## Third Party Initialization

During startup, required third-party integrations are initialized.

Examples

- Cloudinary
- Email Service
- SMS Service
- Payment Gateway

Initialization failures should be handled according to business requirements.

---

## Logging Initialization

Logging is initialized during application startup.

Application events are recorded immediately after successful initialization.

---

## Security During Deployment

Deployment must ensure:

- HTTPS Communication
- Secure Environment Variables
- Protected Secrets
- Secure API Configuration
- Restricted Production Access

---

## Health Check

The backend should provide a health check endpoint.

Purpose

- Verify application availability.
- Verify service health.
- Support deployment monitoring.

---

## Deployment Design Principles

- Environment Independence.
- Secure Configuration.
- Reliable Startup.
- Graceful Failure.
- Consistent Deployment Process.
- Production Readiness.

---

## Deployment Architecture Rules

- Every environment uses its own configuration.
- Sensitive credentials remain outside source code.
- Startup validation is mandatory.
- Database connection must succeed before serving requests.
- Third-party services initialize through the Configuration Layer.
- Deployment infrastructure remains independent of business logic.
--------------------------------------------------------------

## 26. Backend Business Rules

### Purpose

The Backend Business Rules define the mandatory implementation rules that every backend module must follow.

These rules ensure consistent application behavior, financial integrity, security, maintainability, and compliance with the approved Business Requirements Document (BRD), Application Workflow, Database Design, and API Design.

These rules are mandatory for every backend implementation.

---

## General Rules

- The backend must always follow the approved Business Requirements Document (BRD).
- The backend must always follow the approved Application Workflow.
- The backend must always follow the approved Database Design.
- The backend must always follow the approved API Design.
- Business logic belongs only to the Service Layer.
- Database operations belong only to the Repository Layer.
- Controllers remain lightweight.
- Routes remain lightweight.
- Middleware remains reusable and independent.

---

## Authentication Rules

- Every protected API requires successful authentication.
- Every login generates a new Access Token and Refresh Token.
- Passwords are always verified using Argon2.
- Passwords are never stored in plain text.
- Passwords are never returned through APIs.

---

## Authorization Rules

- Authorization executes only after successful authentication.
- Users may access only resources permitted for their role.
- Resource ownership must always be validated where applicable.
- Administrative permissions follow the approved hierarchy.

---

## Validation Rules

- Every API endpoint must validate incoming requests.
- Invalid requests are rejected immediately.
- Business validation belongs only to the Service Layer.
- Validation must complete before Controller execution.

---

## Financial Rules

- Every financial operation requires successful authentication.
- Every financial operation requires authorization.
- Every financial operation requires business validation.
- Every financial operation must maintain financial consistency.
- Partial financial updates are not allowed.
- Multi-step financial operations must execute within a database transaction.

---

## Wallet Rules

- Every user owns only one wallet.
- Wallet balance must never become negative.
- Withdrawable balance must never become negative.
- Every balance modification creates a Wallet Transaction.
- Wallet history is permanently preserved.

---

## Investment Rules

- Investments are allowed only in Stage projects.
- Customer KYC approval is mandatory before investing.
- Wallet balance is validated before investment processing.
- Every successful investment creates an Investment Record.
- Every successful investment creates a Wallet Transaction.
- Project funding updates immediately after successful investment.
- Projects automatically transition from Stage to Live after reaching the funding target.

---

## Project Rules

- Only verified Owners may create projects.
- Projects require Admin approval before becoming visible.
- Live project visibility follows the approved Project Visibility Rules.
- Project updates follow the approved Project Lifecycle Workflow.

---

## Notification Rules

- Notifications are generated automatically from business events.
- Notifications are stored before display.
- Notification history is preserved.
- Notifications are never permanently deleted.

---

## File Upload Rules

- Uploaded files require authentication.
- Uploaded files require authorization.
- Uploaded files are validated before processing.
- Uploaded files are permanently stored in Cloudinary.
- MongoDB stores only file references.

---

## Database Rules

- Only Repositories communicate with MongoDB.
- Every collection has one Mongoose Model.
- Database consistency must always be maintained.
- Financial records remain immutable where applicable.
- Historical records are preserved according to business rules.

---

## Error Handling Rules

- Unexpected errors are handled only by the Centralized Error Middleware.
- Internal implementation details are never exposed.
- Financial failures must preserve data consistency.
- Every error follows the approved Common Response Structure.

---

## Logging Rules

- Every critical system event should be logged.
- Every authentication failure should be logged.
- Every financial operation should generate audit logs.
- Sensitive information must never appear in logs.

---

## Configuration Rules

- Configuration remains centralized.
- Secrets are stored only in environment variables.
- Source code never contains sensitive credentials.
- Missing mandatory configuration prevents application startup.

---

## Security Rules

- Sensitive information is never exposed.
- JWT protects all secured APIs.
- Passwords remain hashed.
- Authorization always follows authentication.
- Secure configuration is mandatory.

---

## Architecture Rules

- Route → Controller → Service → Repository → Model → MongoDB
- Layers must never bypass one another.
- Every module follows the Feature-Based Architecture.
- One Feature = One Route.
- One Feature = One Controller.
- One Feature = One Service.
- One Feature = One Repository.

---

## AI Implementation Rules

AI-assisted development must:

- Follow all approved documentation.
- Never invent business logic.
- Never rename APIs.
- Never rename collections.
- Never bypass architecture rules.
- Stop and request clarification when documentation is incomplete.

---

## Backend Business Rule Principles

- Security First.
- Financial Consistency First.
- Single Source of Truth.
- Separation of Responsibilities.
- Scalable Architecture.
- Maintainable Code.
- Predictable Application Behavior.
- Production-Ready Implementation.

-------------------------------------------------------------