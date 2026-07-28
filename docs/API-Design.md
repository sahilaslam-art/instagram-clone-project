# StageFund API Design

## 1. API Overview

### Purpose

This document defines the complete API structure of the StageFund platform. It describes how the Frontend, Backend, and Database communicate with each other through secure REST APIs.

Every API in this document is derived from the approved Business Requirements Document (BRD), Application Workflow, and Database Design.

The API design supports the following modules:

- Authentication
- Customer Management
- Owner Management
- Admin Management
- Project Management
- Investment Management
- Wallet Management
- KYC Verification
- Project Updates
- Support Ticket Management
- Notification Management
- Owner Profile Update Requests
- Owner Withdrawal Requests
- Dashboard Management

---

### API Architecture

Frontend

↓

REST API

↓

Backend Services

↓

Database

---

### API Design Principles

- All APIs follow REST architecture.
- Every request must be validated before processing.
- Every response follows a common response structure.
- Authentication is required for protected APIs.
- Authorization is based on User Role.
- Business rules are validated before database operations.
- APIs return appropriate success or error responses.
- All financial operations maintain complete transaction history.

---

### API Categories

- Public APIs
- Protected APIs
- Customer APIs
- Owner APIs
- Admin APIs

---

### HTTP Methods

- GET → Retrieve data
- POST → Create data
- PUT → Update existing data
- PATCH → Partial update
- DELETE → Remove data (only where allowed)

---

### Authentication

Protected APIs require a valid authenticated user session.

Role-based authorization determines which APIs can be accessed by:

- Customer
- Owner
- Admin

---

### API Version

Current Version

v1

-------------------------------------------------------------

## 2. Authentication APIs

### Purpose

This module manages user registration, authentication, account verification, login, and logout for Customers and Owners.

---

## 2.1 Register User

### Endpoint

POST /api/v1/auth/register

### Description

Creates a new Customer or Owner account after validating the registration details.

### Authentication

Not Required

### Request Body

- Full Name
- Mobile Number
- Email Address
- Password
- User Role (Customer / Owner)

### Success Response

- Account Created Successfully
- User ID
- Registration Confirmation

### Error Response

- Email Already Exists
- Mobile Number Already Exists
- Invalid Input
- Missing Required Fields

### Business Rules

- Email must be unique.
- Mobile Number must be unique.
- User Role must be either Customer or Owner.
- Password must be securely encrypted before storing.

---

## 2.2 Verify Mobile Number

### Endpoint

POST /api/v1/auth/verify-mobile

### Description

Verifies the user's mobile number using the OTP sent during registration.

### Authentication

Not Required

### Request Body

- Mobile Number
- OTP

### Success Response

- Mobile Number Verified Successfully

### Error Response

- Invalid OTP
- OTP Expired
- Mobile Number Not Found

### Business Rules

- Mobile verification is mandatory before account activation.

---

## 2.3 Verify Email Address

### Endpoint

POST /api/v1/auth/verify-email

### Description

Verifies the user's email address using the OTP sent during registration.

### Authentication

Not Required

### Request Body

- Email Address
- OTP

### Success Response

- Email Verified Successfully

### Error Response

- Invalid OTP
- OTP Expired
- Email Address Not Found

### Business Rules

- Email verification is mandatory before account activation.

---

## 2.4 Login

### Endpoint

POST /api/v1/auth/login

### Description

Authenticates a Customer, Owner, or Admin and grants access to the respective dashboard.

### Authentication

Not Required

### Request Body

- Email Address or Mobile Number
- Password

### Success Response

- Login Successful
- Access Token
- User Information
- User Role

### Error Response

- Invalid Credentials
- Account Not Found
- Account Inactive

### Business Rules

- Users can log in using either Email Address or Mobile Number.
- Password must match the encrypted password stored in the database.
- User is redirected according to their role after successful authentication.

---

## 2.5 Logout

### Endpoint

POST /api/v1/auth/logout

### Description

Logs out the currently authenticated user.

### Authentication

Required

### Request Body

Not Required

### Success Response

- Logout Successful

### Error Response

- Unauthorized Access

### Business Rules

- User session becomes invalid after logout.
- Protected APIs cannot be accessed after logout.
-----------------------------------------------------------

## 3. Customer APIs

### Purpose

This module manages all Customer-related operations including project browsing, investments, wallet management, profile management, and support services.

---

## 3.1 Get Customer Dashboard

### Endpoint

GET /api/v1/customer/dashboard

### Description

Returns the complete Customer dashboard summary.

### Authentication

Required (Customer)

### Success Response

- Customer Information
- Wallet Summary
- Live Investments Summary
- Finished Investments Summary
- Recent Notifications

### Error Response

- Unauthorized Access

### Business Rules

- Only authenticated Customers can access this API.

---

## 3.2 Get Available Projects

### Endpoint

GET /api/v1/customer/projects

### Description

Returns all Stage projects available for investment.

### Authentication

Required (Customer)

### Query Parameters

- Category
- Location
- Risk Level
- Minimum Investment
- Maximum Investment

### Success Response

- Project List

### Error Response

- No Projects Found

### Business Rules

- Only Stage projects are returned.

---

## 3.3 Get Project Details

### Endpoint

GET /api/v1/customer/projects/:projectId

### Description

Returns complete details of a selected project.

### Authentication

Required (Customer)

### Success Response

- Complete Project Details

### Error Response

- Project Not Found

### Business Rules

- Customers can view only Stage projects.

---

## 3.4 Add Project to Cart

### Endpoint

POST /api/v1/customer/cart

### Description

Adds a project to the Customer's cart.

### Authentication

Required (Customer)

### Request Body

- Project ID

### Success Response

- Project Added Successfully

### Error Response

- Project Already Added
- Project Not Found

### Business Rules

- Only Stage projects can be added to the cart.

---

## 3.5 Get My Cart

### Endpoint

GET /api/v1/customer/cart

### Description

Returns all projects added to the Customer's cart.

### Authentication

Required (Customer)

### Success Response

- Cart Items

### Error Response

- Cart Empty

---

## 3.6 Remove Project from Cart

### Endpoint

DELETE /api/v1/customer/cart/:projectId

### Description

Removes a project from the Customer's cart.

### Authentication

Required (Customer)

### Success Response

- Project Removed Successfully

### Error Response

- Project Not Found

---

## 3.7 Invest in Project

### Endpoint

POST /api/v1/customer/investments

### Description

Creates a new investment in a Stage project.

### Authentication

Required (Customer)

### Request Body

- Project ID
- Investment Amount

### Success Response

- Investment Successful

### Error Response

- Insufficient Wallet Balance
- Minimum Investment Not Met
- Customer Not Verified
- Project Not Available

### Business Rules

- Customer must be Verified.
- Wallet balance must be sufficient.
- Investment amount must satisfy the project's minimum investment requirement.

---

## 3.8 Get Live Investments

### Endpoint

GET /api/v1/customer/investments/live

### Description

Returns all active investments.

### Authentication

Required (Customer)

### Success Response

- Live Investment List

---

## 3.9 Get Finished Investments

### Endpoint

GET /api/v1/customer/investments/finished

### Description

Returns completed investments.

### Authentication

Required (Customer)

### Success Response

- Finished Investment List
- Profit / Loss
- Returns

---

## 3.10 Get Wallet

