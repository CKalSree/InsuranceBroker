# Insurance Broker Management System

## Purpose
Build a small broker-management application that connects employees with third-party insurance providers and their policies. The broker facilitates enrollment; the insurer remains the provider of the insurance product.

## Architecture
- Frontend: Angular with TypeScript.
- Backend: Node.js, Express, and TypeScript.
- Database: Microsoft SQL Server.
- Testing: Playwright with TypeScript; add API tests where appropriate.
- Start as a modular monolith. Do not introduce microservices unless explicitly requested.

## Backend layering
Keep responsibilities separate:
- routes: URL and middleware wiring
- controllers: HTTP request/response handling
- services: business rules and validation orchestration
- repositories: parameterized database access
- config: environment and database configuration

## Database conventions
- Use SQL Server T-SQL.
- Use INT IDENTITY primary keys for this starter.
- Use foreign keys and CHECK constraints where appropriate.
- Use parameterized queries; never concatenate user input into SQL.
- Store money as DECIMAL, not FLOAT.
- Do not hard-delete enrollment history unless explicitly approved.
- Do not use real employee or insurance data in development.

## API conventions
- Validate request bodies and query parameters.
- Return appropriate HTTP status codes and consistent JSON errors.
- Never expose stack traces, secrets, or database credentials in API responses.
- Keep authentication and authorization in scope before any real-data deployment.

## Testing
- Add tests for success, validation failure, missing records, and unauthorized access.
- Prefer Playwright role-based locators such as getByRole().
- Prefer condition-based waiting over fixed sleeps.
- Do not claim tests passed unless they were actually run and passed.

## Working agreement
- Inspect existing files before changing them.
- Propose a plan for broad changes.
- Make focused changes and summarize changed files.
- Ask before destructive actions, schema drops, production changes, or external writes.
- Never commit secrets or personal data.
