# Frontend Architecture

## 1. Frontend Overview

The StageFund Frontend is a modern web application that provides a secure, responsive, and user-friendly interface for Customers, Project Owners, and Administrators.

The frontend is responsible for presenting business information, collecting user input, communicating with backend services, and guiding users through the approved business workflows.

The frontend follows a Feature-Based Architecture to ensure modularity, scalability, maintainability, and consistency across the application.

Each user interacts only with the features, pages, and information permitted for their assigned role.

The frontend is designed to work seamlessly with the approved Backend Architecture, API Design, Database Design, and Application Workflow while maintaining a consistent user experience throughout the platform.

---------------------------------------------------------------

## 2. Technology Stack

The StageFund frontend is built using a modern React ecosystem that provides scalability, maintainability, performance, and developer productivity.

The approved frontend technology stack consists of:

### Core Framework

- React.js

---

### Build Tool

- Vite

---

### Programming Language

- JavaScript (ES6+)

---

### Routing

- React Router

---

### State Management

- Context API

---

### API Communication

- Axios

---

### Form Management

- React Hook Form

---

### Validation

- Zod

---

### Server State Management

- TanStack Query (React Query)

---

### Styling

- Tailwind CSS

---

### Icons

- Lucide React

---

### Notifications

- React Hot Toast

---

### Charts

- Recharts

---

### File Upload

- Native Browser File API

---

### Version Control

- Git
-----------------------------------------------------------

## 3. Frontend Architecture Pattern

The StageFund frontend follows a Feature-Based Architecture.

The application is divided into independent business features, allowing each module to remain isolated, reusable, and maintainable.

Every feature contains its own pages, components, hooks, services, validations, and related business logic.

---

## Architecture Flow

User

↓

Page

↓

Layout

↓

Feature

↓

Components

↓

Hooks

↓

API Service

↓

Backend API

---

## Architecture Principles

- Feature-Based Development
- Component Reusability
- Separation of Responsibilities
- Modular Growth
- Scalable Folder Organization
- Business Workflow Consistency

---

## Frontend Communication

Frontend

↓

API Service Layer

↓

Backend APIs

↓

Business Response

The frontend never communicates directly with the database.

All communication occurs through the approved Backend APIs.

---

## Architecture Rules

- Every feature remains independent.
- Shared components remain reusable.
- Business logic remains organized by feature.
- Frontend follows the approved Application Workflow.
- Frontend follows the approved API Design.
------------------------------------------------------------

## 4. Frontend Request Lifecycle

Every user interaction within the StageFund platform follows a standardized frontend request lifecycle.

---

## Request Flow

User Action

↓

Page

↓

Component

↓

Form Validation

↓

API Service

↓

Backend API

↓

Backend Response

↓

UI Update

↓

User Feedback

---

## Lifecycle Responsibilities

The frontend is responsible for:

- Collecting user input.
- Validating user input.
- Sending API requests.
- Receiving API responses.
- Updating the user interface.
- Displaying success and error messages.
- Maintaining consistent user experience.

---

## Request Rules

- Every request must be validated before submission.
- Only approved Backend APIs may be called.
- API responses must follow the approved response structure.
- UI updates occur only after receiving valid backend responses.

-------------------------------------------------------------

## 5. Folder Structure

The StageFund frontend follows a Feature-Based Folder Structure.

Each business feature is isolated within its own directory, making the application easier to develop, maintain, test, and scale.

Shared resources remain centralized while feature-specific resources remain inside their respective modules.

---

## Folder Structure

src/

├── assets/

├── components/

├── features/

├── layouts/

├── pages/

├── routes/

├── services/

├── hooks/

├── contexts/

├── validators/

├── utils/

├── constants/

├── config/

├── styles/

├── App.jsx

├── main.jsx

---

## Folder Responsibilities

### assets/

Stores static application resources.

Examples

- Images
- Icons
- Fonts
- Illustrations

---

### components/

Contains reusable UI components shared across multiple features.

Examples

- Buttons
- Inputs
- Cards
- Tables
- Modals
- Loaders

Components remain independent from business features.

---

### features/

Contains all business modules.

Each feature maintains its own:

- Components
- Pages
- Hooks
- Services
- Validation
- Business Logic

Examples

features/

├── auth/

├── customer/

├── owner/

├── admin/

├── wallet/

├── investment/

├── project/

├── dashboard/

├── support/

├── notification/

├── profile/

├── kyc/

---

### layouts/

Contains reusable application layouts.

Examples

- Public Layout
- Customer Layout
- Owner Layout
- Admin Layout
- Authentication Layout

---

### pages/

Contains top-level route pages.

Pages organize feature screens and route entry points.

---

### routes/

Contains application routing configuration.

Responsibilities

- Public Routes
- Protected Routes
- Role-Based Routes

---

### services/

Contains API communication logic.

Responsibilities

- API Requests
- API Responses
- Request Configuration

Business logic does not belong here.

---

### hooks/

Contains reusable custom React hooks.

Examples

- Authentication Hooks
- API Hooks
- Pagination Hooks
- File Upload Hooks

---

### contexts/

Contains shared application contexts.

Examples

- Authentication Context
- Theme Context
- Notification Context

---

### validators/

Contains frontend validation schemas.

Validation follows the approved API Design and Business Rules.

---

### utils/

Contains reusable helper functions.

Examples

- Date Formatting
- Currency Formatting
- String Utilities

---

### constants/

Contains reusable application constants.

Examples

- User Roles
- Project Status
- Notification Types

---

### config/

Contains frontend configuration.

Examples

- API Base URL
- Environment Configuration
- Application Configuration

---

### styles/

Contains global application styles.

Examples

- Global Styles
- Theme Styles
- Utility Styles

---

## Folder Structure Rules

- Every feature remains independent.
- Shared resources remain reusable.
- Business logic remains inside features.
- API communication remains inside services.
- Validation remains inside validators.
- Configuration remains centralized.

-------------------------------------------------------------

## 6. Routing Architecture

The StageFund frontend follows a centralized routing architecture that controls navigation, access permissions, and page visibility based on the authenticated user's role.

The routing system ensures that users can access only the pages and features permitted for their assigned role.

---

## Routing Categories

The application consists of the following route categories:

- Public Routes
- Authentication Routes
- Protected Routes
- Customer Routes
- Project Owner Routes
- Administrator Routes

---

## Routing Flow

User Request

↓

Router

↓

Route Validation

↓

Authentication Check

↓

Authorization Check

↓

Requested Page

↓

User Interface

---

## Public Routes

Public routes are accessible without authentication.

Examples

