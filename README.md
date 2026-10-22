# Insurance Broker Management System — Claude Code Starter

A starter blueprint for an insurance broker that connects employees with third-party insurers.

## Stack
- Frontend: Angular (add your Angular workspace under `frontend/`)
- Backend: Node.js + Express + TypeScript (add API under `backend/api/`)
- Database: Microsoft SQL Server
- UI/API testing: Playwright + TypeScript
- AI-assisted development: Claude Code

## Database
Run `database/001_create_schema.sql` against a **development** SQL Server database.
It creates:
- Brokers
- Employees
- InsuranceProviders
- InsurancePolicies
- Enrollments

The script includes foreign keys, basic constraints, indexes, and illustrative seed data. It is not a production-ready insurance data model.

## Claude Code configuration
Open Claude Code from this repository root. It will use `CLAUDE.md` as the main project instruction file. Review `.claude/settings.json` before use; settings and hook behavior can vary by Claude Code version.

- `.claude/rules/`: focused coding guidance
- `.claude/skills/`: reusable task playbooks
- `.claude/agents/`: optional specialist subagents
- `.claude/hooks/`: location for hook scripts if you configure hooks in settings
- `.mcp.json.example`: example only; rename to `.mcp.json` only after configuring a real MCP server

`CLAUDE.local.md` is a local-notes example and is not relied on as an automatically loaded instruction file here. `settings.local.json` is a local settings example; validate its contents before use.

## Suggested first prompt
"Read CLAUDE.md and the rules. Review the database schema. Propose a minimal Express + TypeScript API for Employees, Providers, Policies, and Enrollments. Do not modify files until you show me the proposed plan."

## Security notes
- Use fictional data only during development.
- Do not store employee health details, government identifiers, payment card data, passwords, or real policy documents in this starter.
- Add authentication, role-based authorization, audit logging, encryption, backups, retention rules, and legal/compliance review before handling real employee or insurance data.
- Do not connect this starter to production systems.
