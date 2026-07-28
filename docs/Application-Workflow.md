# StageFund Application Workflow

## 1. Complete Application Flow

### Purpose

This workflow describes the complete journey of every user in the StageFund platform, starting from account registration to performing role-based operations. It provides a high-level overview of how Customers, Owners, and Administrators interact with the platform.

### Workflow

User Opens StageFund Application

↓

Selects Account Type

• Customer
• Owner

↓

Registers Account

• Full Name
• Mobile Number
• Email Address
• Password

↓

Mobile Number Verification (OTP)

↓

Email Verification (OTP)

↓

Account Created Successfully

↓

User Login

↓

Role-Based Dashboard Opens

↓

User Can Explore the Platform

↓

Customer
• Can browse available projects.
• Can view project details.
• Cannot invest until profile verification is completed.

OR

Owner
• Can access owner dashboard.
• Cannot create or submit projects until profile verification is completed.

↓

User Completes Profile

• Personal Information
• Address Information
• Bank Account Details
• Required KYC Documents

↓

Profile Submitted for Verification

↓

Admin Reviews Verification

↓

If Approved

↓

Customer
• Investment features become active.

OR

Owner
• Project creation and submission features become active.

↓

User Continues Role-Based Operations

↓

Logout

### Entry Point

User opens the StageFund application.

### Exit Point

User successfully accesses all features permitted for their verified role or logs out of the application.

-------------------------------------------
## 2. Authentication Workflow

### Purpose

This workflow defines how Customers and Owners create their accounts, verify their contact details, securely log into the platform, and access their respective dashboards.

---

### Customer Registration Workflow

User selects **Customer** account type.

↓

User enters:

- Full Name
- Mobile Number
- Email Address
- Password

↓

Verify Mobile Number using OTP.

↓

Verify Email Address using OTP.

↓

Customer account is created successfully.

↓

Customer logs into the platform.

↓

Customer Dashboard opens.

↓

Customer can browse projects.

↓

Customer cannot perform any financial activity until profile verification is completed.

---

### Owner Registration Workflow

User selects **Owner** account type.

↓

User enters:

- Full Name
- Mobile Number
- Email Address
- Password

↓

Verify Mobile Number using OTP.

↓

Verify Email Address using OTP.

↓

Owner account is created successfully.

↓

Owner logs into the platform.

↓

Owner Dashboard opens.

↓

Owner cannot create or submit projects until profile verification is completed.

---

### Login Workflow

User enters registered Email Address and Password.

↓

System validates the credentials.

↓

If credentials are valid

↓

User is redirected to the respective dashboard based on the selected account type.

↓

If credentials are invalid

↓

System displays an appropriate error message.

---

### Logout Workflow

User selects Logout.

↓

Current session is terminated.

↓

User is redirected to the Login screen.

---

### Authentication Business Rules

- Every account must be registered either as a Customer or an Owner.
- A mobile number can be registered only once.
- An email address can be registered only once.
- Mobile number verification is mandatory before account creation.
- Email verification is mandatory before account creation.
- Users can log in only after successful account registration.
- Customer Dashboard becomes accessible immediately after login.
- Owner Dashboard becomes accessible immediately after login.
- Profile verification is not required for login.
- Financial operations remain restricted until profile verification is approved.

---

### Entry Point

User selects an account type and starts the registration process.

---

### Exit Point

User successfully logs into the platform and reaches the respective dashboard.

---

## 3. Onboarding & Verification Workflow

### Purpose

This workflow describes how a Customer or Owner completes their profile after registration and gets verified before accessing financial features on the platform.

---

### Customer Onboarding Workflow

Customer logs into the platform.

↓

Customer Dashboard opens.

↓

Customer can browse available projects.

↓

Customer attempts to perform a financial activity.

↓

System checks profile verification status.

↓

If Profile is Incomplete

↓

Redirect to "Complete Your Profile"

↓

Customer completes:

- Personal Information
- Address Information
- Bank Account Details
- Upload Required KYC Documents

↓

Customer submits profile for verification.

↓

Verification status becomes "Pending".

↓

Admin reviews the submitted information and documents.

↓

If Approved

↓

Verification status becomes "Verified".

↓

Customer can now:

- Invest in Projects
- Use Wallet Features
- Perform all financial operations.

