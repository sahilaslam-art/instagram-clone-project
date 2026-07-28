# StageFund Database Design

## 1. Database Overview

### Purpose

This document defines the database architecture of the StageFund platform. It describes the collections, their relationships, and the overall data structure required to support Customers, Owners, Admins, Projects, Investments, Wallets, Verification, Support, and Notifications.

The database is designed to maintain data consistency, security, scalability, and efficient access to information across all platform modules.

Every collection in this document is derived from the approved Business Requirements Document (BRD) and Application Workflow. No collection is introduced without a corresponding business requirement.

The database design supports:

- User Management
- Authentication
- Profile Verification (KYC)
- Project Management
- Investment Management
- Wallet Management
- Wallet Transactions
- Project Updates
- Support Ticket Management
- Notifications
- Profile Update Requests
- Withdrawal Requests
- Administrative Operations
-------------------------------------------

## 2. Collections

### Collections

1. Users

2. Projects

3. Investments

4. Wallets

5. Wallet Transactions

6. KYC Verifications

7. Project Updates

8. Support Tickets

9. Notifications

10. Owner Profile Update Requests

11. Owner Withdrawal Requests

12. Admin Notes

## 3. Users Collection

### Purpose

The Users collection stores all Customer, Owner, and Admin accounts in a single collection. It manages user authentication, profile information, verification status, and role-based access throughout the StageFund platform.

---

### Stores Information About

#### Basic Information

- Full Name
- Email Address
- Mobile Number
- Password

---

#### Account Information

- User Role
  - Customer
  - Owner
  - Admin

- Account Status
  - Active
  - Inactive

- Email Verification Status

- Mobile Verification Status

- Profile Completion Status

- KYC Verification Status
  - Incomplete
  - Pending
  - Verified
  - Rejected

---

#### Profile Information

- Profile Photo
- Date of Birth
- Gender
- Address

---

#### Bank Information

- Account Holder Name
- Bank Name
- Account Number
- IFSC Code

---

#### Account Metadata

- Registration Date
- Last Login
- Last Profile Update

---

### Relationships

One User

↓

Can own one Wallet.

↓

Can create multiple Projects (Owner).

↓

Can make multiple Investments (Customer).

↓

Can raise multiple Support Tickets.

↓

Can receive multiple Notifications.

↓

Can submit multiple Withdrawal Requests (Owner).

↓

Can submit multiple Profile Update Requests (Owner).

---

### Business Rules

- Every user has only one account.
- Every Email Address must be unique.
- Every Mobile Number must be unique.
- One user can have only one role.
- Profile verification is mandatory before financial operations.
- Customers, Owners, and Admins are stored in the same collection.
----------------------------------------------

## 4. Projects Collection

### Purpose

The Projects collection stores all investment projects created by Owners. It manages the complete project lifecycle, funding progress, visibility, project status, and investment-related information.

---

### Stores Information About

#### Owner Information

- Owner ID

---

#### Basic Project Information

- Project Title
- Project Category
- Project Description
- Project Location

---

#### Financial Information

- Funding Target
- Current Raised Amount
- Minimum Investment Amount
- Expected Return
- Risk Level

---

#### Project Status

- Created
- Submitted
- Rejected
- Stage
- Live
- Finished

---

#### Project Visibility

- Draft (Owner Only)
- Submitted (Owner + Admin)
- Stage (Verified Customers + Owner + Admin)
- Live (Invested Customers + Owner + Admin)
- Finished (Invested Customers + Owner + Admin)

---

#### Project Timeline

- Created Date
- Submitted Date
- Approved Date
- Live Date
- Finished Date

---

#### Project Statistics

- Total Investors
- Total Investments
- Funding Percentage

---

#### Project Metadata

- Rejection Reason
- Admin Remarks

---

### Relationships

One Project

↓

Belongs to one Owner.

↓

Can receive multiple Investments.

↓

Can have multiple Project Updates.

↓

Can have multiple Withdrawal Requests.

↓

Can be monitored by Admin.

---

### Business Rules