### Endpoint

GET /api/v1/customer/wallet

### Description

Returns Customer wallet details.

### Authentication

Required (Customer)

### Success Response

- Wallet Balance
- Wallet Summary

---

## 3.11 Add Funds

### Endpoint

POST /api/v1/customer/wallet/add-funds

### Description

Adds funds to the Customer wallet.

### Authentication

Required (Customer)

### Request Body

- Amount

### Success Response

- Funds Added Successfully

### Error Response

- Payment Failed

---

## 3.12 Withdraw Funds

### Endpoint

POST /api/v1/customer/wallet/withdraw

### Description

Withdraws available wallet balance.

### Authentication

Required (Customer)

### Request Body

- Amount

### Success Response

- Withdrawal Successful

### Error Response

- Insufficient Balance

---

## 3.13 Get Customer Profile

### Endpoint

GET /api/v1/customer/profile

### Description

Returns Customer profile information.

### Authentication

Required (Customer)

---

## 3.14 Update Customer Profile

### Endpoint

PUT /api/v1/customer/profile

### Description

Updates Customer profile information.

### Authentication

Required (Customer)

### Request Body

- Profile Information

### Success Response

- Profile Updated Successfully

---

## 3.15 Submit KYC

### Endpoint

POST /api/v1/customer/kyc

### Description

Submits Customer profile verification details.

### Authentication

Required (Customer)

### Request Body

- Personal Information
- Bank Information
- KYC Documents

### Success Response

- Verification Submitted Successfully

---

## 3.16 Get Notifications

### Endpoint

GET /api/v1/customer/notifications

### Description

Returns Customer notifications.

### Authentication

Required (Customer)

---

## 3.17 Raise Support Ticket

### Endpoint

POST /api/v1/customer/support

### Description

Creates a new support ticket.

### Authentication

Required (Customer)

### Request Body

- Subject
- Category
- Description

### Success Response

- Ticket Created Successfully

---

## 3.18 Get My Support Tickets

### Endpoint

GET /api/v1/customer/support

### Description

Returns all support tickets created by the Customer.

### Authentication

Required (Customer)

-------------------------------------------------------------

## 4. Owner APIs

### Purpose

This module manages all Owner-related operations including project creation, project submission, funding tracking, project updates, wallet management, profile management, and support services.

---

## 4.1 Get Owner Dashboard

### Endpoint

GET /api/v1/owner/dashboard

### Description

Returns the complete Owner dashboard summary.

### Authentication

Required (Owner)

### Success Response

- Owner Information
- Project Summary
- Wallet Summary
- Recent Notifications

### Error Response

- Unauthorized Access

---

## 4.2 Create Project

### Endpoint

POST /api/v1/owner/projects

### Description

Creates a new investment project.

### Authentication

Required (Owner)

### Request Body

- Project Information

### Success Response

- Project Created Successfully

### Error Response

- Owner Not Verified
- Invalid Project Information

### Business Rules

- Only Verified Owners can create projects.
- New projects are created with the Created status.

---

## 4.3 Get Created Projects

### Endpoint

GET /api/v1/owner/projects/created

### Description

Returns all Created (Draft) projects.

### Authentication

Required (Owner)

---

## 4.4 Update Created Project

### Endpoint

PUT /api/v1/owner/projects/:projectId

### Description

Updates a Created project.

### Authentication

Required (Owner)

### Request Body

- Updated Project Information

### Success Response

- Project Updated Successfully

### Error Response

- Project Not Found

### Business Rules

- Only Created or Rejected projects can be updated.

---

## 4.5 Submit Project

### Endpoint

POST /api/v1/owner/projects/:projectId/submit

### Description

Submits a project for Admin review.

### Authentication

Required (Owner)

### Success Response

- Project Submitted Successfully

### Error Response

- Project Already Submitted
- Incomplete Project Information

---

## 4.6 Get Submitted Projects

### Endpoint

GET /api/v1/owner/projects/submitted

### Description

Returns all Submitted projects.

### Authentication

Required (Owner)

---

## 4.7 Get Stage Projects

### Endpoint

GET /api/v1/owner/projects/stage

### Description

Returns all Stage projects.

### Authentication

Required (Owner)

---

## 4.8 Get Live Projects

### Endpoint

GET /api/v1/owner/projects/live

### Description

Returns all Live projects.

### Authentication

Required (Owner)

---

## 4.9 Post Project Update

### Endpoint

POST /api/v1/owner/projects/:projectId/updates

### Description

Publishes a new update for a Live project.

### Authentication

Required (Owner)

### Request Body

- Update Title
- Update Description

### Success Response

- Update Published Successfully

### Error Response

- Project Not Live

### Business Rules

- Updates can be published only for Live projects.

---

## 4.10 Update Project Update

### Endpoint

PUT /api/v1/owner/projects/:projectId/updates/:updateId

### Description

Updates an existing project update.

### Authentication

Required (Owner)

### Request Body

- Updated Title
- Updated Description

### Success Response

- Update Edited Successfully

### Error Response

- Update Not Found

---

## 4.11 Get Finished Projects

### Endpoint

GET /api/v1/owner/projects/finished

### Description

Returns all Finished projects.

### Authentication

Required (Owner)

---

## 4.12 Get Wallet

### Endpoint

GET /api/v1/owner/wallet

### Description

Returns Owner wallet information.

### Authentication

Required (Owner)

---

## 4.13 Add Funds

### Endpoint

POST /api/v1/owner/wallet/add-funds

### Description

Adds funds to the Owner wallet.

### Authentication

Required (Owner)

---

## 4.14 Create Withdrawal Request

### Endpoint

POST /api/v1/owner/withdrawals

### Description

Creates a withdrawal request.

### Authentication

Required (Owner)

### Request Body

- Project ID
- Withdrawal Amount

### Success Response

- Withdrawal Request Submitted Successfully

### Error Response

- Insufficient Withdrawable Balance

### Business Rules

- Withdrawal amount cannot exceed the available Withdrawable Balance.

---

## 4.15 Get Withdrawal Requests

### Endpoint

GET /api/v1/owner/withdrawals

### Description

Returns all Owner withdrawal requests.

### Authentication

Required (Owner)

---

## 4.16 Get Owner Profile

### Endpoint

GET /api/v1/owner/profile

### Description

Returns Owner profile information.

### Authentication

Required (Owner)

---

## 4.17 Submit Profile Update Request

### Endpoint

POST /api/v1/owner/profile/update-request

### Description

Submits a profile update request for Admin approval.

### Authentication

Required (Owner)

### Request Body

- Updated Profile Information

### Success Response

- Update Request Submitted Successfully

---

## 4.18 Submit KYC

### Endpoint

POST /api/v1/owner/kyc

### Description

Submits Owner verification details.

### Authentication

Required (Owner)

---

## 4.19 Get Notifications

### Endpoint

GET /api/v1/owner/notifications

### Description

Returns Owner notifications.

### Authentication

Required (Owner)

---

## 4.20 Raise Support Ticket

### Endpoint

POST /api/v1/owner/support

### Description

Creates a new support ticket.

### Authentication

Required (Owner)

---

## 4.21 Get My Support Tickets

### Endpoint

GET /api/v1/owner/support

### Description

Returns all support tickets created by the Owner.

### Authentication

Required (Owner)