---

### Owner Onboarding Workflow

Owner logs into the platform.

↓

Owner Dashboard opens.

↓

Owner attempts to create a project.

↓

System checks profile verification status.

↓

If Profile is Incomplete

↓

Redirect to "Complete Your Profile"

↓

Owner completes:

- Personal Information
- Address Information
- Bank Account Details
- Upload Required KYC Documents

↓

Owner submits profile for verification.

↓

Verification status becomes "Pending".

↓

Admin reviews the submitted information and documents.

↓

If Approved

↓

Verification status becomes "Verified".

↓

Owner can now:

- Create Projects
- Submit Projects for Review
- Access all owner financial features.

---

### Verification Status

Profile verification can have one of the following statuses:

- Incomplete
- Pending
- Verified
- Rejected

---

### Verification Business Rules

- Profile verification is mandatory before any financial operation.
- Customers can browse projects without profile verification.
- Customers cannot invest until profile verification is approved.
- Owners cannot create or submit projects until profile verification is approved.
- Every verification request must be reviewed by an Admin.
- A rejected profile can be updated and submitted again for verification.

---

### Entry Point

User logs into the platform for the first time after registration.

---

### Exit Point

User becomes verified and gains access to all role-based financial features.

---

## 4. Customer Workflow

### Purpose

This workflow describes the complete journey of a Customer after successful registration and profile verification, including project exploration, investment, wallet usage, investment tracking, profile management, and support.

---

### Customer Workflow

Customer logs into the platform.

↓

Customer Dashboard opens.

↓

Browse Available Projects

↓

Apply Filters (Category, Location, Risk Level, Investment Amount)

↓

View Project Details

↓

View:

- Funding Progress
- Expected Returns
- Risk Level
- Minimum Investment
- Project Information

↓

Customer chooses one of the following:

• Add Project to Cart

OR

• Invest Now

↓

If "Add to Cart"

↓

Project is added to My Cart.

↓

Customer can continue browsing other projects.

↓

Customer opens My Cart.

↓

Customer selects a project.

↓

Proceed to Investment.

OR

If "Invest Now"

↓

System checks:

- Profile Verification Status
- Wallet Balance
- Minimum Investment Requirement

↓

If validation is successful

↓

Investment is completed successfully.

↓

Wallet balance is updated.

↓

Investment record is created.

↓

Project funding progress is updated.

↓

Customer can now monitor investments.

↓

Track My Money

↓

View Live Projects

↓

View Project Updates

↓

After project completion

↓

View Finished Projects

↓

View:

- Invested Amount
- Returned Amount
- Profit / Loss

↓

Manage Wallet

↓

Add Funds

↓

Withdraw Funds

↓

View Wallet Balance

↓

Manage Profile

↓

Update Personal Information

↓

Raise Support Ticket (If Required)

↓

Logout

---

### Customer Business Rules

- Only verified customers can invest in projects.
- Projects can be viewed without profile verification.
- Investment is allowed only if wallet balance is sufficient.
- Investment amount must be equal to or greater than the minimum investment amount.
- Every successful investment updates the wallet balance and project funding progress.
- Customers can track both Live and Finished projects.
- Only customers who invested in a project can view Live Project details and updates.
- Wallet withdrawals are allowed only if sufficient balance is available.

---

### Entry Point

Verified Customer logs into the platform.

---

### Exit Point

Customer successfully performs the required activity or logs out of the platform.

---

## 5. Owner Workflow

### Purpose

This workflow describes the complete journey of an Owner after successful registration and profile verification, including project creation, project submission, funding stages, project updates, withdrawals, and completed projects.

---

### Owner Workflow

Owner logs into the platform.

↓

Owner Dashboard opens.

↓

Owner selects "New Project".

↓

Owner enters all required project details.

↓

Project is saved in **Created** status.

↓

Owner reviews the project.

↓

Owner submits the project for review.

↓

Project status changes to **Submitted**.

↓

Admin reviews the submitted project.

↓

If Approved

↓

Project status changes to **Stage**.

↓

Project becomes visible to all verified customers.

↓

Customers start investing in the project.

↓

Owner monitors:

- Funding Progress
- Raised Amount
- Target Amount

↓

When the funding target is achieved

↓

Project status changes to **Live**.