- Home
- About
- Contact
- FAQs
- Privacy Policy
- Terms & Conditions
- Login
- Register

---

## Authentication Routes

Authentication routes are responsible for account access and recovery.

Examples

- Login
- Register
- Forgot Password
- Reset Password
- Email Verification
- Mobile Verification

Authenticated users should not access authentication routes unless required by an approved business workflow.

---

## Protected Routes

Protected routes require successful authentication before access is granted.

Protected routes include:

- Dashboard
- Profile
- Wallet
- Investments
- Projects
- Notifications
- Support

Unauthorized users are redirected to the Login page.

---

## Customer Routes

Customer routes provide access to customer-specific features.

Examples

- Customer Dashboard
- Browse Projects
- Project Details
- Investments
- Wallet
- Notifications
- Support
- Profile

Customers cannot access Project Owner or Administrator routes.

---

## Project Owner Routes

Project Owner routes provide access to owner-specific features.

Examples

- Owner Dashboard
- My Projects
- Create Project
- Project Details
- Project Updates
- Withdrawals
- Notifications
- Support
- Profile

Project Owners cannot access Customer-only or Administrator routes.

---

## Administrator Routes

Administrator routes provide access to platform management features.

Examples

- Admin Dashboard
- User Verification
- Project Review
- Withdrawal Requests
- Profile Update Requests
- Support Management
- Platform Statistics

Administrative routes are restricted to authorized administrators only.

---

## Route Guards

Every protected route passes through Route Guards.

Route Guards validate:

- Authentication Status
- User Role
- Route Permission

Only authorized users can access protected pages.

---

## Unauthorized Access

If a user attempts to access a restricted route:

↓

Access Denied

↓

Redirect to the appropriate page

↓

Display a standardized access message where applicable.

---

## Route Redirection

Examples

Unauthenticated User

↓

Protected Route

↓

Redirect to Login

---

Authenticated Customer

↓

Owner Route

↓

Redirect to Customer Dashboard

---

Authenticated Project Owner

↓

Admin Route

↓

Redirect to Owner Dashboard

---

Authenticated Administrator

↓

Public Authentication Route

↓

Redirect to Admin Dashboard

---

## Page Not Found

Undefined routes should display a standardized 404 Page.

The 404 page should provide navigation back to valid platform pages.

---

## Routing Design Principles

- Centralized Routing
- Role-Based Navigation
- Protected Routes
- Minimal Route Duplication
- Consistent Navigation Experience
- Secure Access Control

---

## Routing Architecture Rules

- All routing is managed centrally.
- Protected routes always require authentication.
- Role validation is mandatory before rendering protected pages.
- Unauthorized users cannot access restricted pages.
- Route guards execute before page rendering.
- Routing follows the approved Application Workflow and Business Rules.
--------------------------------------------------------------

## 7. Layout Architecture

## 7. Layout Architecture

The StageFund frontend follows a layout-based architecture to provide a consistent, reusable, and role-specific user experience throughout the application.

Each layout is responsible for defining the common user interface structure shared across multiple pages.

Layouts separate common UI elements from page-specific content, reducing duplication and improving maintainability.

---

## Layout Architecture Flow

User

↓

Route

↓

Layout

↓

Page

↓

Components

↓

User Interface

---

## Layout Types

The application consists of the following layouts:

- Public Layout
- Authentication Layout
- Customer Layout
- Project Owner Layout
- Administrator Layout

Each layout is designed for a specific user experience.

---

## Public Layout

The Public Layout is used for pages accessible without authentication.

Examples

- Home
- About
- Contact
- FAQs
- Privacy Policy
- Terms & Conditions

Common UI Elements

- Public Navigation Bar
- Footer
- Global Notifications
- Theme Support

---

## Authentication Layout

The Authentication Layout is used for authentication-related pages.

Examples

- Login
- Register
- Forgot Password
- Reset Password
- Email Verification
- Mobile Verification

Common UI Elements

- Authentication Container
- Branding Section
- Authentication Form Area
- Authentication Messages

The Authentication Layout focuses on simplicity and user guidance.

---

## Customer Layout

The Customer Layout provides navigation and business tools for Customers.

Common UI Elements

- Customer Header
- Sidebar Navigation
- Breadcrumb Navigation
- Notification Area
- User Profile Menu
- Footer

Customer pages inherit the Customer Layout automatically.

---

## Project Owner Layout

The Project Owner Layout provides business management tools for Project Owners.

Common UI Elements

- Owner Header
- Sidebar Navigation
- Project Navigation
- Notification Area
- User Profile Menu
- Footer

Owner pages inherit the Project Owner Layout automatically.

---

## Administrator Layout

The Administrator Layout provides administrative tools and operational dashboards.

Common UI Elements

- Admin Header
- Administrative Sidebar
- Dashboard Navigation
- Notification Area
- User Profile Menu
- Footer

Administrative pages inherit the Administrator Layout automatically.

---

## Shared Layout Components

Reusable layout components include:

- Header
- Sidebar
- Footer
- Breadcrumb
- Page Title
- Notification Area
- User Profile Menu
- Loading Overlay

These components remain reusable across multiple layouts where applicable.

---

## Layout Responsibilities

Layouts are responsible for:

- Providing consistent page structure.
- Displaying common navigation.
- Displaying common headers and footers.
- Managing responsive page structure.
- Rendering child pages.
- Maintaining role-specific user experience.

Layouts must not contain business logic.

---

## Layout Design Principles

- Reusable Layouts
- Consistent Navigation
- Role-Based User Experience
- Responsive Design
- Minimal UI Duplication
- Separation of Responsibilities

---

## Layout Architecture Rules

- Every page belongs to one layout.
- Layouts contain only shared UI structure.
- Business logic belongs to pages and features.
- Shared layout components remain reusable.
- Layouts follow the approved Routing Architecture.
- Layouts remain independent from business modules.

--------------------------------------------------------------

## 8. Page Architecture

The StageFund frontend follows a standardized page architecture to ensure consistency, maintainability, and a predictable user experience across the entire application.

Every page follows a common structure while allowing feature-specific content and functionality.

Pages are responsible for orchestrating business workflows by combining layouts, reusable components, custom hooks, and API services.

Pages should not contain reusable UI elements or complex business logic.

---

## Page Architecture Flow

User

↓

Route

↓

Layout

↓

Page

↓

Components

↓

Hooks

↓

API Service

↓

Backend API

↓

UI Update

---

## Page Responsibilities

Every page is responsible for:

- Rendering feature-specific content.
- Managing page-level state.
- Coordinating reusable components.
- Calling approved API services.
- Displaying API responses.
- Handling loading states.
- Handling error states.
- Triggering user feedback.