- Every project belongs to one Owner.
- Every project starts with the Created status.
- Only Admin can approve or reject a submitted project.
- Only Stage projects are available for investment.
- A project becomes Live after reaching the funding target.
- Live projects are visible only to the Project Owner, invested Customers, and Admin.
- Finished projects become read-only.
-----------------------------------------------

## 5. Investments Collection

### Purpose

The Investments collection stores every investment made by Customers into Stage projects. It maintains investment records, investment status, return information, and links Customers with their invested Projects.

---

### Stores Information About

#### Customer Information

- Customer ID

---

#### Project Information

- Project ID

---

#### Investment Information

- Investment Amount
- Investment Date
- Investment Status

---

#### Return Information

- Expected Return
- Actual Return
- Profit / Loss
- Settlement Date

---

### Investment Status

- Pending
- Active
- Completed

---

### Relationships

One Investment

↓

Belongs to one Customer.

↓

Belongs to one Project.

↓

Creates Wallet Transactions.

---

### Business Rules

- Every investment belongs to one Customer.
- Every investment belongs to one Project.
- Only verified Customers can create investments.
- Investments can be created only for Stage projects.
- Investment amount must be equal to or greater than the project's minimum investment amount.
- Every successful investment updates the project's funding progress.
- Investment records cannot be deleted.
- Returns are processed only after the project reaches the Finished status.
- Profit or Loss is calculated after project completion.
---------------------------------------------------------

## 6. Wallets Collection

### Purpose

The Wallets collection manages the wallet of every Customer and Owner. It stores the available balance and supports all wallet-related financial operations performed on the platform.

---

### Stores Information About

#### User Information

- User ID

---

#### Wallet Information

- Available Balance

---

#### Wallet Statistics

- Total Amount Added
- Total Investment Amount
- Total Return Amount
- Total Customer Withdrawals
- Total Owner Withdrawals

---

#### Wallet Metadata

- Wallet Status
- Created Date
- Last Updated Date

---

### Wallet Status

- Active
- Inactive

---

### Relationships

One Wallet

↓

Belongs to one User.

↓

Can have multiple Wallet Transactions.

↓

Can receive Investment Returns.

↓

Can process Customer Withdrawals.

↓

Can process Owner Withdrawal Requests.

---

### Business Rules

- Every Customer has one Wallet.
- Every Owner has one Wallet.
- One User can have only one Wallet.
- Wallet balance cannot become negative.
- Wallet balance is updated after every successful financial transaction.
- Customer investments are deducted from the Wallet balance.
- Investment returns are credited to the Wallet.
- Customer withdrawals are processed directly after successful validation.
- Owner withdrawals require Admin approval.
--------------------------------------------------------------

## 7. Wallet Transactions Collection

### Purpose

The Wallet Transactions collection stores every financial activity performed through Customer and Owner wallets. It acts as the financial ledger of the StageFund platform by maintaining a complete history of deposits, investments, returns, and withdrawals.

---

### Stores Information About

#### Wallet Information

- Wallet ID
- User ID

---

#### Transaction Information

- Transaction Type
- Transaction Amount
- Transaction Status
- Transaction Date

---

#### Reference Information

- Investment ID (If Applicable)
- Project ID (If Applicable)
- Withdrawal Request ID (If Applicable)

---

#### Transaction Types

- Add Funds
- Investment
- Investment Return
- Customer Withdrawal
- Owner Withdrawal

---

#### Transaction Status

- Pending
- Successful
- Failed

---

### Relationships

One Wallet Transaction

↓

Belongs to one Wallet.

↓

Belongs to one User.

↓

May belong to one Investment.

↓

May belong to one Project.

↓

May belong to one Owner Withdrawal Request.

---

### Business Rules

- Every wallet activity creates one transaction record.
- Wallet transaction history cannot be deleted.
- Successful transactions update the Wallet balance.
- Failed transactions do not affect the Wallet balance.
- Investment transactions are linked to both the Investment and Project.
- Customer withdrawal transactions are created only after successful validation.
- Owner withdrawal transactions are completed only after Admin approval.
- Investment return transactions are created after final project settlement.
---------------------------------------------------------------