↓

Owner can:

- View Live Project
- Post Project Updates
- View Previous Updates
- Request Fund Withdrawal

↓

Live project is visible only to:

- Project Owner
- Customers who invested in that project
- Admin

↓

Project work is completed.

↓

Admin verifies the final completion.

↓

Fund settlement is completed.

↓

Project status changes to **Finished**.

↓

Owner can view:

- Project Summary
- Total Funds Raised
- Final Project Details

↓

Owner manages Wallet.

↓

Owner manages Profile.

↓

Owner raises Support Ticket (if required).

↓

Logout

---

### Owner Business Rules

- Only verified owners can create projects.
- Every newly created project starts with **Created** status.
- A project must be submitted before Admin review.
- Submitted projects cannot enter the Stage without Admin approval.
- Stage projects are visible to all verified customers.
- Customers can invest only while the project is in Stage.
- A project becomes Live only after the funding target is reached.
- Live projects are visible only to the Project Owner, invested Customers, and Admin.
- Only Admin can mark a project as Finished after final verification.
- Finished projects become read-only for historical reference.

---

### Entry Point

Verified Owner logs into the platform.

---

### Exit Point

Owner successfully manages project activities or logs out of the platform.

---

## 6. Admin Workflow

### Purpose

This workflow describes the complete responsibilities of the Admin, including profile verification, project validation, project monitoring, profile update approval, and project completion.

---

### Admin Workflow

Admin logs into the platform.

↓

Admin Dashboard opens.

↓

Admin views pending Customer verification requests.

↓

Admin reviews:

- Personal Information
- Bank Account Details
- KYC Documents

↓

Admin selects one of the following:

• Approve

OR

• Reject

↓

If Approved

↓

Customer verification status becomes **Verified**.

↓

Customer can now perform all financial activities.

---

Admin views pending Owner verification requests.

↓

Admin reviews:

- Personal Information
- Bank Account Details
- KYC Documents

↓

Admin selects one of the following:

• Approve

OR

• Reject

↓

If Approved

↓

Owner verification status becomes **Verified**.

↓

Owner can now create projects.

---

Admin views Submitted Projects.

↓

Admin reviews:

- Project Information
- Required Documents
- Investment Details

↓

Admin selects one of the following:

• Approve

OR

• Reject

↓

If Approved

↓

Project status changes to **Stage**.

↓

Project becomes visible to verified customers.

---

Admin monitors Live Projects.

↓

Admin can view:

- Funding Progress
- Raised Amount
- Owner Updates
- Withdrawal Requests

↓

Admin adds internal notes if required.

↓

Admin verifies project completion.

↓

Admin performs final fund settlement.

↓

Project status changes to **Finished**.

---

Admin reviews Owner Profile Update Requests.

↓

Admin compares old and new information.

↓

Admin selects:

• Approve

OR

• Reject

↓

If Approved

↓

Owner profile is updated successfully.

---

Admin monitors platform activities.

↓

Logout

---

### Admin Business Rules

- Only Admin can verify Customer profiles.
- Only Admin can verify Owner profiles.
- Only Admin can approve or reject submitted projects.
- Only Admin can move a project from Submitted to Stage.
- Only Admin can perform final project verification.
- Only Admin can change a project status to Finished.
- Only Admin can approve Owner profile update requests.
- Admin internal notes are not visible to Customers or Owners.

---

### Entry Point

Admin logs into the platform.

---

### Exit Point

Admin completes the required administrative operations or logs out.
---

## 7. Project Lifecycle Workflow

### Purpose

This workflow describes how a project moves through different stages from creation to completion while defining who can access and manage the project at each stage.

---

### Project Lifecycle Workflow

Verified Owner logs into the platform.

↓

Owner creates a new project.

↓

Project status becomes **Created**.

↓

Project is saved as a Draft.

↓

Owner reviews the project.

↓

Owner submits the project for review.

↓

Project status changes to **Submitted**.

↓

Project becomes read-only for the Owner.

↓

Admin reviews the submitted project.

↓

If Rejected

↓

Project status becomes **Rejected**.

↓

Owner reviews the rejection reason.

↓

Owner updates the project.

↓

Owner submits the project again.

↓

Project status changes to **Submitted**.

OR

If Approved

↓

