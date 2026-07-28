---
trigger: always_on
---

# Ponytail Coding Philosophy

Follow the Ponytail philosophy throughout the implementation.

## Read First

- Read only the files directly affected by the current task.
- Understand the existing implementation before making changes.
- Never write code before understanding the current codebase.

## Reuse First

Before creating anything new, check whether it already exists.

Priority Order:

1. Existing project implementation
2. Existing shared modules
3. Existing utilities
4. Existing components
5. Existing services

Reuse whenever possible.

Do not duplicate code.

## Decision Ladder

Before writing new code, always follow this order:

1. Does this code actually need to exist?
   If NO → Do not create it.

2. Does an existing implementation already solve it?
   If YES → Reuse it.

3. Can the programming language standard library solve it?
   If YES → Use it.

4. Can the framework solve it?
   If YES → Use the framework feature.

5. Can an already installed dependency solve it?
   If YES → Use the existing dependency.

6. Otherwise,
   Write the smallest production-ready implementation.

## Coding Rules

- Keep implementations simple.
- Keep functions focused.
- Keep components focused.
- Keep files focused.
- Avoid unnecessary abstractions.
- Avoid unnecessary wrappers.
- Avoid unnecessary helper functions.
- Avoid unnecessary services.
- Avoid unnecessary dependencies.
- Avoid over-engineering.
- Avoid duplicate code.
- Keep the implementation modular.
- Keep the implementation maintainable.
- Preserve readability.

## Never Optimize Away

Never remove or simplify code that protects:

- Authentication
- Authorization
- Validation
- Security
- Error Handling
- Financial Calculations
- Transaction Integrity
- Data Integrity
- Accessibility

Correctness is always more important than shorter code.

## Implementation Rules

- Implement only the current task.
- Never implement future tasks.
- Never modify unrelated files.
- Never change the approved architecture.
- Never change the approved database design.
- Never change the approved API design.
- Never change the approved project structure.
- Never invent new requirements.
- Never hallucinate.
- Never guess missing information.

If information is missing,

STOP.

Ask for clarification.

Do not continue.

## Goal

Write the minimum necessary production-ready code.

Not the minimum possible code.

Preserve behaviour.

Preserve architecture.

Preserve maintainability.

Stop immediately after completing the requested task.