## 8. KYC Verifications Collection

### Purpose

The KYC Verifications collection stores all profile verification requests submitted by Customers and Owners. It maintains verification details, uploaded documents, verification status, review history, and administrative decisions.

---

### Stores Information About

#### User Information

- User ID
- User Role

---

#### Personal Information

- Full Name
- Date of Birth
- Gender
- Address

---

#### Bank Information

- Account Holder Name
- Bank Name
- Account Number
- IFSC Code

---

#### KYC Documents

- Identity Proof
- Address Proof
- Bank Proof
- Additional Documents (If Required)

---

#### Verification Information

- Verification Status
- Submitted Date
- Reviewed Date

---

#### Review Information

- Reviewed By (Admin ID)
- Rejection Reason (If Rejected)

---

### Verification Status

- Incomplete
- Pending
- Verified
- Rejected

---

### Relationships

One KYC Verification

↓

Belongs to one User.

↓

Reviewed by one Admin.

↓

May be resubmitted multiple times until verification is approved.

---

### Business Rules

- Every Customer must complete KYC before making investments.
- Every Owner must complete KYC before creating projects.
- Every verification request belongs to one User.
- Every verification request is reviewed by an Admin.
- Rejected verification requests can be updated and submitted again.
- Only Verified users can access financial features.
- Verification history must be preserved for future reference.
-----------------------------------------------------------------

## 9. Project Updates Collection

### Purpose

The Project Updates collection stores all updates published by Project Owners during the Live stage of a project. It keeps Investors informed about the project's progress while allowing Admin to monitor all published updates.

---

### Stores Information About

#### Project Information

- Project ID
- Owner ID

---

#### Update Information

- Update Title
- Update Description

---

#### Update Metadata

- Published Date
- Last Updated Date

---

#### Visibility

- Project Owner
- Invested Customers
- Admin

---

### Relationships

One Project Update

↓

Belongs to one Project.

↓

Created by one Owner.

↓

Visible to all Customers who invested in the project.

↓

Visible to Admin.

---

### Business Rules

- Project updates can be published only by the Project Owner.
- Project updates can be published only when the project status is Live.
- Every update belongs to one Project.
- Every update records its published date.
- Only invested Customers can view project updates.
- Admin can view every project update for monitoring purposes.
- Published updates become part of the project's permanent history.
---------------------------------------------------------------

## 10. Support Tickets Collection

### Purpose

The Support Tickets collection stores all support requests submitted by Customers and Owners. It manages ticket details, communication history, ticket status, and administrative responses throughout the ticket lifecycle.

---

### Stores Information About

#### User Information

- Ticket ID
- User ID
- User Role

---

#### Ticket Information

- Subject
- Category
- Description

---

#### Ticket Status

- Open
- In Progress
- Resolved
- Closed

---

#### Response Information

- Assigned Admin ID
- Admin Response

---

#### Ticket Timeline

- Created Date
- Last Updated Date
- Closed Date

---

### Relationships

One Support Ticket

↓

Belongs to one User.

↓

Handled by one Admin.

↓

Can have multiple replies during its lifecycle.

---

### Business Rules

- Every support ticket belongs to one User.
- Every ticket receives a unique Ticket ID.
- Only logged-in Customers and Owners can create support tickets.
- Every ticket must contain Subject, Category, and Description.
- Only the ticket owner and Admin can access the ticket.
- Admin can update the ticket status.
- Closed tickets become read-only.
- Complete ticket history is preserved for future reference.
---------------------------------------------------------------

## 11. Notifications Collection

### Purpose

The Notifications collection stores all system-generated notifications for Customers, Owners, and Admins. It ensures that users are informed about important activities related to their accounts, projects, investments, wallet operations, verification status, and support requests.

---

### Stores Information About

#### User Information

- Notification ID
- User ID
- User Role

---

#### Notification Information

- Notification Title
- Notification Message
- Notification Type

---

#### Notification Status

- Unread
- Read