Project status changes to **Stage**.

↓

Project becomes visible to all Verified Customers.

↓

Customers start investing.

↓

Funding Progress continuously updates.

↓

When Total Investment reaches the Funding Target

↓

Project status changes to **Live**.

↓

Project is no longer visible to other customers.

↓

Live Project is accessible only to:

- Project Owner
- Customers who invested in the project
- Admin

↓

Owner posts project updates.

↓

Invested customers can view project updates.

↓

Owner requests fund withdrawal (if applicable).

↓

Project work is completed.

↓

Admin performs final verification.

↓

Admin completes fund settlement.

↓

Project status changes to **Finished**.

↓

Finished Project becomes available for historical reference.

↓

Owner can view final project summary.

↓

Invested customers can view investment result, returns, and profit/loss.

---

### Project Status Definitions

**Created**

Project is saved as a draft and can be edited by the Owner.

**Submitted**

Project has been submitted for Admin review and cannot be edited until review is completed.

**Rejected**

Project has been rejected by the Admin. The Owner can review the rejection reason, update the project, and submit it again.

**Stage**

Project has been approved by the Admin and is open for investment by verified customers.

**Live**

Project funding is completed. The project is now active and visible only to the Project Owner, invested Customers, and Admin.

**Finished**

Project has been completed, final settlement has been performed, and the project is stored for future reference.

---

### Project Lifecycle Business Rules

- Every project starts with the **Created** status.
- Only verified Owners can create projects.
- A project must be submitted before Admin review.
- Submitted projects cannot be edited until Admin completes the review.
- Rejected projects can be edited and submitted again.
- Only Admin can approve or reject submitted projects.
- Only approved projects move to the **Stage** status.
- Only verified Customers can invest in Stage projects.
- A project becomes **Live** only after reaching its funding target.
- Live projects are visible only to the Project Owner, invested Customers, and Admin.
- Only Admin can mark a project as **Finished** after final verification and settlement.

---

### Entry Point

Verified Owner creates a new project.

---

### Exit Point

Project reaches the **Finished** status and becomes available for historical reference.

---

## 8. Investment Lifecycle Workflow

### Purpose

This workflow describes the complete investment journey from selecting a project to receiving final returns after project completion.

---

### Investment Lifecycle Workflow

Verified Customer logs into the platform.

↓

Customer browses available Stage projects.

↓

Customer selects a project.

↓

Customer reviews:

- Project Details
- Funding Progress
- Expected Returns
- Risk Level
- Minimum Investment Amount

↓

Customer chooses one of the following:

• Add to Cart

OR

• Invest Now

↓

If "Add to Cart"

↓

Project is added to My Cart.

↓

Customer can continue browsing other projects.

↓

Customer opens My Cart.

↓

Customer selects the project.

↓

Proceed to Investment.

OR

If "Invest Now"

↓

System validates:

- Customer Verification Status
- Wallet Balance
- Minimum Investment Requirement
- Project Status (Stage)

↓

If validation is successful

↓

Investment amount is deducted from Customer Wallet.

↓

Investment record is created.

↓

Project funding amount is updated.

↓

Customer receives investment confirmation.

↓

Customer can monitor the investment under **Live Projects**.

↓

Owner completes the project.

↓

Admin performs final verification.

↓

Project status changes to **Finished**.

↓

Return amount is calculated.

↓

Profit / Loss is calculated.

↓

Return amount is credited to the Customer Wallet.

↓

Customer can view:

- Investment Amount
- Return Amount
- Profit / Loss
- Completed Project Details

---

### Investment Status

**Pending**

Investment request is being processed.

**Active**

Investment is successfully completed and the project is running.

**Completed**

Project has finished and investment has been settled.

---

### Investment Lifecycle Business Rules

- Only verified Customers can invest.
- Investment is allowed only in Stage projects.
- Investment amount must be equal to or greater than the project's minimum investment amount.
- Customer Wallet must have sufficient balance.
- Every successful investment creates an investment record.
- Every successful investment updates the project's funding progress.
- Investment cannot be cancelled after successful confirmation.
- Returns are processed only after the project reaches the Finished status.
- Profit or Loss is calculated after project completion.
- Return amount is credited to the Customer Wallet after final settlement.

---

### Entry Point

Verified Customer selects a Stage project for investment.