--------------------------------------------------------------


## 5. Admin APIs

### Purpose

This module manages all administrative operations including Customer verification, Owner verification, Project validation, Project monitoring, Owner profile update approval, Withdrawal approvals, and platform management.

---

## 5.1 Get Admin Dashboard

### Endpoint

GET /api/v1/admin/dashboard

### Description

Returns the complete Admin dashboard summary.

### Authentication

Required (Admin)

### Success Response

- Pending Customer Verifications
- Pending Owner Verifications
- Pending Projects
- Live Projects Summary
- Pending Withdrawal Requests
- Recent Notifications

### Error Response

- Unauthorized Access

---

## 5.2 Get Customer Verification Requests

### Endpoint

GET /api/v1/admin/customer-verifications

### Description

Returns all pending Customer verification requests.

### Authentication

Required (Admin)

---

## 5.3 Get Customer Verification Details

### Endpoint

GET /api/v1/admin/customer-verifications/:verificationId

### Description

Returns complete Customer verification details.

### Authentication

Required (Admin)

---

## 5.4 Approve Customer Verification

### Endpoint

PUT /api/v1/admin/customer-verifications/:verificationId/approve

### Description

Approves Customer verification.

### Authentication

Required (Admin)

---

## 5.5 Reject Customer Verification

### Endpoint

PUT /api/v1/admin/customer-verifications/:verificationId/reject

### Description

Rejects Customer verification.

### Authentication

Required (Admin)

### Request Body

- Rejection Reason

---

## 5.6 Get Owner Verification Requests

### Endpoint

GET /api/v1/admin/owner-verifications

### Description

Returns all pending Owner verification requests.

### Authentication

Required (Admin)

---

## 5.7 Get Owner Verification Details

### Endpoint

GET /api/v1/admin/owner-verifications/:verificationId

### Description

Returns complete Owner verification details.

### Authentication

Required (Admin)

---

## 5.8 Approve Owner Verification

### Endpoint

PUT /api/v1/admin/owner-verifications/:verificationId/approve

### Description

Approves Owner verification.

### Authentication

Required (Admin)

---

## 5.9 Reject Owner Verification

### Endpoint

PUT /api/v1/admin/owner-verifications/:verificationId/reject

### Description

Rejects Owner verification.

### Authentication

Required (Admin)

### Request Body

- Rejection Reason

---

## 5.10 Get Submitted Projects

### Endpoint

GET /api/v1/admin/projects/submitted

### Description

Returns all Submitted projects awaiting review.

### Authentication

Required (Admin)

---

## 5.11 Get Submitted Project Details

### Endpoint

GET /api/v1/admin/projects/:projectId

### Description

Returns complete project information.

### Authentication

Required (Admin)

---

## 5.12 Approve Project

### Endpoint

PUT /api/v1/admin/projects/:projectId/approve

### Description

Approves a Submitted project.

### Authentication

Required (Admin)

---

## 5.13 Reject Project

### Endpoint

PUT /api/v1/admin/projects/:projectId/reject

### Description

Rejects a Submitted project.

### Authentication

Required (Admin)

### Request Body

- Rejection Reason

---

## 5.14 Get Live Projects

### Endpoint

GET /api/v1/admin/projects/live

### Description

Returns all Live projects.

### Authentication

Required (Admin)

---

## 5.15 Add Internal Note

### Endpoint

POST /api/v1/admin/projects/:projectId/notes

### Description

Creates an internal monitoring note.

### Authentication

Required (Admin)

### Request Body

- Note Title
- Note Description

---

## 5.16 Update Internal Note

### Endpoint

PUT /api/v1/admin/projects/:projectId/notes/:noteId

### Description

Updates an existing internal note.

### Authentication

Required (Admin)

---

## 5.17 Mark Project as Finished

### Endpoint

PUT /api/v1/admin/projects/:projectId/finish

### Description

Marks a Live project as Finished after successful verification and settlement.

### Authentication

Required (Admin)

---

## 5.18 Get Owner Profile Update Requests

### Endpoint

GET /api/v1/admin/profile-update-requests

### Description

Returns all Owner profile update requests.

### Authentication

Required (Admin)

---

## 5.19 Approve Owner Profile Update

### Endpoint

PUT /api/v1/admin/profile-update-requests/:requestId/approve

### Description

Approves the requested Owner profile changes.

### Authentication

Required (Admin)

---

## 5.20 Reject Owner Profile Update

### Endpoint

PUT /api/v1/admin/profile-update-requests/:requestId/reject

### Description

Rejects the Owner profile update request.

### Authentication

Required (Admin)

### Request Body

- Rejection Reason

---

## 5.21 Get Owner Withdrawal Requests

### Endpoint

GET /api/v1/admin/withdrawals

### Description

Returns all pending Owner withdrawal requests.

### Authentication

Required (Admin)

---

## 5.22 Approve Owner Withdrawal

### Endpoint

PUT /api/v1/admin/withdrawals/:requestId/approve

### Description

Approves an Owner withdrawal request.

### Authentication

Required (Admin)

---

## 5.23 Reject Owner Withdrawal

### Endpoint

PUT /api/v1/admin/withdrawals/:requestId/reject

### Description

Rejects an Owner withdrawal request.

### Authentication

Required (Admin)

### Request Body

- Rejection Reason

---

## 5.24 Get Notifications

### Endpoint

GET /api/v1/admin/notifications

### Description

Returns all Admin notifications.

### Authentication

Required (Admin)

----------------------------------------------------------

## 6. Project APIs

### Purpose

This module manages all project-related operations including project retrieval, project details, funding progress, project status, visibility, and lifecycle management.

---

## 6.1 Get Project by ID

### Endpoint

GET /api/v1/projects/:projectId

### Description

Returns complete information about a specific project.

### Authentication

Required

### Success Response

- Complete Project Information

### Error Response

- Project Not Found
- Unauthorized Access

---

## 6.2 Get Project Funding Progress

### Endpoint

GET /api/v1/projects/:projectId/funding

### Description

Returns the current funding progress of a project.

### Authentication

Required

### Success Response

- Funding Target
- Current Raised Amount
- Funding Progress
- Total Investors

---

## 6.3 Get Project Updates

### Endpoint

GET /api/v1/projects/:projectId/updates

### Description

Returns all updates published for a Live project.

### Authentication

Required

### Success Response

- Project Update List

### Error Response

- Project Not Live
- Unauthorized Access

### Business Rules

- Only Project Owner, invested Customers, and Admin can access updates.

---

## 6.4 Get Project Investors Summary

### Endpoint

GET /api/v1/projects/:projectId/investors

### Description

Returns project investment statistics.

### Authentication

Required (Owner/Admin)

### Success Response

- Total Investors
- Total Investments
- Raised Amount

---

## 6.5 Get Project Lifecycle Status

### Endpoint

GET /api/v1/projects/:projectId/status

### Description

Returns the current lifecycle stage of the project.

### Authentication

Required

### Success Response

- Current Status
- Created Date
- Submitted Date
- Stage Date
- Live Date
- Finished Date

---

## 6.6 Get Project Visibility

### Endpoint

GET /api/v1/projects/:projectId/visibility

### Description

Returns the current visibility of the project based on its lifecycle stage.

### Authentication

Required

### Success Response

- Current Visibility
- Allowed Roles