---

#### Reference Information

- Project ID (If Applicable)
- Investment ID (If Applicable)
- Support Ticket ID (If Applicable)
- Withdrawal Request ID (If Applicable)

---

#### Notification Timeline

- Generated Date
- Read Date

---

### Notification Types

- Profile Verification
- Project Approval
- Project Rejection
- Project Status Update
- Investment Confirmation
- Investment Return
- Wallet Deposit
- Customer Withdrawal
- Owner Withdrawal
- Support Ticket Update
- General System Notification

---

### Relationships

One Notification

↓

Belongs to one User.

↓

May belong to one Project.

↓

May belong to one Investment.

↓

May belong to one Support Ticket.

↓

May belong to one Withdrawal Request.

---

### Business Rules

- Every notification belongs to one User.
- Notifications are generated automatically by the system.
- Users can access only their own notifications.
- Notifications remain Unread until viewed.
- Read notifications record the Read Date.
- Notifications cannot be modified by users.
- Notification history is preserved for future reference.
------------------------------------------------------------

## 12. Owner Profile Update Requests Collection

### Purpose

The Owner Profile Update Requests collection stores all profile update requests submitted by Owners after their account has been verified. It allows Admin to review, approve, or reject requested changes before they are applied to the Owner's profile.

---

### Stores Information About

#### Owner Information

- Request ID
- Owner ID

---

#### Existing Profile Information

- Current Profile Details

---

#### Requested Profile Information

- Updated Profile Details

---

#### Request Status

- Pending
- Approved
- Rejected

---

#### Review Information

- Reviewed By (Admin ID)
- Review Date
- Rejection Reason (If Rejected)

---

#### Request Timeline

- Request Date
- Last Updated Date

---

### Relationships

One Profile Update Request

↓

Belongs to one Owner.

↓

Reviewed by one Admin.

---

### Business Rules

- Only verified Owners can submit profile update requests.
- Every request belongs to one Owner.
- Owner profile remains unchanged until Admin approval.
- Admin can approve or reject the request.
- Rejected requests can be updated and submitted again.
- Every request maintains its review history.
-------------------------------------------------------------

## 13. Owner Withdrawal Requests Collection

### Purpose

The Owner Withdrawal Requests collection stores all withdrawal requests submitted by Project Owners. It enables Admin to review, approve, or reject withdrawal requests while maintaining a complete withdrawal history for every project.

---

### Stores Information About

#### Request Information

- Withdrawal Request ID
- Owner ID
- Project ID

---

#### Withdrawal Details

- Requested Amount
- Withdrawable Balance
- Requested Date

---

#### Request Status

- Pending
- Approved
- Rejected

---

#### Review Information

- Reviewed By (Admin ID)
- Review Date
- Rejection Reason (If Rejected)

---

#### Transaction Reference

- Wallet Transaction ID (After Approval)

---

### Relationships

One Withdrawal Request

↓

Belongs to one Owner.

↓

Belongs to one Project.

↓

Reviewed by one Admin.

↓

Creates one Wallet Transaction after approval.

---

### Business Rules

- Only verified Owners can submit withdrawal requests.
- Withdrawal requests can be created only for Live projects.
- Requested amount cannot exceed the available Withdrawable Balance.
- Every withdrawal request belongs to one Project.
- Every withdrawal request must be reviewed by an Admin.
- Approved requests create a Wallet Transaction.
- Rejected requests do not affect the Wallet balance.
- Owners can submit multiple withdrawal requests as long as sufficient Withdrawable Balance is available.
- Every withdrawal request is permanently stored for future reference.
-------------------------------------------------------------

## 14. Admin Notes Collection

### Purpose

The Admin Notes collection stores internal notes created by Admins for monitoring projects, tracking important observations, and maintaining internal records. These notes are visible only to Admins and are never accessible to Customers or Owners.

---

### Stores Information About

#### Admin Information

- Note ID
- Admin ID

---

#### Project Information

- Project ID

---

#### Note Information

- Note Title
- Note Description

---

#### Note Metadata