Pages coordinate the workflow but do not implement reusable business logic.

---

## Standard Page Structure

Every page should follow the following logical structure:

- Page Initialization
- Data Loading
- User Interaction
- API Communication
- UI Update
- User Feedback

---

## Page Categories

The application consists of the following page categories:

### Public Pages

Examples

- Home
- About
- Contact
- FAQs
- Privacy Policy
- Terms & Conditions

---

### Authentication Pages

Examples

- Login
- Register
- Forgot Password
- Reset Password
- Email Verification
- Mobile Verification

---

### Customer Pages

Examples

- Dashboard
- Browse Projects
- Project Details
- Investments
- Wallet
- Notifications
- Support
- Profile

---

### Project Owner Pages

Examples

- Dashboard
- My Projects
- Create Project
- Edit Project
- Project Details
- Project Updates
- Withdrawals
- Notifications
- Support
- Profile

---

### Administrator Pages

Examples

- Dashboard
- User Verification
- Project Review
- Withdrawal Requests
- Profile Update Requests
- Support Management
- Platform Statistics

---

## Page Communication

Pages communicate with:

- Layouts
- Components
- Hooks
- API Services

Pages never communicate directly with the backend database.

All server communication occurs through the approved API Service Layer.

---

## Page Lifecycle

Page Load

↓

Initialize Page

↓

Load Required Data

↓

Render Components

↓

User Interaction

↓

API Request

↓

Backend Response

↓

Refresh UI

---

## Page Design Principles

- Lightweight Pages
- Reusable Components
- Feature Isolation
- Consistent User Experience
- Predictable Navigation
- Minimal Business Logic

---

## Page Architecture Rules

- Every page belongs to one feature.
- Every page belongs to one layout.
- Pages coordinate business workflows.
- Reusable UI belongs to components.
- API communication occurs only through services.
- Business workflows follow the approved Application Workflow.
--------------------------------------------------------------

## 9. Component Architecture

The StageFund frontend follows a component-based architecture that promotes reusability, maintainability, consistency, and scalability.

Every user interface is built by composing small, reusable, and independent components.

Components should remain focused on a single responsibility and should be reusable wherever applicable.

---

## Component Architecture Flow

Page

↓

Container Component

↓

Presentational Components

↓

User Interface

---

## Component Categories

The application consists of the following component categories:

- Shared Components
- Feature Components
- Layout Components
- Presentational Components
- Container Components

Each component category has a specific responsibility.

---

## Shared Components

Shared Components are reusable across the entire application.

Examples

- Button
- Input
- Card
- Modal
- Table
- Loader
- Pagination
- Badge
- Avatar
- Empty State

Shared Components remain independent from business features.

---

## Feature Components

Feature Components belong to a specific business module.

Examples

Customer

- Investment Card
- Wallet Summary
- Investment History

Project Owner

- Project Card
- Funding Progress
- Withdrawal Summary

Administrator

- Verification Table
- Project Review Card
- Dashboard Statistics

Feature Components remain inside their respective feature folders.

---

## Layout Components

Layout Components provide reusable user interface elements shared by application layouts.

Examples

- Header
- Sidebar
- Footer
- Breadcrumb
- Navigation Menu
- Profile Menu

---

## Presentational Components

Presentational Components are responsible only for displaying user interface elements.

Responsibilities

- Display data.
- Render UI.
- Receive props.
- Trigger events.

Presentational Components do not contain business logic or API communication.

---

## Container Components

Container Components coordinate feature-specific workflows.

Responsibilities

- Manage page-level state.
- Coordinate Presentational Components.
- Use custom hooks.
- Trigger API requests.
- Process API responses.

Container Components should remain lightweight and focused on orchestration.

---

## Component Communication

Components communicate through:

- Props
- Events
- Context (where applicable)

Components should remain loosely coupled.

---

## Component Lifecycle

Page

↓

Container Component

↓

Presentational Components

↓

User Interaction

↓

Container Component

↓

API Service

↓

Backend Response

↓

Updated UI

---

## Component Design Principles

- Single Responsibility
- Reusability
- Loose Coupling
- Predictable Behavior
- Consistent UI
- Minimal Duplication

---

## Component Architecture Rules

- Components should perform one responsibility.
- Shared Components remain reusable.
- Feature Components remain inside their feature.
- Presentational Components do not contain business logic.
- Container Components coordinate business workflows.
- API communication occurs only through the Service Layer.
- Components remain independent whenever possible.

--------------------------------------------------------------

## 10. State Management

The StageFund frontend follows a layered state management architecture to ensure predictable data flow, efficient rendering, and scalable application development.

Different types of application state are managed using the most appropriate solution based on their responsibility.

---

## State Management Layers

The frontend manages state through the following layers:

- Local State
- Global UI State
- Server State

Each layer has a clearly defined responsibility.

---

## State Flow

User Interaction

↓

Local State

↓

Global Context (If Required)

↓

TanStack Query

↓

API Service

↓

Backend API

↓

Updated UI

---

## Local State

Local State manages data used only within a single component or page.

Examples

- Input Fields
- Modal Visibility
- Dropdown State
- Search Text
- Pagination Controls
- Temporary UI Values

Local State should remain inside the component where it is used.

---

## Global UI State

Global UI State manages information shared across multiple features.

Managed Using

- Context API

Examples

- Authentication Status
- Current User Information
- Theme
- Notification Counter
- Global Loading State

Global UI State should contain only shared application data.

---

## Server State

Server State represents data received from backend APIs.

Managed Using

- TanStack Query

Examples

- Dashboard Data
- Projects
- Investments
- Wallet Information
- Notifications
- Support Tickets
- Profile Information

Server State should never be manually duplicated inside Context where unnecessary.

---

## State Responsibilities

### Local State

Responsible for:

- Temporary UI State
- Form Inputs
- Component Visibility

---

### Context API

Responsible for:

- Shared UI State
- Authentication State
- User Session Information
- Theme Preferences

---

### TanStack Query

Responsible for:

- Data Fetching
- API Caching
- Background Refetching
- Loading States
- Error States
- Server Data Synchronization

---

## State Communication

Component

↓

Hook

↓

TanStack Query

↓

API Service

↓

Backend API

↓

Updated State

↓

UI Refresh

---

## State Design Principles

- Single Source of Truth
- Minimal State Duplication
- Predictable Data Flow
- Efficient Rendering
- Reusable State Management
- Separation of UI State and Server State

---

## State Management Rules

- Local State remains inside components.
- Shared UI State belongs to Context API.
- Server State belongs to TanStack Query.
- API requests occur only through the Service Layer.
- State updates should remain predictable.
- Duplicate server data should be avoided whenever possible.