### Business Rules

- Visibility is determined automatically according to the project lifecycle.

---

## 6.7 Get Project Statistics

### Endpoint

GET /api/v1/projects/:projectId/statistics

### Description

Returns project statistics and summary.

### Authentication

Required

### Success Response

- Funding Progress
- Total Investors
- Total Investments
- Current Status
----------------------------------------------------------

## 7. Investment APIs

### Purpose

This module manages all investment-related operations including investment details, investment history, live investments, completed investments, investment summaries, and investment returns.

---

## 7.1 Get Investment by ID

### Endpoint

GET /api/v1/investments/:investmentId

### Description

Returns complete information about a specific investment.

### Authentication

Required

### Success Response

- Investment Details

### Error Response

- Investment Not Found
- Unauthorized Access

---

## 7.2 Get Live Investments

### Endpoint

GET /api/v1/investments/live

### Description

Returns all active investments of the authenticated Customer.

### Authentication

Required (Customer)

### Success Response

- Live Investment List

---

## 7.3 Get Finished Investments

### Endpoint

GET /api/v1/investments/finished

### Description

Returns all completed investments.

### Authentication

Required (Customer)

### Success Response

- Finished Investment List
- Return Amount
- Profit / Loss

---

## 7.4 Get Investment History

### Endpoint

GET /api/v1/investments/history

### Description

Returns complete investment history.

### Authentication

Required (Customer)

### Success Response

- Investment History

---

## 7.5 Get Investment Summary

### Endpoint

GET /api/v1/investments/summary

### Description

Returns overall investment statistics.

### Authentication

Required (Customer)

### Success Response

- Total Invested Amount
- Active Investments
- Finished Investments
- Total Returns
- Net Profit / Loss

---

## 7.6 Get Investment Returns

### Endpoint

GET /api/v1/investments/:investmentId/returns

### Description

Returns the return details of a completed investment.

### Authentication

Required (Customer)

### Success Response

- Investment Amount
- Expected Return
- Actual Return
- Profit / Loss
- Settlement Date

### Error Response

- Investment Not Completed

---

## 7.7 Get Investment Status

### Endpoint

GET /api/v1/investments/:investmentId/status

### Description

Returns the current status of an investment.

### Authentication

Required (Customer)

### Success Response

- Pending
- Active
- Completed

---

## 7.8 Get Investment Statistics

### Endpoint

GET /api/v1/investments/statistics

### Description

Returns complete investment statistics for the authenticated Customer.

### Authentication

Required (Customer)

### Success Response

- Total Investment Count
- Total Investment Amount
- Active Investment Count
- Completed Investment Count
- Total Returns
- Net Profit / Loss
---------------------------------------------------------

## 8. Wallet APIs

### Purpose

This module manages all wallet-related operations for Customers and Owners including wallet balance, wallet transactions, deposits, withdrawals, and transaction history.

---

## 8.1 Get Wallet Details

### Endpoint

GET /api/v1/wallet

### Description

Returns the complete wallet information of the authenticated user.

### Authentication

Required

### Success Response

- Wallet Information
- Available Balance
- Wallet Status

### Error Response

- Wallet Not Found
- Unauthorized Access

---

## 8.2 Get Wallet Balance

### Endpoint

GET /api/v1/wallet/balance

### Description

Returns the current available wallet balance.

### Authentication

Required

### Success Response

- Available Balance

---

## 8.3 Get Wallet Transactions

### Endpoint

GET /api/v1/wallet/transactions

### Description

Returns complete wallet transaction history.

### Authentication

Required

### Success Response

- Transaction List

---

## 8.4 Get Wallet Transaction Details

### Endpoint

GET /api/v1/wallet/transactions/:transactionId

### Description

Returns complete information of a specific wallet transaction.

### Authentication

Required

### Success Response

- Transaction Details

### Error Response

- Transaction Not Found

---

## 8.5 Add Funds

### Endpoint

POST /api/v1/wallet/add-funds

### Description

Adds funds to the authenticated user's wallet.

### Authentication

Required

### Request Body

- Amount

### Success Response

- Funds Added Successfully
- Updated Wallet Balance

### Error Response

- Payment Failed
- Invalid Amount

---

## 8.6 Customer Withdrawal

### Endpoint

POST /api/v1/wallet/customer-withdraw

### Description

Withdraws available wallet balance for a Customer.

### Authentication

Required (Customer)

### Request Body

- Withdrawal Amount

### Success Response

- Withdrawal Successful
- Updated Wallet Balance

### Error Response

- Insufficient Balance
- Invalid Withdrawal Amount

### Business Rules

- Customer withdrawals are processed immediately after successful validation.

---

## 8.7 Create Owner Withdrawal Request

### Endpoint

POST /api/v1/wallet/owner-withdraw

### Description

Creates a withdrawal request for an Owner.

### Authentication

Required (Owner)

### Request Body

- Project ID
- Withdrawal Amount

### Success Response

- Withdrawal Request Submitted Successfully

### Error Response

- Insufficient Withdrawable Balance
- Invalid Withdrawal Amount

### Business Rules

- Owner withdrawals require Admin approval.

---

## 8.8 Get Owner Withdrawal Requests

### Endpoint

GET /api/v1/wallet/owner-withdrawals

### Description

Returns all withdrawal requests submitted by the authenticated Owner.

### Authentication

Required (Owner)

### Success Response

- Withdrawal Request List

---

## 8.9 Get Wallet Summary

### Endpoint

GET /api/v1/wallet/summary

### Description

Returns the financial summary of the authenticated user's wallet.

### Authentication

Required

### Success Response

Customer

- Available Balance
- Total Funds Added
- Total Investments
- Total Returns
- Total Withdrawals

Owner

- Available Balance
- Withdrawable Balance
- Total Funds Added
- Total Withdrawals

---

## 8.10 Get Transaction Statistics

### Endpoint

GET /api/v1/wallet/statistics

### Description

Returns wallet transaction statistics.

### Authentication

Required

### Success Response

- Total Transactions
- Successful Transactions
- Failed Transactions
- Pending Transactions
----------------------------------------------------------

## 9. KYC Verification APIs

### Purpose

This module manages Customer and Owner profile verification through the KYC process. It supports KYC submission, verification status tracking, document retrieval, resubmission after rejection, and administrative review.

---

## 9.1 Submit KYC

### Endpoint

POST /api/v1/kyc

### Description

Submits Customer or Owner KYC details for verification.

### Authentication

Required

### Request Body

- Personal Information
- Address Information
- Bank Information
- KYC Documents

### Success Response

- KYC Submitted Successfully
- Verification Status = Pending

### Error Response

- Missing Required Information
- Invalid Documents
- Verification Already Pending

### Business Rules

- Every User can have only one active verification request.
- Profile verification becomes Pending after successful submission.

---

## 9.2 Get KYC Status

### Endpoint

GET /api/v1/kyc/status

### Description

Returns the current verification status of the authenticated user.

### Authentication

Required

### Success Response

- Verification Status
- Submitted Date
- Reviewed Date

### Error Response

- Verification Not Found

---

## 9.3 Get KYC Details

### Endpoint

GET /api/v1/kyc

### Description

Returns complete KYC information of the authenticated user.

### Authentication

Required

### Success Response