- Created Date
- Last Updated Date

---

### Relationships

One Admin Note

↓

Belongs to one Admin.

↓

Belongs to one Project.

---

### Business Rules

- Only Admin can create internal notes.
- Admin Notes are linked to a single Project.
- Admin Notes are never visible to Customers.
- Admin Notes are never visible to Owners.
- Admin Notes can be updated by the Admin.
- Admin Notes are preserved for future administrative reference.
-------------------------------------------------------------

## 15. Collection Relationships

### Purpose

This section defines the relationships between all database collections used in the StageFund platform.

---

### Collection Relationships

Users

↓

One User can have one Wallet.

↓

One User can create multiple Projects (Owner).

↓

One User can make multiple Investments (Customer).

↓

One User can submit one KYC Verification.

↓

One User can raise multiple Support Tickets.

↓

One User can receive multiple Notifications.

↓

One User can submit multiple Owner Withdrawal Requests.

↓

One User can submit multiple Owner Profile Update Requests.

---

Projects

↓

One Project belongs to one Owner.

↓

One Project can have multiple Investments.

↓

One Project can have multiple Project Updates.

↓

One Project can have multiple Owner Withdrawal Requests.

↓

One Project can have multiple Admin Notes.

---

Investments

↓

One Investment belongs to one Customer.

↓

One Investment belongs to one Project.

↓

One Investment creates Wallet Transactions.

---

Wallets

↓

One Wallet belongs to one User.

↓

One Wallet contains multiple Wallet Transactions.

---

Support Tickets

↓

One Support Ticket belongs to one User.

↓

One Support Ticket is handled by one Admin.

---

Notifications

↓

One Notification belongs to one User.

---

KYC Verifications

↓

One Verification belongs to one User.

↓

One Verification is reviewed by one Admin.

---

Owner Profile Update Requests

↓

One Request belongs to one Owner.

↓

One Request is reviewed by one Admin.

---

Owner Withdrawal Requests

↓

One Request belongs to one Owner.

↓

One Request belongs to one Project.

↓

One Request creates one Wallet Transaction after approval.

---

Admin Notes

↓

One Note belongs to one Admin.

↓

One Note belongs to one Project.

--------------------------------------------------------------

## 16. Database Business Rules 

### Purpose

This section defines the global database rules to ensure data consistency, integrity, security, and proper relationships across all collections.

---

### Database Business Rules

#### User Rules

- Every User has a unique User ID.
- Email Address must be unique.
- Mobile Number must be unique.
- Every User has only one Role.
- Every User has only one Wallet.

---

#### Project Rules

- Every Project belongs to one Owner.
- Every Project follows the lifecycle:
  Created → Submitted → Rejected (if applicable) → Stage → Live → Finished.
- Only Stage projects can receive investments.
- Live projects are accessible only to the Project Owner, invested Customers, and Admin.

---

#### Investment Rules

- Every Investment belongs to one Customer.
- Every Investment belongs to one Project.
- Investment records cannot be deleted.
- Investment returns are processed only after project completion.

---

#### Wallet Rules

- Wallet balance cannot become negative.
- Every financial activity creates a Wallet Transaction.
- Customer withdrawals are processed directly after successful validation.
- Owner withdrawals require Admin approval.
- Withdrawable Balance is updated automatically after every approved Owner withdrawal.

---

#### Verification Rules

- Every Customer must complete KYC before investing.
- Every Owner must complete KYC before creating projects.
- Verification requests are reviewed only by Admin.

---

#### Notification Rules

- Every Notification belongs to one User.
- Notifications are generated automatically by the system.
- Notifications cannot be deleted.

---

#### Support Rules

- Every Support Ticket belongs to one User.
- Every Ticket receives a unique Ticket ID.
- Complete ticket history is preserved.

---

#### Data Integrity Rules

- Relationships between collections must remain consistent.
- Deleted records must not break existing relationships.
- Every collection maintains Created Date and Last Updated Date where applicable.
- Historical financial records are preserved permanently for audit purposes.
-------------------------------------------------------------