-------------------------------------------------------------

## 11. API Communication

The StageFund frontend communicates with the backend exclusively through the approved REST APIs.

All communication is centralized through the API Service Layer to ensure consistency, maintainability, security, and predictable application behavior.

The frontend never communicates directly with the database.

---

## API Communication Flow

User Action

↓

Page

↓

Container Component

↓

Custom Hook

↓

TanStack Query

↓

API Service

↓

Axios

↓

Backend API

↓

Backend Response

↓

TanStack Query Cache

↓

UI Update

---

## Communication Responsibilities

### Pages

Responsible for:

- Triggering business workflows.
- Rendering UI.
- Coordinating user interactions.

Pages do not communicate directly with backend APIs.

---

### Custom Hooks

Responsible for:

- Coordinating API operations.
- Preparing request parameters.
- Providing data to components.

Hooks remain reusable across features.

---

### TanStack Query

Responsible for:

- Data Fetching
- Response Caching
- Background Refetching
- Request Deduplication
- Loading State Management
- Error State Management
- Server State Synchronization

TanStack Query manages server state only.

---

### API Service Layer

Responsible for:

- Defining API requests.
- Organizing endpoints.
- Calling backend services.
- Returning standardized responses.

Business logic does not belong inside the API Service Layer.

---

### Axios

Responsible for:

- Sending HTTP requests.
- Receiving HTTP responses.
- Attaching authentication headers.
- Processing request configuration.
- Handling response interceptors.

Axios acts only as the HTTP client.

---

## API Response Flow

Backend API

↓

Axios

↓

API Service

↓

TanStack Query

↓

Hook

↓

Component

↓

Updated UI

---

## Authentication

Protected API requests automatically include the authenticated user's access token.

Authentication is managed centrally.

Individual components should never manually attach authentication credentials.

---

## Error Handling

API communication shall provide standardized handling for:

- Validation Errors
- Authentication Errors
- Authorization Errors
- Network Errors
- Server Errors

Error presentation remains consistent across the application.

---

## Request Lifecycle

User Action

↓

Validate Input

↓

API Request

↓

Backend Processing

↓

Receive Response

↓

Update Cache

↓

Refresh UI

↓

Display Feedback

---

## API Communication Principles

- Centralized API Access
- Standardized Responses
- Secure Communication
- Predictable Data Flow
- Reusable API Services
- Consistent Error Handling

---

## API Communication Rules

- API communication occurs only through the API Service Layer.
- Components never call Axios directly.
- Server State is managed only by TanStack Query.
- Authentication headers are managed centrally.
- API responses follow the approved API Design.
- UI updates occur only after valid backend responses.


-------------------------------------------------------------

## 12. Authentication Flow

The StageFund frontend follows a secure authentication flow to ensure that only authenticated users can access protected features and business operations.

Authentication is performed through the approved backend authentication APIs.

The frontend is responsible for managing the user session, protecting routes, and maintaining a consistent authentication experience.

---

## Authentication Flow

User

↓

Login Page

↓

Form Validation

↓

Authentication API

↓

Backend Authentication

↓

Authentication Success

↓

Store Authentication State

↓

Load User Profile

↓

Redirect to Role Dashboard

---

## Authentication Responsibilities

The frontend is responsible for:

- Collecting login credentials.
- Validating authentication forms.
- Calling authentication APIs.
- Managing authentication state.
- Protecting secured routes.
- Redirecting authenticated users.
- Handling logout.
- Displaying authentication errors.

Authentication decisions remain controlled by the backend.

---

## Login Flow

User Login

↓

Validate Form

↓

Authentication API

↓

Authentication Success

↓

Load User Information

↓

Initialize Application

↓

Navigate to Dashboard

---

## Authenticated Session

After successful authentication, the frontend shall:

- Store authentication state.
- Load authenticated user information.
- Initialize protected application modules.
- Enable role-based navigation.
- Enable protected API communication.

---

## Logout Flow

User Logout

↓

Clear Authentication State

↓

Clear Cached Server Data

↓

Redirect to Login Page

↓

Protected Session Ends

---

## Session Validation

The frontend shall verify authentication before rendering protected pages.

If authentication becomes invalid:

↓

Clear Session

↓

Redirect to Login

↓

Display appropriate feedback where applicable.

---

## Protected Navigation

Protected pages require:

- Successful Authentication
- Valid User Session
- Successful Role Validation

Only authenticated users may access protected application features.

---

## Authentication Failure

If authentication fails:

- Display standardized validation messages.
- Preserve user input where appropriate.
- Allow retry.
- Prevent access to protected resources.

---

## Authentication Design Principles

- Secure Authentication
- Centralized Session Management
- Consistent User Experience
- Protected Navigation
- Predictable Authentication Flow

---

## Authentication Rules

- Authentication is managed centrally.
- Protected pages require successful authentication.
- Authentication state initializes before protected routes render.
- Logout clears authentication state and cached server data.
- Authentication follows the approved Backend Authentication Architecture.

-------------------------------------------------------------

## 13. Authorization (Role-Based UI)

The StageFund frontend follows a Role-Based User Interface (RBUI) architecture to ensure that users can access only the pages, features, and interface elements permitted for their assigned role.

Authorization decisions are enforced by the backend, while the frontend is responsible for presenting the appropriate user interface according to the authenticated user's permissions.

---

## Authorization Flow

Authenticated User

↓

Load User Role

↓

Validate Route Permission

↓

Load Role Layout

↓

Load Role Navigation

↓

Render Authorized Features

---

## Authorization Responsibilities

The frontend is responsible for:

- Loading authenticated user permissions.
- Displaying role-specific navigation.
- Rendering authorized pages.
- Hiding unauthorized interface elements.
- Redirecting unauthorized users.
- Maintaining a consistent role-based experience.

Business authorization decisions remain controlled by the backend.

---

## Supported User Roles

The frontend supports the following roles:

- Customer
- Project Owner
- Administrator

Each role has its own navigation, layouts, pages, and permitted features.

---

## Customer Interface

Customers shall have access only to:

- Customer Dashboard
- Browse Projects
- Project Details
- Investments
- Wallet
- Notifications
- Support
- Profile

Customers shall not have access to Project Owner or Administrator features.

---

## Project Owner Interface

Project Owners shall have access only to:

- Owner Dashboard
- My Projects
- Create Project
- Project Updates
- Withdrawals
- Notifications
- Support
- Profile

Project Owners shall not have access to Customer-only or Administrator features.

---

## Administrator Interface

Administrators shall have access only to:

- Admin Dashboard
- User Verification
- Project Review
- Withdrawal Requests
- Profile Update Requests
- Support Management
- Platform Statistics

Administrative features are restricted to authorized administrators only.

---

## Role-Based Navigation

Navigation menus are generated according to the authenticated user's role.

Each role receives:

- Role-specific Sidebar
- Role-specific Dashboard
- Role-specific Navigation
- Role-specific Quick Actions

Navigation remains consistent throughout the application.

---

## Protected UI

The frontend shall prevent unauthorized users from accessing:

- Restricted Pages
- Restricted Navigation
- Restricted Buttons
- Restricted Actions
- Restricted Menus

Unauthorized interface elements should not be rendered.

---

## Authorization Failure

If authorization validation fails:

↓

Hide Restricted UI

↓

Redirect to Authorized Page

↓

Display appropriate feedback where applicable.

---

## Authorization Design Principles

- Role-Based User Experience
- Minimal UI Exposure
- Consistent Navigation
- Secure Interface Rendering
- Centralized Authorization Handling

---

## Authorization Rules

- Role validation occurs before rendering protected pages.
- Navigation is generated according to the authenticated user's role.
- Unauthorized interface elements are not rendered.
- Frontend authorization complements backend authorization but does not replace it.
- Authorization follows the approved Backend Authorization Architecture and Business Rules.

-------------------------------------------------------------

## 14. Form Management & Validation

The StageFund frontend follows a centralized form management and validation architecture to provide consistent user input handling, predictable validation behavior, and improved user experience across the application.

All user forms follow standardized validation rules before communicating with backend services.

---

## Form Architecture Flow

User Input

↓

Form Component

↓

React Hook Form

↓

Zod Validation

↓

Validation Success

↓

API Service

↓

Backend API

↓

Response

↓

UI Feedback

---

## Form Responsibilities

The frontend is responsible for:

- Collecting user input.
- Validating form data.
- Displaying validation messages.
- Preventing invalid submissions.
- Submitting valid requests.
- Displaying success and error feedback.

Business validation remains the responsibility of the backend.

---

## Supported Forms

The application includes standardized forms for:

- Login
- Registration
- Forgot Password
- Reset Password
- Customer Profile
- Project Owner Profile
- KYC Submission
- Project Creation
- Project Update
- Wallet Operations
- Withdrawal Requests
- Support Tickets

Each form follows a consistent validation and submission process.

---

## React Hook Form

React Hook Form is responsible for:

- Form State Management
- Field Registration
- Form Submission
- Input Tracking
- Validation Integration

---

## Zod Validation

Zod is responsible for:

- Input Validation
- Data Type Validation
- Required Field Validation
- Format Validation
- Custom Validation Rules

Validation rules should remain consistent with the approved API Design and Business Rules.

---

## Validation Flow

User Input

↓

Client-side Validation

↓

Validation Success

↓

API Request

↓

Backend Validation

↓

Business Processing

↓

Response

Client-side validation improves user experience but does not replace backend validation.

---

## Validation Messages

Validation messages should:

- Be clear and user-friendly.
- Identify the affected field.
- Explain the validation issue.
- Guide users toward successful submission.

---

## Submission Flow

User Submit

↓

Disable Duplicate Submission

↓

Display Loading State

↓

Process Request

↓

Receive Response

↓

Display Feedback

↓

Re-enable Form

---

## Form Design Principles

- Consistent User Experience
- Immediate Validation Feedback
- Predictable Form Behavior
- Minimal User Errors
- Standardized Validation
- Accessible Form Design

---

## Form Management Rules

- Every form uses React Hook Form.
- Every form uses Zod validation.
- Forms validate before API requests.
- Duplicate submissions should be prevented.
- Loading and error states should be displayed consistently.
- Backend validation remains the final authority.

-------------------------------------------------------------

## 15. File Upload Architecture

The StageFund frontend follows a standardized file upload architecture to ensure a secure, consistent, and user-friendly file upload experience across the application.

The frontend is responsible for collecting files, performing client-side validation, displaying previews where applicable, and submitting valid files to the approved backend upload APIs.

File storage and security remain the responsibility of the backend.

---

## File Upload Flow

User

↓

Select File

↓

Client-side Validation

↓

Preview (Where Applicable)

↓

Upload Request

↓

Backend Validation

↓

Cloud Storage

↓

File Reference Returned

↓

UI Update

---

## Upload Responsibilities

The frontend is responsible for:

- Selecting files.
- Validating supported file types.
- Validating file size.
- Displaying file previews where applicable.
- Submitting upload requests.
- Displaying upload progress.
- Displaying upload results.

The frontend does not permanently store uploaded files.

---

## Supported Upload Categories

The platform supports file uploads for:

- Customer Profile Image
- Project Owner Profile Image
- Customer Verification Documents
- Project Owner Verification Documents
- Project Images
- Project Supporting Documents

Additional upload categories may be introduced through approved business requirements.

---

## Client-side Validation

Before submission, the frontend should validate:

- File Selection
- Supported File Format
- File Size
- Required Upload Fields

Files failing validation should not be submitted to the backend.

---

## File Preview

Where applicable, the frontend should display a preview before upload.

Examples

- Profile Images
- Project Images

Documents that cannot be previewed should display appropriate file information.

---

## Upload Progress

The frontend should provide upload progress feedback.

Examples

- Upload Started
- Uploading
- Upload Completed
- Upload Failed

Users should receive clear visual feedback throughout the upload process.

---

## Upload Response

After successful upload, the frontend shall:

- Receive backend response.
- Update the corresponding UI.
- Display success feedback.

The frontend should never assume upload success without backend confirmation.

---

## Upload Failure

If upload fails, the frontend shall:

- Display an appropriate error message.
- Preserve the current page state where possible.
- Allow the user to retry the upload.

---

## File Upload Design Principles

- Secure Upload Process
- Consistent User Experience
- Standardized Validation
- Clear User Feedback
- Backend-Controlled Storage
- Reliable Upload Workflow

---

## File Upload Rules

- Files are validated before upload.
- Only approved upload categories are supported.
- Upload success depends on backend confirmation.
- Uploaded files are managed by the approved backend upload workflow.
- Frontend never manages permanent file storage.

-------------------------------------------------------------

## 16. Dashboard Architecture

The StageFund frontend provides role-specific dashboards that serve as the primary entry point after successful authentication.

Each dashboard presents business information, quick actions, operational summaries, and navigation relevant to the authenticated user's role.

Dashboard content is generated according to the authenticated user's permissions and approved business workflows.

---

## Dashboard Architecture Flow

User Login

↓

Authentication

↓

Role Identification

↓