- Personal Information
- Address Information
- Bank Information
- Uploaded Documents
- Verification Status

---

## 9.4 Update Rejected KYC

### Endpoint

PUT /api/v1/kyc

### Description

Updates and resubmits a rejected KYC request.

### Authentication

Required

### Request Body

- Updated Personal Information
- Updated Address Information
- Updated Bank Information
- Updated KYC Documents

### Success Response

- KYC Resubmitted Successfully
- Verification Status = Pending

### Error Response

- Verification Not Rejected
- Missing Required Information

### Business Rules

- Only Rejected KYC requests can be updated.
- Resubmitted requests require a new Admin review.

---

## 9.5 Get Verification History

### Endpoint

GET /api/v1/kyc/history

### Description

Returns the complete verification history of the authenticated user.

### Authentication

Required

### Success Response

- Previous Verification Records
- Verification Timeline
- Review History

---

## 9.6 Get Verification Requirements

### Endpoint

GET /api/v1/kyc/requirements

### Description

Returns the list of information and documents required for profile verification.

### Authentication

Required

### Success Response

- Required Personal Information
- Required Bank Information
- Required Documents
-----------------------------------------------------------

## 10. Project Updates APIs

### Purpose

This module manages all project updates published by Project Owners during the Live stage of a project. It allows invested Customers to stay informed about project progress while enabling Admin to monitor all updates.

---

## 10.1 Create Project Update

### Endpoint

POST /api/v1/project-updates

### Description

Creates a new update for a Live project.

### Authentication

Required (Owner)

### Request Body

- Project ID
- Update Title
- Update Description

### Success Response

- Project Update Published Successfully

### Error Response

- Project Not Found
- Project Not Live
- Unauthorized Access

### Business Rules

- Only the Project Owner can publish updates.
- Updates can only be published for Live projects.

---

## 10.2 Update Project Update

### Endpoint

PUT /api/v1/project-updates/:updateId

### Description

Updates an existing project update.

### Authentication

Required (Owner)

### Request Body

- Update Title
- Update Description

### Success Response

- Project Update Updated Successfully

### Error Response

- Update Not Found
- Unauthorized Access

### Business Rules

- Only the Project Owner can edit the update.
- Published Date remains unchanged.
- Last Updated Date is updated automatically.

---

## 10.3 Get Project Updates

### Endpoint

GET /api/v1/project-updates/:projectId

### Description

Returns all updates published for a specific project.

### Authentication

Required

### Success Response

- Project Update List

### Error Response

- Project Not Found
- Unauthorized Access

### Business Rules

- Only the Project Owner, invested Customers, and Admin can access project updates.

---

## 10.4 Get Project Update Details

### Endpoint

GET /api/v1/project-updates/details/:updateId

### Description

Returns complete details of a specific project update.

### Authentication

Required

### Success Response

- Project Update Details

### Error Response

- Update Not Found
- Unauthorized Access
------------------------------------------------------------

## 11. Support Ticket APIs

### Purpose

This module manages all support-related operations for Customers, Owners, and Admins. It allows users to create support tickets, communicate with the support team, track ticket status, and maintain the complete support conversation history.

---

## 11.1 Create Support Ticket

### Endpoint

POST /api/v1/support

### Description

Creates a new support ticket.

### Authentication

Required

### Request Body

- Subject
- Category
- Description

### Success Response

- Ticket Created Successfully
- Ticket ID

### Error Response

- Missing Required Fields
- Unauthorized Access

### Business Rules

- Only authenticated Customers and Owners can create support tickets.
- Every ticket receives a unique Ticket ID.

---

## 11.2 Get My Support Tickets

### Endpoint

GET /api/v1/support

### Description

Returns all support tickets created by the authenticated user.

### Authentication

Required

### Success Response

- Ticket List

### Error Response

- No Tickets Found

---

## 11.3 Get Support Ticket Details

### Endpoint

GET /api/v1/support/:ticketId

### Description

Returns complete information about a specific support ticket.

### Authentication

Required

### Success Response

- Ticket Information
- Conversation History
- Ticket Status

### Error Response

- Ticket Not Found
- Unauthorized Access

---

## 11.4 Reply to Support Ticket

### Endpoint

POST /api/v1/support/:ticketId/reply

### Description

Adds a reply to an existing support ticket.

### Authentication

Required

### Request Body

- Message

### Success Response

- Reply Added Successfully

### Error Response

- Ticket Closed
- Unauthorized Access

### Business Rules

- Only the Ticket Owner and Admin can reply.
- Replies are stored in chronological order.

---

## 11.5 Close Support Ticket

### Endpoint

PUT /api/v1/support/:ticketId/close

### Description

Closes an existing support ticket.

### Authentication

Required

### Success Response

- Ticket Closed Successfully

### Error Response

- Ticket Already Closed
- Unauthorized Access

### Business Rules

- Closed tickets become read-only.

---

## 11.6 Get All Support Tickets

### Endpoint

GET /api/v1/admin/support

### Description

Returns all support tickets for administrative review.

### Authentication

Required (Admin)

### Success Response

- Complete Ticket List

---

## 11.7 Reply to Support Ticket (Admin)

### Endpoint

POST /api/v1/admin/support/:ticketId/reply

### Description

Allows Admin to reply to a support ticket.

### Authentication

Required (Admin)

### Request Body

- Message

### Success Response

- Reply Sent Successfully

### Error Response

- Ticket Not Found

---

## 11.8 Update Ticket Status

### Endpoint

PUT /api/v1/admin/support/:ticketId/status

### Description

Updates the current status of a support ticket.

### Authentication

Required (Admin)

### Request Body

- Status

### Success Response

- Ticket Status Updated Successfully

### Error Response

- Invalid Status

### Business Rules

- Only Admin can change the ticket status.
- Valid statuses are:
  - Open
  - In Progress
  - Resolved
  - Closed

---

## 11.9 Get Support Statistics

### Endpoint

GET /api/v1/admin/support/statistics

### Description

Returns support ticket statistics for the Admin dashboard.

### Authentication

Required (Admin)

### Success Response

- Total Tickets
- Open Tickets
- In Progress Tickets
- Resolved Tickets
- Closed Tickets
-----------------------------------------------------------

## 12. Notification APIs

### Purpose

This module manages all notification-related operations for Customers, Owners, and Admins. It allows users to retrieve notifications, view notification details, mark notifications as read, and access notification history.

---

## 12.1 Get Notifications

### Endpoint

GET /api/v1/notifications

### Description

Returns all notifications of the authenticated user.

### Authentication

Required

### Success Response

- Notification List

### Error Response

- Unauthorized Access

### Business Rules

- Users can access only their own notifications.

---

## 12.2 Get Notification Details

### Endpoint

GET /api/v1/notifications/:notificationId

### Description

Returns complete information about a specific notification.

### Authentication

Required

### Success Response

- Notification Details

### Error Response

- Notification Not Found
- Unauthorized Access

---

## 12.3 Mark Notification as Read

### Endpoint

PUT /api/v1/notifications/:notificationId/read

### Description

Marks a notification as Read.

### Authentication

Required

### Success Response

- Notification Marked as Read

### Error Response

- Notification Not Found
- Unauthorized Access

### Business Rules

- Only the owner of the notification can mark it as Read.
- Read Date is recorded automatically.

---

## 12.4 Mark All Notifications as Read