---

### Exit Point

Investment is successfully completed and the final return is credited after project completion.

---

## 9. Wallet Workflow

### Purpose

This workflow describes how Customers and Owners manage their wallet balances, perform deposits and withdrawals, and how wallet transactions are processed within the platform.

---

### Customer Wallet Workflow

Verified Customer logs into the platform.

↓

Customer opens **My Wallet**.

↓

Customer can view:

- Available Balance

↓

Customer selects one of the following:

• Add Funds

OR

• Withdraw Funds

---

If "Add Funds"

↓

Customer enters the amount.

↓

Payment is processed successfully.

↓

Wallet balance is updated.

↓

Transaction is recorded.

↓

Customer can use the updated balance for investments.

---

If "Withdraw Funds"

↓

Customer enters the withdrawal amount.

↓

System validates available wallet balance.

↓

If validation is successful

↓

Withdrawal request is processed.

↓

Wallet balance is updated.

↓

Transaction is recorded.

---

### Owner Wallet Workflow

Verified Owner logs into the platform.

↓

Owner opens **My Wallet**.

↓

Owner can view:

- Available Balance

↓

Owner selects one of the following:

• Add Funds

OR

• Withdraw Funds

---

If "Add Funds"

↓

Owner enters the amount.

↓

Payment is processed successfully.

↓

Wallet balance is updated.

↓

Transaction is recorded.

---

If "Withdraw Funds"

↓

Owner enters the withdrawal amount.

↓

System validates the available withdrawal balance.

↓

If validation is successful

↓

Withdrawal request is submitted.

↓

Admin reviews the withdrawal request.

↓

If Approved

↓

Amount is transferred to the Owner.

↓

Wallet balance is updated.

↓

Transaction is recorded.

↓

Owner can submit additional withdrawal requests whenever sufficient withdrawable balance is available.

---

### Wallet Transaction Types

- Add Funds
- Investment Deduction
- Investment Return
- Customer Withdrawal
- Owner Withdrawal

---

### Wallet Business Rules

- Every Customer has one Wallet.
- Every Owner has one Wallet.
- Wallet balance cannot become negative.
- Customers can invest only if sufficient wallet balance is available.
- Every wallet activity creates a transaction record.
- Customer withdrawals are allowed only if sufficient wallet balance is available.
- Owner withdrawals require Admin approval.
- Owners can perform multiple withdrawals as long as withdrawable balance is available.
- Investment returns are credited to the Customer Wallet after project completion.

---

### Entry Point

Verified Customer or Owner opens the Wallet module.

---

### Exit Point

Wallet operation is completed successfully and the transaction is recorded.

---

## 10. Support Workflow

### Purpose

This workflow describes how Customers and Owners communicate with the platform support team by raising support tickets, tracking ticket status, and viewing responses.

---

### Support Workflow

Verified Customer or Owner logs into the platform.

↓

User opens **Support**.

↓

User can access:

- Privacy Policy
- FAQs
- Raise a Ticket
- Your Tickets

↓

If user selects **Privacy Policy**

↓

User can view:

- Overview
- Information We Collect
- How Information is Used
- Contact Information

↓

Return to Support.

---

If user selects **FAQs**

↓

User can browse frequently asked questions.

↓

User can read answers related to:

- Investment
- Wallet
- Returns
- Projects
- Verification
- Support

↓

Return to Support.

---

If user selects **Raise a Ticket**

↓

User enters:

- Subject
- Category
- Description

↓

User submits the ticket.

↓

Ticket status becomes **Open**.

↓

Support team reviews the ticket.

↓

Support team replies to the ticket.

↓

Ticket status changes accordingly.

↓

User can view the latest reply.

↓

If issue is resolved

↓

Ticket status becomes **Closed**.

---

If user selects **Your Tickets**

↓

User can view:

- Ticket Number
- Subject
- Category
- Current Status
- Latest Update
- Created Date

↓

User opens a ticket.

↓

User can read the complete conversation and latest updates.

---

### Ticket Status

- Open
- In Progress
- Resolved
- Closed

---

### Support Business Rules

- Only logged-in users can raise support tickets.
- Every ticket must have a Subject, Category, and Description.
- Every submitted ticket receives a unique Ticket ID.
- Users can view only their own support tickets.
- Support replies are visible only to the ticket owner.
- Closed tickets become read-only.