Dashboard Initialization

↓

Dashboard API Requests

↓

Server Data

↓

Dashboard Components

↓

User Interface

---

## Dashboard Categories

The application provides separate dashboards for:

- Customer
- Project Owner
- Administrator

Each dashboard is independent and optimized for its respective business responsibilities.

---

## Customer Dashboard

The Customer Dashboard provides an overview of the customer's investment activities.

Primary Information

- Investment Summary
- Wallet Balance
- Active Investments
- Completed Investments
- Recent Transactions
- Project Updates
- Notifications

Primary Actions

- Browse Projects
- View Investments
- Manage Wallet
- View Notifications
- Open Support Tickets

---

## Project Owner Dashboard

The Project Owner Dashboard provides business information related to project management and funding activities.

Primary Information

- Project Summary
- Funding Progress
- Live Projects
- Draft Projects
- Withdrawal Summary
- Notifications

Primary Actions

- Create Project
- Manage Projects
- Publish Project Updates
- Request Withdrawals
- Open Support Tickets

---

## Administrator Dashboard

The Administrator Dashboard provides operational monitoring and administrative controls.

Primary Information

- Platform Statistics
- Customer Statistics
- Project Statistics
- Pending Verifications
- Pending Project Reviews
- Pending Withdrawal Requests
- Support Overview
- System Notifications

Primary Actions

- Verify Users
- Review Projects
- Manage Withdrawals
- Review Profile Updates
- Manage Support Requests

---

## Dashboard Components

Dashboards are composed of reusable components.

Examples

- Summary Cards
- Statistics Cards
- Charts
- Tables
- Recent Activity Lists
- Notification Panels
- Quick Action Panels

Reusable dashboard components remain independent from business logic.

---

## Dashboard Data Loading

Dashboard data is loaded through the approved API Service Layer using TanStack Query.

Dashboard information should remain synchronized with backend data.

Loading, caching, and refresh operations follow the approved State Management Architecture.

---

## Dashboard Refresh

Dashboard information should update automatically when business data changes according to the approved data synchronization strategy.

Users may also manually refresh dashboard information where supported.

---

## Dashboard Design Principles

- Role-Based Experience
- Action-Oriented Design
- Consistent Information Hierarchy
- Reusable Components
- Responsive Layout
- Efficient Data Presentation

---

## Dashboard Architecture Rules

- Each role has an independent dashboard.
- Dashboard content is generated according to the authenticated user's role.
- Dashboard data is retrieved only through approved backend APIs.
- Dashboard components remain reusable.
- Dashboard follows the approved Routing, State Management, and API Communication architectures.

-------------------------------------------------------------

## 17. Error Handling

The StageFund frontend follows a centralized error handling architecture to provide a consistent, user-friendly, and predictable error management experience throughout the application.

Errors are handled at the appropriate application layer while ensuring that users receive clear feedback without exposing internal implementation details.

---

## Error Handling Flow

User Action

↓

Validation

↓

API Request

↓

Backend Processing

↓

Response

↓

Error Detection

↓

Error Processing

↓

User Feedback

---

## Error Categories

The frontend shall handle the following categories of errors:

- Validation Errors
- Authentication Errors
- Authorization Errors
- Network Errors
- Server Errors
- File Upload Errors
- Unexpected Application Errors

Each category follows a standardized handling process.

---

## Validation Errors

Validation errors occur before an API request is submitted.

Examples

- Required fields
- Invalid email format
- Invalid phone number
- Invalid input format

Validation errors should be displayed near the affected input field whenever applicable.

---

## Authentication Errors

Authentication errors occur when user authentication is invalid.

Examples

- Invalid credentials
- Session expired
- Invalid session

The frontend shall redirect users according to the approved Authentication Flow.

---

## Authorization Errors

Authorization errors occur when users attempt to access restricted resources.

Examples

- Restricted page access
- Restricted actions
- Restricted features

Unauthorized interface elements should remain inaccessible.

---

## Network Errors

Network errors occur when communication with backend services is interrupted.

Examples

- No Internet Connection
- Request Timeout
- Network Failure

Users should receive clear feedback and an opportunity to retry the operation.

---

## Server Errors

Server errors occur when backend processing cannot complete successfully.

Examples

- Internal Server Error
- Service Unavailable
- Unexpected Server Failure

The frontend shall display standardized user-friendly messages.

Internal technical details must never be displayed to users.

---

## File Upload Errors

File upload errors include:

- Invalid file format
- File size exceeded
- Upload interrupted
- Upload failed

Users should be able to retry uploads where appropriate.

---

## Unexpected Errors

Unexpected application errors shall be handled gracefully.

The frontend should prevent application crashes wherever possible.

Users should receive an appropriate fallback experience.

---

## Error Feedback

Error feedback should:

- Be clear.
- Be user-friendly.
- Explain the issue.
- Suggest the next action where applicable.

---

## Error Recovery

Where possible, users should be able to:

- Retry failed operations.
- Continue unaffected workflows.
- Return to a safe application state.

---

## Error Handling Principles

- Consistent Error Messages
- User-Friendly Feedback
- Secure Error Presentation
- Graceful Recovery
- Predictable Error Handling
- No Internal Information Exposure

---

## Error Handling Rules

- Errors are handled centrally whenever possible.
- Technical implementation details are never exposed to users.
- Validation follows the approved Form Validation Architecture.
- Authentication and Authorization errors follow the approved Security Architecture.
- API errors follow the approved API Communication Architecture.

-------------------------------------------------------------------

## 18. Notification Handling

## 18. Notification Handling

The StageFund frontend follows a centralized notification architecture to provide timely, consistent, and role-specific communication throughout the application.

Notifications keep users informed about important business activities, account updates, financial operations, project events, and administrative actions.

The frontend is responsible for displaying and managing notifications received from the approved backend notification services.

---

## Notification Flow

Business Event

↓

Backend Notification Service

↓

Notification API

↓

TanStack Query

↓

Notification State

↓

Notification UI

↓

User

---

## Notification Categories

The application supports the following notification categories:

- Account Notifications
- KYC Notifications
- Project Notifications
- Investment Notifications
- Wallet Notifications
- Withdrawal Notifications
- Support Notifications
- Administrative Notifications

Additional notification categories may be introduced through approved business requirements.

---

## Notification Responsibilities

The frontend is responsible for:

- Retrieving notifications.
- Displaying notifications.
- Maintaining notification status.
- Displaying unread notification count.
- Allowing users to view notification history.
- Synchronizing notification state with backend services.

Business notification generation remains the responsibility of the backend.

---

## Notification Types

### In-App Notifications

Displayed inside the application.