### Endpoint

PUT /api/v1/notifications/read-all

### Description

Marks all unread notifications of the authenticated user as Read.

### Authentication

Required

### Success Response

- All Notifications Marked as Read

### Error Response

- Unauthorized Access

---

## 12.5 Get Unread Notifications

### Endpoint

GET /api/v1/notifications/unread

### Description

Returns only unread notifications.

### Authentication

Required

### Success Response

- Unread Notification List

---

## 12.6 Get Notification Statistics

### Endpoint

GET /api/v1/notifications/statistics

### Description

Returns notification statistics of the authenticated user.

### Authentication

Required

### Success Response

- Total Notifications
- Read Notifications
- Unread Notifications

### Business Rules

- Notification statistics are generated from the authenticated user's notification history.

------------------------------------------------------------

## 13. Owner Profile Update Request APIs

### Purpose

This module manages Owner profile update requests. It allows verified Owners to submit profile changes and enables Admin to review, approve, or reject those requests before updating the Owner's profile.

---

## 13.1 Create Profile Update Request

### Endpoint

POST /api/v1/profile-update-requests

### Description

Creates a new Owner profile update request.

### Authentication

Required (Owner)

### Request Body

- Updated Profile Information

### Success Response

- Profile Update Request Submitted Successfully
- Request Status = Pending

### Error Response

- Owner Not Verified
- Invalid Profile Information
- Existing Pending Request

### Business Rules

- Only verified Owners can create profile update requests.
- Only one pending profile update request is allowed at a time.
- Multiple profile changes can be included in a single request.

---

## 13.2 Get My Profile Update Requests

### Endpoint

GET /api/v1/profile-update-requests

### Description

Returns all profile update requests submitted by the authenticated Owner.

### Authentication

Required (Owner)

### Success Response

- Profile Update Request List

---

## 13.3 Get Profile Update Request Details

### Endpoint

GET /api/v1/profile-update-requests/:requestId

### Description

Returns complete details of a specific profile update request.

### Authentication

Required (Owner/Admin)

### Success Response

- Current Profile Information
- Requested Profile Information
- Request Status
- Review Details

### Error Response

- Request Not Found
- Unauthorized Access

---

## 13.4 Update Rejected Profile Update Request

### Endpoint

PUT /api/v1/profile-update-requests/:requestId

### Description

Updates and resubmits a rejected profile update request.

### Authentication

Required (Owner)

### Request Body

- Updated Profile Information

### Success Response

- Profile Update Request Resubmitted Successfully

### Error Response

- Request Not Rejected
- Invalid Profile Information

### Business Rules

- Only rejected requests can be updated.
- Resubmitted requests return to Pending status.

---

## 13.5 Get Pending Profile Update Requests

### Endpoint

GET /api/v1/admin/profile-update-requests

### Description

Returns all pending Owner profile update requests.

### Authentication

Required (Admin)

### Success Response

- Pending Request List

---

## 13.6 Approve Profile Update Request

### Endpoint

PUT /api/v1/admin/profile-update-requests/:requestId/approve

### Description

Approves the Owner profile update request.

### Authentication

Required (Admin)

### Success Response

- Profile Updated Successfully

### Error Response

- Request Not Found

### Business Rules

- Approved changes are immediately applied to the Owner profile.

---

## 13.7 Reject Profile Update Request

### Endpoint

PUT /api/v1/admin/profile-update-requests/:requestId/reject

### Description

Rejects the Owner profile update request.

### Authentication

Required (Admin)

### Request Body

- Rejection Reason

### Success Response

- Profile Update Request Rejected

### Error Response

- Request Not Found

### Business Rules

- Rejection reason is mandatory.
-----------------------------------------------------------

## 14. Owner Withdrawal Request APIs

### Purpose

This module manages Owner withdrawal requests. It allows verified Owners to request fund withdrawals from Live projects and enables Admin to review, approve, or reject those requests.

---

## 14.1 Create Withdrawal Request

### Endpoint

POST /api/v1/withdrawal-requests

### Description

Creates a new withdrawal request for a Live project.

### Authentication

Required (Owner)

### Request Body

- Project ID
- Withdrawal Amount

### Success Response

- Withdrawal Request Submitted Successfully
- Request Status = Pending

### Error Response

- Project Not Found
- Project Not Live
- Insufficient Withdrawable Balance
- Existing Pending Request (For Same Project)

### Business Rules

- Only verified Owners can create withdrawal requests.
- Withdrawal amount cannot exceed the available Withdrawable Balance.
- Withdrawal requests can be created only for Live projects.
- Only one pending withdrawal request is allowed per project at a time.

---

## 14.2 Get My Withdrawal Requests

### Endpoint

GET /api/v1/withdrawal-requests

### Description

Returns all withdrawal requests submitted by the authenticated Owner.

### Authentication

Required (Owner)

### Success Response

- Withdrawal Request List

---

## 14.3 Get Withdrawal Request Details

### Endpoint

GET /api/v1/withdrawal-requests/:requestId

### Description

Returns complete details of a specific withdrawal request.

### Authentication

Required (Owner/Admin)

### Success Response

- Withdrawal Request Details
- Request Status
- Review Information

### Error Response

- Request Not Found
- Unauthorized Access

---

## 14.4 Get Pending Withdrawal Requests

### Endpoint

GET /api/v1/admin/withdrawal-requests

### Description

Returns all pending Owner withdrawal requests.

### Authentication

Required (Admin)

### Success Response

- Pending Withdrawal Request List

---

## 14.5 Approve Withdrawal Request

### Endpoint

PUT /api/v1/admin/withdrawal-requests/:requestId/approve

### Description

Approves an Owner withdrawal request.

### Authentication

Required (Admin)

### Success Response

- Withdrawal Request Approved
- Wallet Updated
- Wallet Transaction Created

### Error Response

- Request Not Found

### Business Rules

- Approved withdrawals automatically update the Owner's Withdrawable Balance.
- Every approved withdrawal creates a Wallet Transaction.

---

## 14.6 Reject Withdrawal Request

### Endpoint

PUT /api/v1/admin/withdrawal-requests/:requestId/reject

### Description

Rejects an Owner withdrawal request.

### Authentication

Required (Admin)

### Request Body

- Rejection Reason

### Success Response

- Withdrawal Request Rejected

### Error Response

- Request Not Found

### Business Rules

- Rejection reason is mandatory.
- Rejected requests do not affect the Wallet balance.

---

## 14.7 Get Withdrawal Status

### Endpoint

GET /api/v1/withdrawal-requests/:requestId/status

### Description

Returns the current status of a withdrawal request.

### Authentication

Required (Owner/Admin)

### Success Response

- Pending
- Approved
- Rejected

### Error Response

- Request Not Found
-------------------------------------------------------------

## 15. Dashboard APIs

### Purpose

This module provides dashboard summary data for Customers, Owners, and Admins. It returns all important statistics and recent activities required to render the dashboard after user login.

---

## 15.1 Get Customer Dashboard

### Endpoint

GET /api/v1/dashboard/customer

### Description

Returns the complete dashboard summary for the authenticated Customer.

### Authentication

Required (Customer)

### Success Response

- Customer Information
- Available Wallet Balance
- Total Live Investments
- Total Finished Investments
- Total Invested Amount
- Total Returns
- Net Profit / Loss
- Recent Project Updates
- Recent Notifications