---

### Entry Point

Verified Customer or Owner opens the Support module.

---

### Exit Point

Support request is submitted successfully or the user exits the Support module.

---

## 11. Notification Workflow

### Purpose

This workflow describes how the platform informs Customers and Owners about important activities related to their accounts, projects, investments, wallet operations, and verification status.

---

### Notification Workflow

A system event occurs.

↓

The platform identifies the affected user.

↓

A notification is generated.

↓

The notification is delivered to the respective user's account.

↓

User opens the Notification Center.

↓

User views the notification details.

↓

User performs the required action (if applicable).

↓

Notification is marked as Read.

---

### Customer Notification Events

Customer receives notifications for:

- Profile Verification Approved
- Profile Verification Rejected
- Successful Investment
- Project Status Updates
- Investment Returns Credited
- Wallet Deposit Successful
- Wallet Withdrawal Successful
- Support Ticket Updates

---

### Owner Notification Events

Owner receives notifications for:

- Profile Verification Approved
- Profile Verification Rejected
- Project Approved
- Project Rejected
- Project Status Changed
- Funding Target Achieved
- Withdrawal Request Approved
- Withdrawal Request Rejected
- Support Ticket Updates

---

### Admin Notification Events

Admin receives notifications for:

- New Customer Verification Request
- New Owner Verification Request
- New Submitted Project
- New Owner Profile Update Request
- New Owner Withdrawal Request

---

### Notification Business Rules

- Notifications are generated automatically by the system.
- Every notification belongs to a specific user.
- Users can view only their own notifications.
- Notifications remain available until viewed by the user.
- A notification can be marked as Read after viewing.

---

### Entry Point

A system event triggers a notification.

---

### Exit Point

The notification is delivered and viewed by the respective user.

---

## 12. Project Visibility Rules

### Purpose

This section defines which users can view and access projects during different stages of the project lifecycle.

---

### Created Project

Visible To:

- Project Owner

Access Rights:

- View Project
- Edit Project
- Delete Project
- Submit for Review

---

### Submitted Project

Visible To:

- Project Owner
- Admin

Access Rights:

Owner:

- View Project
- View Submission Status

Admin:

- View Project
- Approve Project
- Reject Project

---

### Stage Project

Visible To:

- All Verified Customers
- Project Owner
- Admin

Access Rights:

Verified Customers:

- Browse Project
- View Project Details
- Add to Cart
- Invest

Project Owner:

- View Funding Progress
- View Raised Amount

Admin:

- Monitor Project
- Track Funding Progress

---

### Live Project

Visible To:

- Project Owner
- Customers who invested in the project
- Admin

Access Rights:

Project Owner:

- View Project
- Post Project Updates
- View Previous Updates
- Request Fund Withdrawal

Invested Customers:

- View Project
- View Project Updates
- Track Investment

Admin:

- Monitor Project
- Review Owner Updates
- Review Withdrawal Requests
- Verify Project Completion

---

### Finished Project

Visible To:

Project Owner:

- View Project Summary
- View Final Project Details

Invested Customers:

- View Investment Summary
- View Return Amount
- View Profit / Loss

Admin:

- View Complete Project History

---

### Visibility Business Rules

- Created projects are visible only to the Project Owner.
- Submitted projects are visible only to the Project Owner and Admin.
- Stage projects are visible to all Verified Customers, the Project Owner, and Admin.
- Only Stage projects can receive investments.
- Live projects are visible only to the Project Owner, invested Customers, and Admin.
- Customers who have not invested in a Live project cannot access that project.
- Finished projects remain available for historical reference according to the user's role.

---

## 13. Business Rules

### Purpose

This section defines the core business rules that govern the overall behavior of the StageFund platform.

---

### General Business Rules

- Every user must register either as a Customer or an Owner.
- Every registered account must have a unique Mobile Number.
- Every registered account must have a unique Email Address.
- Mobile Number verification is mandatory during registration.
- Email verification is mandatory during registration.
- Users can access their dashboard immediately after successful login.
- Profile verification is mandatory before accessing financial features.

---

### Customer Rules