Examples

- Notification Center
- Notification Dropdown
- Dashboard Notification Panel

---

### Toast Notifications

Displayed for immediate user feedback.

Examples

- Investment Successful
- Wallet Updated
- Project Created
- Profile Updated
- Support Ticket Submitted

Toast notifications are temporary and should not replace persistent notification history.

---

## Notification Center

The Notification Center provides a centralized location for viewing notification history.

Users shall be able to:

- View notifications.
- View unread notifications.
- View read notifications.
- Mark notifications as read.
- Access notification details where applicable.

---

## Role-Based Notifications

Notifications are displayed according to the authenticated user's role.

Customer

- Investment Updates
- Wallet Activities
- Project Updates
- Support Updates

Project Owner

- Project Reviews
- Funding Progress
- Withdrawal Updates
- Support Updates

Administrator

- Verification Requests
- Project Reviews
- Withdrawal Requests
- Platform Alerts

Users shall receive only notifications relevant to their role and activities.

---

## Notification Synchronization

Notifications shall remain synchronized with backend notification data.

Unread counts and notification status should accurately reflect the latest backend information.

---

## Notification Lifecycle

Business Event

↓

Notification Generated

↓

Notification Delivered

↓

Notification Displayed

↓

User Reads Notification

↓

Notification Marked as Read

↓

Notification History Updated

---

## Notification Design Principles

- Timely Information
- Consistent User Experience
- Role-Based Delivery
- Clear Notification Messages
- Persistent Notification History
- Minimal User Disruption

---

## Notification Handling Rules

- Notifications are retrieved only through approved backend APIs.
- Notification history remains synchronized with backend data.
- Toast notifications provide immediate feedback only.
- Persistent notifications remain available in the Notification Center.
- Notification handling follows the approved API Communication and State Management architectures.

-------------------------------------------------------------------

## 19. Performance Optimization

The StageFund frontend shall be designed to provide a fast, responsive, and efficient user experience while supporting future business growth.

Performance optimization shall be applied throughout the application architecture to ensure smooth navigation, efficient data loading, and optimal resource utilization.

---

## Performance Objectives

The frontend shall:

- Minimize unnecessary rendering.
- Minimize unnecessary API requests.
- Optimize page loading.
- Optimize application responsiveness.
- Provide smooth user interactions.
- Maintain consistent performance across supported features.

---

## Performance Strategy

Performance optimization is achieved through:

- Efficient Component Rendering
- Optimized State Management
- API Response Caching
- Lazy Resource Loading
- Reusable Components
- Efficient Data Fetching

---

## Page Loading

Pages should load only the information required for the current user interaction.

Additional resources should be loaded only when required by approved business workflows.

---

## API Performance

API communication shall:

- Avoid duplicate requests.
- Reuse cached server data where appropriate.
- Synchronize data efficiently.
- Reduce unnecessary network traffic.

API optimization follows the approved State Management and API Communication architectures.

---

## Rendering Performance

The frontend should minimize unnecessary component updates.

Reusable components should render only when their required data changes.

---

## Large Data Handling

The application shall efficiently handle large datasets through approved UI patterns such as:

- Pagination
- Searching
- Filtering
- Sorting

Large datasets should not be rendered unnecessarily.

---

## Resource Optimization

The frontend should optimize application resources including:

- Images
- Icons
- Fonts
- Static Assets

Only required resources should be loaded.

---

## Dashboard Performance

Dashboard data should load efficiently while maintaining accurate business information.

Dashboard updates should avoid unnecessary refresh operations.

---

## Performance Monitoring

The application should support monitoring of frontend performance to identify and improve user experience where necessary.

---

## Performance Design Principles

- Fast User Experience
- Efficient Rendering
- Optimized Data Loading
- Minimal Resource Usage
- Predictable Performance
- Scalable Architecture

---

## Performance Rules

- Performance optimization follows the approved Frontend Architecture.
- API requests should remain efficient.
- Rendering should remain predictable.
- Shared resources should remain reusable.
- Performance improvements must preserve approved business workflows.

-------------------------------------------------------------------
## 20. Security Architecture

The StageFund frontend follows a secure application architecture that protects users, business operations, and sensitive information while working together with the approved Backend Security Architecture.

The frontend contributes to application security by enforcing secure user interactions, protected navigation, and safe communication with backend services.

Final authorization and business security decisions remain the responsibility of the backend.

---

## Security Objectives

The frontend shall:

- Protect authenticated user sessions.
- Prevent unauthorized page access.
- Protect sensitive application information.
- Ensure secure communication with backend services.
- Prevent accidental exposure of restricted interface elements.

---

## Secure Communication

All frontend communication with backend services shall occur through the approved API Communication Architecture.

Protected API requests shall include the authenticated user's authorization credentials according to the approved authentication workflow.

---

## Route Security

Protected routes require:

- Successful Authentication
- Valid Session
- Successful Role Validation

Unauthorized users shall not access protected pages.

---

## User Interface Security

The frontend shall:

- Hide restricted navigation.
- Hide unauthorized actions.
- Hide restricted pages.
- Display only role-appropriate interface elements.

Frontend authorization complements backend authorization and never replaces it.

---

## Sensitive Information

Sensitive business information shall never be unnecessarily exposed through the user interface.

The frontend shall display only the information permitted for the authenticated user's role.

---

## Session Security

The frontend shall:

- Initialize authenticated sessions securely.
- End sessions through the approved logout workflow.
- Remove cached protected data after logout.
- Prevent access to protected pages after session termination.

---

## File Upload Security

File uploads shall follow the approved File Upload Architecture.

Client-side validation improves user experience, while backend validation remains the final authority.

---

## Security Design Principles

- Secure by Design
- Least Privilege
- Role-Based Access
- Secure Communication
- Protected Navigation
- Backend-Driven Security

---

## Security Rules

- Business security decisions remain on the backend.
- Protected pages require authentication.
- Protected UI requires authorization.
- Sensitive information is displayed only to authorized users.
- Frontend security follows the approved Backend Security Architecture and Business Rules.

-------------------------------------------------------------------

## 21. Configuration Management

## 21. Configuration Management

The StageFund frontend follows a centralized configuration management architecture to ensure consistency, maintainability, and flexibility across different application environments.

Application configuration is maintained separately from business logic to simplify deployment, environment management, and future enhancements.

---

## Configuration Objectives

The configuration architecture shall:

- Centralize application configuration.
- Support multiple deployment environments.
- Prevent configuration duplication.
- Simplify application maintenance.
- Keep business logic independent from configuration.

---

## Configuration Categories

The application configuration includes:

- Environment Configuration
- API Configuration
- Application Configuration
- Feature Configuration
- Route Configuration
- UI Configuration

Each category has a clearly defined responsibility.

---

## Environment Configuration

Environment configuration manages values that differ between deployment environments.

Examples

- API Base URL
- Application Environment
- External Service Configuration

Environment-specific values shall remain outside business logic.

---

## API Configuration

API configuration manages communication with backend services.

Examples

- API Base URL
- Request Configuration
- Response Configuration
- Request Timeout Configuration

API configuration follows the approved API Communication Architecture.

---

## Application Configuration

Application configuration defines shared frontend settings.

Examples

- Application Name
- Default Language
- Default Theme
- Pagination Defaults
- Date and Time Format

Application configuration should remain centralized.

---

## Feature Configuration

Feature configuration controls application features through centralized configuration.

Examples

- Dashboard Configuration
- Notification Configuration
- File Upload Configuration
- Form Configuration

Feature-specific configuration should remain independent from feature implementation.

---

## Route Configuration

Route configuration defines application navigation.

Examples

- Public Routes
- Protected Routes
- Role-Based Routes
- Default Redirects

Routing configuration follows the approved Routing Architecture.

---

## UI Configuration

UI configuration manages reusable interface settings.

Examples

- Navigation Configuration
- Sidebar Configuration
- Dashboard Widgets
- Table Defaults

UI configuration supports a consistent user experience.

---

## Configuration Design Principles

- Centralized Configuration
- Environment Independence
- Minimal Duplication
- Easy Maintenance
- Predictable Configuration
- Scalable Architecture

---

## Configuration Management Rules

- Configuration remains separate from business logic.
- Environment-specific values are managed centrally.
- API configuration follows the approved API Communication Architecture.
- Routing configuration follows the approved Routing Architecture.
- Feature configuration remains modular and reusable.
- Hardcoded configuration values should be avoided whenever possible.
-------------------------------------------------------------------

## 22. Frontend Business Rules

## 22. Frontend Business Rules

The following business rules define the mandatory frontend development standards for the StageFund application.

All frontend implementations must comply with these rules to maintain consistency, scalability, maintainability, security, and alignment with the approved project architecture.

These rules apply to every page, component, feature, and future enhancement.

---

## 22.1 General Rules

- Every frontend implementation shall follow the approved Frontend Architecture.
- Every feature shall follow the approved Application Workflow.
- Business logic shall remain independent from UI components.
- Code duplication should be avoided whenever possible.
- Reusable solutions shall be preferred over repeated implementations.
- Every feature shall remain modular and maintainable.

---

## 22.2 Feature Rules

- Every business module shall remain inside its own feature directory.
- Features shall remain independent from each other.
- Shared functionality shall be extracted into reusable modules.
- Feature implementation shall not directly modify another feature.

---

## 22.3 Page Rules

- Every page shall belong to one feature.
- Every page shall use one approved layout.
- Pages shall coordinate workflows only.
- Pages shall not contain reusable UI components.
- Pages shall remain lightweight and maintainable.

---

## 22.4 Component Rules

- Every component shall have a single responsibility.
- Shared components shall remain reusable.
- Feature components shall remain inside their respective features.
- Presentational components shall not contain business logic.
- Container components shall coordinate feature workflows.

---

## 22.5 State Management Rules

- Local state shall remain inside components.
- Shared UI state shall be managed through Context API.
- Server state shall be managed through TanStack Query.
- Server data shall not be unnecessarily duplicated.
- State updates shall remain predictable.

---

## 22.6 API Communication Rules

- API communication shall occur only through the approved API Service Layer.
- Components shall never communicate directly with backend APIs.
- Axios shall remain the approved HTTP client.
- API responses shall follow the approved API Design.
- Backend remains the final authority for business validation.

---

## 22.7 Routing Rules

- Protected routes require successful authentication.
- Role validation shall occur before rendering protected pages.
- Unauthorized users shall not access restricted routes.
- Navigation shall remain role-specific.
- Routing shall remain centralized.

---

## 22.8 Security Rules

- Protected pages require authentication.
- Protected features require authorization.
- Sensitive information shall not be exposed unnecessarily.
- Frontend authorization complements backend authorization.
- Security decisions remain the responsibility of the backend.

---

## 22.9 Form Rules

- Every form shall use React Hook Form.
- Every form shall use Zod validation.
- Forms shall validate before submission.
- Duplicate form submissions shall be prevented.
- Backend validation remains mandatory.

---

## 22.10 File Upload Rules

- Files shall be validated before upload.
- Upload progress shall be displayed where applicable.
- Upload success depends on backend confirmation.
- Permanent file storage remains the responsibility of the backend.

---

## 22.11 Dashboard Rules

- Every user role shall have its own dashboard.
- Dashboard components shall remain reusable.
- Dashboard data shall be loaded through approved APIs.
- Dashboard information shall remain synchronized with backend data.

---

## 22.12 Notification Rules

- Notifications shall remain synchronized with backend services.
- Toast notifications provide immediate feedback only.
- Persistent notifications remain available through the Notification Center.
- Notifications shall remain role-specific.

---

## 22.13 Error Handling Rules

- Errors shall be handled consistently.
- User-friendly messages shall be displayed.
- Internal technical details shall never be exposed.
- Recovery actions shall be provided where appropriate.

---

## 22.14 Performance Rules

- Unnecessary rendering should be avoided.
- Duplicate API requests should be minimized.
- Shared resources should remain reusable.
- Large datasets shall use approved UI patterns such as pagination, filtering, and searching.

---

## 22.15 Configuration Rules

- Configuration shall remain centralized.
- Hardcoded configuration values should be avoided.
- Environment-specific values shall remain outside business logic.
- Configuration shall support future scalability.

---

## 22.16 AI Implementation Rules

AI-assisted development must follow the approved project architecture.

AI-generated code shall:

- Follow the approved folder structure.
- Follow the approved feature architecture.
- Follow the approved component architecture.
- Follow the approved API communication architecture.
- Follow the approved state management architecture.
- Follow the approved business workflows.
- Reuse existing components whenever possible.
- Avoid duplicate implementations.
- Preserve coding consistency across the application.
- Respect all approved project documentation before generating code.

AI-generated implementations shall never introduce architectural changes without explicit approval.

---

## 22.17 Documentation Compliance

Every frontend implementation shall remain consistent with the approved project documentation, including:

- Project BRD
- Application Workflow
- Backend Architecture
- Database Design
- API Design
- Authorization Architecture
- Authentication Architecture
- AI Implementation Rules

No frontend implementation shall conflict with the approved documentation.

---------------------------------------------------------------------