### Error Response

- Unauthorized Access

---

## 15.2 Get Owner Dashboard

### Endpoint

GET /api/v1/dashboard/owner

### Description

Returns the complete dashboard summary for the authenticated Owner.

### Authentication

Required (Owner)

### Success Response

- Owner Information
- Wallet Balance
- Withdrawable Balance
- Created Projects
- Submitted Projects
- Stage Projects
- Live Projects
- Finished Projects
- Pending Withdrawal Requests
- Recent Notifications

### Error Response

- Unauthorized Access

---

## 15.3 Get Admin Dashboard

### Endpoint

GET /api/v1/dashboard/admin

### Description

Returns the complete dashboard summary for the authenticated Admin.

### Authentication

Required (Admin)

### Success Response

- Pending Customer Verifications
- Pending Owner Verifications
- Pending Project Approvals
- Live Projects
- Pending Owner Profile Update Requests
- Pending Withdrawal Requests
- Open Support Tickets
- Recent Notifications

### Error Response

- Unauthorized Access

---

## 15.4 Get Dashboard Statistics

### Endpoint

GET /api/v1/dashboard/statistics

### Description

Returns dashboard statistics based on the authenticated user's role.

### Authentication

Required

### Success Response

Customer

- Investment Statistics
- Wallet Statistics

Owner

- Project Statistics
- Wallet Statistics

Admin

- Platform Statistics
- Verification Statistics
- Project Statistics

### Error Response

- Unauthorized Access

---

### Business Rules

- Dashboard data is returned according to the authenticated user's role.
- Users can access only their own dashboard.
- Dashboard APIs return summary data only.
- Detailed information must be retrieved through their respective module APIs.
---------------------------------------------------------

## 16. Common Response Structure

### Purpose

This section defines the standard response format used by all APIs across the StageFund platform. Every API should return responses in a consistent structure to simplify frontend integration, debugging, and future maintenance.

---

## Success Response

### HTTP Status

200 OK

201 Created

### Response Structure

- Success Status
- Response Message
- Response Data

---

### Example

{
    "success": true,
    "message": "Operation completed successfully.",
    "data": {
        ...
    }
}

---

## Error Response

### HTTP Status

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Unprocessable Entity

500 Internal Server Error

### Response Structure

- Success Status
- Error Message
- Error Details (If Applicable)

---

### Example

{
    "success": false,
    "message": "Invalid request.",
    "error": {
        ...
    }
}

---

## Paginated Response

### Response Structure

- Success Status
- Response Message
- Response Data
- Pagination Information

---

### Pagination Information

- Current Page
- Total Pages
- Total Records
- Records Per Page

---

### Example

{
    "success": true,
    "message": "Projects retrieved successfully.",
    "data": [
        ...
    ],
    "pagination": {
        "currentPage": 1,
        "totalPages": 5,
        "totalRecords": 120,
        "pageSize": 25
    }
}

---

## Response Guidelines

- Every response must include the success status.
- Every response must include a human-readable message.
- Data should be returned only when applicable.
- Error responses should not expose internal server information.
- HTTP status codes should accurately represent the result of the request.
- All APIs must follow this common response structure.
-------------------------------------------------------

## 17. API Security Rules

### Purpose

This section defines the security standards that every API of the StageFund platform must follow to ensure secure authentication, authorization, data protection, and safe communication between the Frontend, Backend, and Database.

---

## Authentication

- Protected APIs require a valid Access Token.
- Authentication is performed before processing any protected request.
- Unauthenticated requests are rejected.

---

## Authorization

- Every authenticated user is assigned a Role.
- Role-Based Access Control (RBAC) determines API accessibility.

### Supported Roles

- Customer
- Owner
- Admin

Users can access only the APIs permitted for their role.

---

## Password Security

- Passwords must never be stored in plain text.
- Passwords must be securely hashed before storing.
- Password comparison must always be performed using the hashed value.

---

## Token Security

- Access Tokens must be validated before processing protected APIs.
- Invalid or expired tokens must be rejected.
- Tokens must never expose sensitive user information.

---

## Input Validation

- Every request body must be validated.
- Every query parameter must be validated.
- Every URL parameter must be validated.
- Invalid requests must be rejected before database operations.

---

## Data Access Security

- Users can access only their own resources.
- Customers cannot access Owner resources.
- Owners cannot access Customer-only resources.
- Customers and Owners cannot access Admin resources.

---

## File Security

- Uploaded documents must be validated before processing.
- Unsupported file formats must be rejected.
- Empty file uploads must be rejected.

---

## API Communication

- APIs must exchange data using JSON.
- Sensitive information must never be exposed in API responses.
- Internal database information must remain hidden.

---

## Rate Limiting

- APIs should protect against excessive repeated requests.
- Authentication APIs should have stricter request limits.

---

## Error Security

- Error responses must not expose database structure.
- Error responses must not expose server configuration.
- Internal system errors must remain hidden from users.

---

## Logging

- Authentication events should be logged.
- Financial operations should be logged.
- Administrative actions should be logged.
- Security-related events should be logged.

---

## Security Rules

- Authentication is mandatory for all protected APIs.
- Authorization must be verified before executing business logic.
- Every protected API must validate the authenticated user's role.
- Sensitive information must never be returned in API responses.
- Security validation is performed before database access.
--------------------------------------------------------------

## 18. API Validation Rules

### Purpose

This section defines the validation rules that every API must perform before executing business logic or interacting with the database. Proper validation ensures data consistency, prevents invalid requests, and protects the platform from incorrect or malicious inputs.

---

## Authentication Validation

- Access Token must be present for all protected APIs.
- Access Token must be valid.
- Access Token must not be expired.
- Authenticated User must exist.

---

## Authorization Validation

- User Role must be verified.
- Users can access only APIs permitted for their role.
- Unauthorized requests must be rejected immediately.

---

## Request Body Validation

- All required fields must be present.
- Empty values are not allowed for mandatory fields.
- Data types must match the expected format.
- Unexpected fields should be ignored or rejected based on API requirements.

---

## Path Parameter Validation

- Every Path Parameter must be validated.
- Resource IDs must follow the expected format.
- Invalid Resource IDs must return an appropriate error.

---

## Query Parameter Validation

- Query parameters must be validated before processing.
- Pagination values must be valid.
- Filter values must match supported options.
- Sorting values must match supported fields.

---

## Business Validation

- User account must be active.
- Customer must be Verified before financial operations.
- Owner must be Verified before project creation.
- Project Status must allow the requested operation.
- Wallet Balance must be sufficient before investment or withdrawal.
- Withdrawable Balance must be validated before Owner withdrawals.

---

## Duplicate Validation

- Email Address must be unique.
- Mobile Number must be unique.
- Duplicate registration requests must be rejected.
- Duplicate project submissions must be prevented.
- Duplicate pending withdrawal requests for the same project must be rejected.
- Duplicate pending profile update requests must be rejected.

---

## Financial Validation

- Investment Amount must be greater than or equal to the project's Minimum Investment Amount.
- Investment Amount must not exceed available Wallet Balance.
- Withdrawal Amount must not exceed available Wallet Balance.
- Owner Withdrawal Amount must not exceed Withdrawable Balance.

---

## File Validation

