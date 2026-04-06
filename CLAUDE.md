# CLAUDE.md - AI Assistant Guide for Monster Newsletter

## Project Overview

**Monster Newsletter** is a newsletter project for The Monster Edu organization (`themonsteredu/monster-newsletter`).

> This is a newly initialized repository. Update this document as the project evolves.

## Repository Structure

```
monster-newsletter/
├── CLAUDE.md          # AI assistant guide (this file)
└── (project files TBD)
```

## Getting Started

1. Clone the repository
2. Check out your feature branch
3. Install dependencies (once a package manager is configured)

## Development Workflow

### Branching

- Feature branches follow the pattern: `claude/<description>-<id>` or `<type>/<description>`
- Always develop on your assigned feature branch, never push directly to `main`

### Commits

- Write clear, descriptive commit messages
- Focus on the "why" rather than the "what"
- Keep commits atomic - one logical change per commit

### Pull Requests

- Keep PR titles under 70 characters
- Include a summary and test plan in PR descriptions
- Do not create PRs unless explicitly asked

## Code Conventions

> Update this section as the tech stack is established.

- Prefer simple, readable code over clever abstractions
- Do not add features, refactor code, or make improvements beyond what was requested
- Only add comments where logic is not self-evident
- Do not add error handling for scenarios that cannot happen

## Testing

> Update this section once a test framework is chosen.

- Run tests before committing changes
- Ensure all tests pass before pushing

## CI/CD

> Update this section once CI/CD pipelines are configured.

## Key Guidelines for AI Assistants

1. **Read before editing** - Always read existing files before modifying them
2. **Minimal changes** - Only change what is needed to complete the task
3. **No speculative abstractions** - Do not design for hypothetical future requirements
4. **Respect existing patterns** - Follow conventions already established in the codebase
5. **Security first** - Never introduce vulnerabilities (XSS, injection, etc.)
6. **No secrets in code** - Never commit `.env` files, API keys, or credentials
7. **Ask when uncertain** - If a task is ambiguous, clarify before proceeding
