# Project Structure

## 1. Project Overview

The Project Structure document defines the standardized organization of the StageFund codebase.

Its purpose is to establish a clear, scalable, and maintainable project hierarchy that can be consistently followed by developers, AI-assisted development tools, and future contributors.

The project structure separates frontend, backend, shared resources, configuration, documentation, and deployment assets into well-defined directories.

Each directory has a specific responsibility and should contain only the files related to its designated purpose.

The project structure is designed to support modular development, feature-based organization, reusable components, predictable navigation, and long-term scalability.

This document complements the approved Project BRD, Application Workflow, Database Design, API Design, Backend Architecture, and Frontend Architecture.

-------------------------------------------------------------------

## 2. Project Organization Principles

The StageFund project follows a structured organization model to ensure consistency across the entire codebase.

The organization is based on the following principles:

- Separation of Responsibilities
- Feature-Based Organization
- Modular Development
- Reusable Components
- Predictable Folder Structure
- Centralized Configuration
- Consistent Naming Conventions
- Scalable Project Growth

Every directory within the project has a clearly defined purpose.

Files should always be placed inside the appropriate directory according to their responsibility.

Shared resources should remain reusable and independent from business modules.

Business-specific implementation should remain inside its corresponding feature module.

The project structure shall remain consistent across all future enhancements.

-------------------------------------------------------------------

## 3. Repository Structure

The StageFund application is maintained as a single repository containing all project resources.

The repository includes frontend, backend, documentation, configuration, scripts, and other project assets required for development and deployment.

---

## Repository Overview

StageFund/

├── frontend/

├── backend/

├── docs/

├── scripts/

├── .github/

├── .gitignore

├── README.md

└── LICENSE

---

## Repository Responsibilities

### frontend/

Contains the complete React frontend application.

---

### backend/

Contains the complete Node.js and Express.js backend application.

---

### docs/

Contains all approved project documentation.

Examples

- Project BRD
- Application Workflow
- Database Design
- API Design
- Backend Architecture
- Frontend Architecture
- Project Structure

---

### scripts/

Contains reusable project automation scripts.

Examples

- Setup Scripts
- Build Scripts
- Utility Scripts

---

### .github/

Contains GitHub-specific project configuration.

Examples

- GitHub Workflows
- Issue Templates
- Pull Request Templates

---

## Repository Rules

- Frontend and backend remain independent applications.
- Documentation remains centralized.
- Configuration files remain organized.
- Automation scripts remain separate from application code.

-------------------------------------------------------------------

## 4. Root Directory Structure

The root directory serves as the entry point for the entire StageFund project.

Only top-level project resources should exist in the root directory.

Application source code should remain inside the frontend and backend directories.

---

## Root Directory

StageFund/

├── frontend/

├── backend/

├── docs/

├── scripts/

├── .github/

├── .gitignore

├── README.md

├── LICENSE

└── package.json (if applicable)

---

## Root Directory Responsibilities

The root directory is responsible for:

- Project organization
- Documentation access
- Repository configuration
- Shared project resources
- Development automation

Business implementation should never be placed directly inside the root directory.

---

## Root Directory Rules

- Source code belongs inside frontend or backend.
- Documentation belongs inside docs.
- Shared automation belongs inside scripts.
- Root remains clean and organized.

--------------------------------------------------------------------

## 5. Frontend Directory Structure

The frontend application follows a feature-based and modular directory structure.

Every directory has a clearly defined responsibility to ensure scalability, maintainability, and predictable development.

---

## Frontend Structure

frontend/

├── public/

├── src/

├── .env

├── package.json

├── vite.config.js

├── jsconfig.json

└── README.md

---

## Directory Responsibilities

### public/

Purpose

Stores static assets served directly by the web server.

Expected Contents

- favicon
- robots.txt
- static public assets

Rules

- Business logic is not allowed.
- Frequently changing application assets should remain inside src/assets.

---

### src/

Purpose

Contains the complete frontend source code.

Expected Contents

- Features
- Components
- Hooks
- Layouts
- Routes
- Services
- Contexts
- Utilities
- Validators

Rules

- All application code belongs inside src.
- Business implementation must remain inside feature modules.

---

## Frontend Root Rules

- Source code belongs inside src.
- Public assets belong inside public.
- Configuration remains outside src where appropriate.
- Frontend structure follows the approved Frontend Architecture.
--------------------------------------------------------------------

## 6. Backend Directory Structure

The backend application follows a layered architecture based on separation of responsibilities.

Each directory has a dedicated responsibility and should contain only the files relevant to that responsibility.

---

## Backend Structure

backend/

├── src/

├── uploads/ (temporary if applicable)

├── .env

├── package.json

├── server.js

└── README.md