- Required documents must be uploaded.
- Uploaded files must be valid.
- Empty files must be rejected.
- Unsupported file formats must be rejected.

---

## Database Validation

- Referenced User must exist.
- Referenced Project must exist.
- Referenced Investment must exist.
- Referenced Wallet must exist.
- Referenced Support Ticket must exist.

---

## Response Validation

- Success responses must follow the common response structure.
- Error responses must follow the common response structure.
- Sensitive information must never be included in API responses.

---

## Validation Rules

- Validation must always execute before business logic.
- Database operations must not execute if validation fails.
- Validation errors must return meaningful error messages.
- Every validation failure must terminate further request processing.
-------------------------------------------------------------

## 19. API Business Rules

### Purpose

This section defines the business rules that every API must enforce before processing requests. These rules ensure that the platform behaves according to the approved Business Requirements Document (BRD), Application Workflow, and Database Design.

---

## User Management Rules

- Every user must register as either a Customer or an Owner.
- Email Address must be unique.
- Mobile Number must be unique.
- Only verified users can access financial features.
- Every user has only one Wallet.
- Every user has only one active role.

---

## Authentication Rules

- Mobile Number verification is mandatory.
- Email Address verification is mandatory.
- Protected APIs require authentication.
- Role-based authorization is mandatory for protected APIs.

---

## Customer Rules

- Customers can browse Stage projects without completing KYC.
- Customers cannot invest until KYC is approved.
- Customers can invest only in Stage projects.
- Customers can access Live projects only if they have invested in them.
- Customers can access Finished projects only if they invested in those projects.

---

## Owner Rules

- Only verified Owners can create projects.
- Every new project starts in the Created state.
- Projects must be submitted before Admin review.
- Submitted projects cannot be modified until Admin completes the review.
- Rejected projects can be updated and submitted again.
- Owners can publish updates only for Live projects.
- Owners can request withdrawals only from Live projects.

---

## Admin Rules

- Only Admin can verify Customer profiles.
- Only Admin can verify Owner profiles.
- Only Admin can approve or reject submitted projects.
- Only Admin can approve or reject Owner profile update requests.
- Only Admin can approve or reject Owner withdrawal requests.
- Only Admin can mark projects as Finished.

---

## Project Rules

- Every project belongs to one Owner.
- Only Stage projects are available for investment.
- A project automatically moves to Live after reaching its funding target.
- Finished projects become read-only.
- Project visibility follows the approved Project Visibility Rules.

---

## Investment Rules

- Every investment belongs to one Customer.
- Every investment belongs to one Project.
- Investment amount must satisfy the Minimum Investment Amount.
- Investment records cannot be deleted.
- Returns are processed only after project completion.

---

## Wallet Rules

- Wallet balance cannot become negative.
- Every financial operation creates a Wallet Transaction.
- Customer withdrawals are processed immediately after validation.
- Owner withdrawals require Admin approval.
- Withdrawable Balance is updated automatically after every approved Owner withdrawal.

---

## KYC Rules

- Every Customer must complete KYC before investing.
- Every Owner must complete KYC before creating projects.
- Rejected KYC requests can be resubmitted.
- Every verification request is reviewed by an Admin.

---

## Support Rules

- Every support ticket belongs to one user.
- Every support ticket receives a unique Ticket ID.
- Only the Ticket Owner and Admin can access the ticket.
- Closed tickets become read-only.

---

## Notification Rules

- Notifications are generated automatically by the system.
- Users can access only their own notifications.
- Notifications cannot be deleted.
- Notifications remain available as part of the user's history.

---

## General Rules

- Every API must validate the request before processing.
- Every API must follow the common response structure.
- Every API must enforce authorization before executing business logic.
- Every API must preserve data consistency and integrity.
--------------------------------------------------------------

## 20. API Error Handling

### Purpose

This section defines how APIs should handle errors across the StageFund platform. It ensures consistent error responses, protects sensitive system information, and provides meaningful feedback to API consumers.

---

## Error Categories

### Authentication Errors

Occurs when authentication fails.

Examples

- Invalid Access Token
- Expired Access Token
- Missing Access Token
- Invalid Login Credentials

---

### Authorization Errors

Occurs when a user tries to access resources outside their permissions.

Examples

- Customer accessing Owner APIs
- Owner accessing Admin APIs
- Unauthorized Resource Access

---

### Validation Errors

Occurs when request data is invalid.

Examples

- Missing Required Fields
- Invalid Email Address
- Invalid Mobile Number
- Invalid Investment Amount
- Invalid Project Status

---

### Business Logic Errors

Occurs when business rules are violated.

Examples

- Customer KYC Not Verified
- Owner KYC Not Verified
- Insufficient Wallet Balance
- Insufficient Withdrawable Balance
- Project Already Submitted
- Project Already Finished
- Minimum Investment Not Met

---

### Resource Errors

Occurs when requested resources are unavailable.

Examples

- User Not Found
- Project Not Found
- Investment Not Found
- Wallet Not Found
- Support Ticket Not Found
- Notification Not Found

---

### Database Errors

Occurs when database operations fail.

Examples

- Database Connection Failure
- Duplicate Data
- Data Integrity Failure

---

### File Upload Errors

Occurs during document uploads.

Examples

- Unsupported File Format
- File Size Limit Exceeded
- Empty File Uploaded
- Missing Required Documents

---

### Payment Errors

Occurs during wallet funding or withdrawal operations.

Examples

- Payment Failed
- Transaction Cancelled
- Payment Gateway Timeout
- Withdrawal Processing Failed

---

### Internal Server Errors

Occurs when unexpected server-side failures happen.

Examples

- Unexpected Exception
- Service Failure
- Unknown Server Error

---

## HTTP Status Codes

### 200 OK

Request processed successfully.

---

### 201 Created

New resource created successfully.

---

### 400 Bad Request

Invalid request.

---

### 401 Unauthorized

Authentication failed.

---

### 403 Forbidden

User does not have permission.

---

### 404 Not Found

Requested resource does not exist.

---

### 409 Conflict

Duplicate or conflicting request.

---

### 422 Unprocessable Entity

Business rule validation failed.

---

### 500 Internal Server Error

Unexpected server failure.

---

## Error Response Guidelines

- Every error response must follow the Common Response Structure.
- Error messages should be human-readable.
- Internal server details must never be exposed.
- Database implementation details must remain hidden.
- Stack traces must never be returned in API responses.
- Validation errors should clearly identify the failed field whenever applicable.
- Business rule violations should provide meaningful explanations.
- Every API should return the appropriate HTTP Status Code.

---

## Logging Guidelines

The system should log:

- Authentication failures
- Authorization failures
- Validation failures
- Financial transaction failures
- Database failures
- Internal server errors
- Administrative actions

Logs are intended for internal monitoring and troubleshooting only and must not be exposed through API responses.

---

## Recovery Guidelines

- Failed requests must not leave partial or inconsistent data.
- Database operations should maintain data consistency.
- Financial transactions should be completed successfully or rolled back safely.
- Users should receive clear guidance when retrying an operation is appropriate.

---

## Error Handling Rules

- Every API must return a structured error response.
- Every error must include an appropriate HTTP Status Code.
- Sensitive information must never be exposed.
- Error handling must preserve database consistency.
- All APIs must follow the same error handling standard.
