---
name: add-api-endpoint
description: Add a validated API endpoint following the project's Express layering and SQL Server conventions.
---

# Add an API endpoint

1. Inspect existing routes, controllers, services, repositories, and tests.
2. Confirm the endpoint's purpose, input, output, and authorization needs.
3. Propose a plan before broad changes.
4. Add validation at the boundary.
5. Put business rules in a service and database access in a repository.
6. Use parameterized SQL queries.
7. Add tests for success, invalid input, missing records, and authorization.
8. Run the relevant tests if available and report actual results.