---

## Directory Responsibilities

### src/

Purpose

Contains the complete backend source code.

Expected Contents

- Routes
- Controllers
- Services
- Repositories
- Models
- Middlewares
- Validators
- Utilities
- Configuration

Rules

- Business logic follows the approved Backend Architecture.
- Direct database access outside repositories is not permitted.

---

### uploads/

Purpose

Temporary storage used only when required by approved upload workflows.

Rules

- Permanent storage is not maintained here.
- Files are processed according to the approved upload architecture.

---

## Backend Root Rules

- Source code belongs inside src.
- Environment configuration remains outside src.
- Upload handling follows approved backend workflows.

--------------------------------------------------------------------

## 7. Feature Module Structure

Every business feature follows a standardized internal structure.

Each feature remains independent, modular, and reusable.

---

## Standard Feature Structure

feature/

├── pages/

├── components/

├── hooks/

├── services/

├── validators/

├── constants/

├── utils/

├── types/

├── assets/

└── index.js

---

## Folder Responsibilities

### pages/

Contains feature entry pages.

---

### components/

Contains reusable components belonging only to this feature.

---

### hooks/

Contains reusable custom hooks for this feature.

---

### services/

Contains API communication related to this feature.

---

### validators/

Contains React Hook Form and Zod validation schemas.

---

### constants/

Contains feature constants.

---

### utils/

Contains helper functions used only by this feature.

---

### types/

Contains shared types or interfaces for the feature.

---

### assets/

Contains images, icons, and static assets used only by this feature.

---

### index.js

Acts as the public export entry for the feature.

---

## Feature Rules

- Every feature remains independent.
- Shared logic should move to shared resources.
- Cross-feature dependencies should be minimized.
- Every feature follows the same folder structure.

--------------------------------------------------------------------

## 8. Shared Resources Structure

Shared resources are reusable across multiple features.

These resources must remain independent from business modules.

---

## Shared Resources

src/

├── components/

├── hooks/

├── services/

├── utils/

├── validators/

├── contexts/

├── layouts/

├── routes/

├── styles/

├── assets/

├── constants/

└── config/

---

## Shared Resource Rules

- Shared resources must remain reusable.
- Shared resources must not contain feature-specific business logic.
- Changes to shared resources should preserve backward compatibility where applicable.

--------------------------------------------------------------------

## 9. Documentation Structure

The StageFund project maintains all project documentation in a centralized documentation directory.

Documentation serves as the single source of truth for architecture, business workflows, implementation guidelines, and project standards.

---

## Documentation Directory

docs/

├── 01-Project-BRD.md

├── 02-Application-Workflow.md

├── 03-Database-Design.md

├── 04-API-Design.md

├── 05-Backend-Architecture.md

├── 06-Frontend-Architecture.md

├── 07-Project-Structure.md

---

## Documentation Rules

- Documentation remains version controlled.
- Documentation should remain synchronized with implementation.
- Approved documentation should not be duplicated.
- Every architectural decision should be reflected in documentation.

--------------------------------------------------------------------

## 10. Configuration Structure

Configuration is centralized to simplify application maintenance and environment management.

Configuration files remain independent from business logic.

---

## Configuration Directories

Frontend

src/config/

Backend

src/config/

---

## Configuration Categories

- API Configuration
- Application Configuration
- Authentication Configuration
- Database Configuration
- Upload Configuration
- Notification Configuration

---

## Configuration Rules

- Configuration remains centralized.
- Configuration must not contain business logic.
- Environment-specific values should not be hardcoded.
- Features should consume configuration rather than defining duplicate values.

--------------------------------------------------------------------

## 11. Environment Structure

Environment variables provide deployment-specific configuration while keeping sensitive values separate from application code.

---

## Environment Files

Frontend

.env

Backend

.env

---

## Environment Responsibilities

Environment variables may include:

- API Endpoints
- Application URLs
- Database Connection Settings
- Third-Party Service Configuration
- Authentication Configuration

---

## Environment Rules

- Sensitive values should never be hardcoded.
- Environment files should remain outside business logic.
- Environment-specific configuration should remain isolated.

---------------------------------------------------------------------

## 12. Assets Structure

Assets are organized according to their scope of usage.

Shared assets remain available across the application, while feature-specific assets remain inside their respective feature modules.

---

## Shared Assets

src/assets/

Examples

- Logos
- Global Icons
- Fonts
- Global Illustrations

---

## Feature Assets

features/<feature>/assets/

Examples

- Feature Images
- Feature Icons
- Feature Illustrations

---

## Asset Rules

- Shared assets remain reusable.
- Feature assets remain feature-specific.
- Duplicate assets should be avoided.
- Assets should follow approved naming conventions.