- Customers can browse projects without profile verification.
- Customers cannot invest until profile verification is approved.
- Customers can invest only in Stage projects.
- Customers can invest only if sufficient wallet balance is available.
- Investment amount must be equal to or greater than the project's minimum investment amount.
- Every successful investment updates the project funding progress.
- Customers can access Live projects only if they have invested in them.
- Customers can view Finished projects only if they invested in those projects.

---

### Owner Rules

- Only verified Owners can create projects.
- Every new project starts with the Created status.
- Projects must be submitted before Admin review.
- Submitted projects cannot be edited until Admin completes the review.
- Rejected projects can be modified and submitted again.
- Stage projects become visible to all verified Customers.
- Owners can request multiple withdrawals based on the available withdrawable balance.
- Owners can post updates only after the project reaches the Live stage.

---

### Admin Rules

- Only Admin can verify Customer profiles.
- Only Admin can verify Owner profiles.
- Only Admin can approve or reject submitted projects.
- Only Admin can move a project from Submitted to Stage.
- Only Admin can perform final project verification.
- Only Admin can mark a project as Finished.
- Only Admin can approve Owner profile update requests.

---

### Wallet Rules

- Every Customer has one Wallet.
- Every Owner has one Wallet.
- Wallet balance cannot become negative.
- Every wallet transaction must be recorded.
- Customer withdrawals are processed directly after successful validation.
- Owner withdrawals require Admin approval.

---

### Project Rules

- Every project follows the lifecycle:
  Created → Submitted → Stage → Live → Finished.
- Only Stage projects can receive investments.
- A project becomes Live only after reaching its funding target.
- Live projects are visible only to the Project Owner, invested Customers, and Admin.
- Finished projects become read-only and remain available for historical reference.

---

### Support Rules

- Only logged-in users can raise support tickets.
- Every support ticket must contain a Subject, Category, and Description.
- Every ticket receives a unique Ticket ID.
- Users can view only their own support tickets.

---

### Notification Rules

- Notifications are generated automatically based on system events.
- Every notification belongs to a single user.
- Users can access only their own notifications.

---

### End of Business Rules

---

## 14. Exception Handling

### Purpose

This section defines how the StageFund platform handles invalid operations, failed validations, and exceptional scenarios while maintaining data integrity and platform security.

---

### Registration Exceptions

- Registration fails if the Mobile Number is already registered.
- Registration fails if the Email Address is already registered.
- Registration fails if Mobile OTP verification is unsuccessful.
- Registration fails if Email OTP verification is unsuccessful.
- Registration fails if mandatory registration fields are missing.

---

### Authentication Exceptions

- Login fails if the Email or Mobile Number does not exist.
- Login fails if the Password is incorrect.
- Login is denied if the account is inactive.

---

### Profile Verification Exceptions

- Financial features remain locked if profile verification is incomplete.
- Verification request is rejected if mandatory information is missing.
- Verification request is rejected if uploaded documents are invalid.
- Rejected profiles can be updated and submitted again.

---

### Project Exceptions

- Project creation is blocked if the Owner is not verified.
- Project submission fails if mandatory project information is incomplete.
- Submitted projects cannot be edited until Admin review is completed.
- Only Stage projects can receive investments.
- Investments are blocked if the project is no longer available for investment.

---

### Investment Exceptions

- Investment fails if Customer verification is incomplete.
- Investment fails if Wallet Balance is insufficient.
- Investment fails if the investment amount is below the project's minimum investment amount.
- Investment fails if the project funding has already been completed.
- Investment cannot be cancelled after successful confirmation.

---

### Wallet Exceptions

- Add Funds fails if the payment transaction is unsuccessful.
- Customer withdrawal fails if wallet balance is insufficient.
- Owner withdrawal request fails if withdrawable balance is insufficient.
- Owner withdrawal remains pending until Admin approval.

---

### Support Exceptions

- Support ticket cannot be submitted if mandatory fields are missing.
- Users cannot access support tickets created by other users.

---

### Authorization Exceptions

- Customers cannot access Owner modules.
- Owners cannot access Customer-only investment features.
- Customers and Owners cannot access Admin modules.
- Users cannot access projects that are restricted based on project visibility rules.

---

### System Exceptions

- Invalid requests return an appropriate error message.
- Unauthorized requests are denied.
- Unexpected system errors are logged for administrative review.