---------------------------------------------------------------------

## 13. Naming Conventions

The StageFund project follows consistent naming conventions to improve readability, maintainability, and predictable project organization.

---

## Folder Naming

Folders use:

- kebab-case

Examples

- project-review
- customer-dashboard
- investment-history

---

## React Components

Components use:

- PascalCase

Examples

- ProjectCard.jsx
- WalletSummary.jsx
- NotificationPanel.jsx

---

## Hooks

Hooks use:

- camelCase with "use" prefix

Examples

- useAuth.js
- useProjects.js
- useWallet.js

---

## Utility Files

Utility files use:

- camelCase

Examples

- formatCurrency.js
- calculateReturn.js

---

## Constants

Constants use:

- UPPER_SNAKE_CASE

Examples

- USER_ROLES
- PROJECT_STATUS
- NOTIFICATION_TYPES

---

## Rules

- Naming should remain descriptive.
- Abbreviations should be avoided unless widely accepted.
- Naming should remain consistent across frontend and backend.

---------------------------------------------------------------------

## 14. Import & Export Conventions

Imports and exports follow a standardized convention to improve readability and reduce dependency complexity.

---

## Import Principles

- Prefer absolute imports where approved.
- Group imports logically.
- Remove unused imports.

---

## Export Principles

- Feature modules should expose public functionality through a central entry file where appropriate.
- Shared modules should provide predictable exports.
- Internal implementation details should remain private.

---

## Import Rules

- Circular dependencies should be avoided.
- Cross-feature imports should remain minimal.
- Shared modules should be preferred over duplicate implementations.

----------------------------------------------------------------------

## 15. Project Structure Rules

The following rules define the mandatory project organization standards for the StageFund application.

Every developer and AI-assisted implementation must follow these rules to preserve consistency across the entire project.

---

## General Rules

- Every file shall be placed in its designated directory.
- Every folder shall have a clearly defined responsibility.
- Project organization shall remain consistent across all modules.
- Business logic and presentation logic shall remain separated.
- Code duplication should be avoided wherever possible.

---

## Feature Rules

- Every feature shall remain independent.
- Feature-specific resources shall remain inside their feature directory.
- Shared functionality shall be moved to shared resources.
- Cross-feature dependencies should remain minimal.

---

## Shared Resource Rules

- Shared resources shall remain reusable.
- Shared resources shall not contain feature-specific business logic.
- Changes to shared resources should not unintentionally break existing features.

---

## Configuration Rules

- Configuration shall remain centralized.
- Environment-specific values shall remain outside business logic.
- Hardcoded configuration values should be avoided.

---

## Documentation Rules

- Documentation shall remain synchronized with implementation.
- Architectural changes require documentation updates.
- Approved documents remain the single source of truth.

---

## Allowed

✓ Feature-based organization

✓ Reusable shared components

✓ Centralized configuration

✓ Standardized naming conventions

✓ Modular development

✓ Separation of responsibilities

---

## Not Allowed

✗ Business logic inside shared UI components

✗ Direct API calls inside presentational components

✗ Random folders at the project root

✗ Duplicate implementations across multiple features

✗ Hardcoded configuration values

✗ Circular project dependencies

---

## Project Structure Principles

- Predictable Organization
- Modular Development
- Reusable Resources
- Scalable Growth
- Consistent Structure
- Long-Term Maintainability
----------------------------------------------------------------------

## 16. AI Implementation Rules

AI-assisted development tools shall follow the approved StageFund project structure during implementation.

Before generating any code, AI must review and comply with the approved project documentation.

---

## AI Responsibilities

AI shall:

- Follow the approved folder hierarchy.
- Create files only inside approved directories.
- Respect feature boundaries.
- Reuse existing modules whenever possible.
- Follow approved naming conventions.
- Follow approved frontend and backend architectures.
- Follow approved API Design.
- Follow approved Database Design.
- Follow approved Application Workflow.

---

## File Creation Rules

AI shall:

- Create missing directories only when required.
- Avoid creating duplicate folders.
- Avoid generating unnecessary files.
- Place files according to their responsibility.
- Preserve existing project organization.

---

## Implementation Rules

AI shall never:

- Modify approved architecture without approval.
- Move files outside their designated structure.
- Create duplicate implementations.
- Introduce inconsistent naming.
- Ignore approved project documentation.

---

## Code Generation Principles

AI-generated code should be:

- Modular
- Reusable
- Maintainable
- Predictable
- Consistent
- Scalable

---

## Documentation Compliance

Before implementation, AI shall comply with:

- Project BRD
- Application Workflow
- Database Design
- API Design
- Backend Architecture
- Frontend Architecture
- Project Structure

Implementation shall not conflict with any approved documentation.