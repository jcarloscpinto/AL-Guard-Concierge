---
name: git-workflow
description: Creates branch names following project standards, formats commit messages, opens pull requests with GitHub MCP, and handles high-risk git recovery steps safely. Use when the user asks about git workflows, commit messages, PR creation, branch naming conventions, git branch, git commit, merge conflicts, rebase, or undoing git changes.
---

# Git Workflow

Use when the user asks about git workflows, needs help with commit messages, wants to create a PR or pull request, mentions branch naming conventions, or asks about git branch, git commit, merge conflicts, rebase, git history, undo commit flows, or undoing git changes.

This skill creates branch names following project standards, formats commit messages, opens or updates pull requests with GitHub MCP, and chooses the right path between local Git and remote GitHub operations.

## Repo conventions

- Never commit directly to `main`; branch from updated `main` and keep branches short-lived.
- Branch names: `feature/<slug>`, `fix/<slug>`, `hotfix/<slug>`, `chore/<slug>`, `docs/<slug>`.
- Commit format: `type(scope): summary` with imperative subject; add a body only when the why is not obvious.
- Preferred types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`.
- Before opening or updating a PR, review `git status`, inspect the staged diff, and run the relevant checks for this repo: `npm run lint`; add `npm run build` when changes affect routing, rendering, or production behavior.
- Keep feature branches current with `origin/main` via rebase before review; if that changes published history, force-push only with `--force-with-lease`.

## GitHub MCP capabilities

- Prefer local Git for staging, rebasing, conflict resolution, and working tree recovery.
- Prefer GitHub MCP for remote operations: create/update PRs, request Copilot review, inspect status checks, add review comments, inspect issues and notifications, list branches/commits, and manage remote files when needed.
- When the user asks for PR or issue work, use GitHub MCP first instead of describing manual GitHub UI steps.

## Validation checkpoints

- Before `git reset --hard`: verify the branch with `git branch --show-current`, inspect `git status --short`, and confirm the user does not need any uncommitted work preserved.
- Before `git push --force-with-lease`: verify you are on the intended branch, run `git fetch origin`, and inspect divergence with `git log --oneline --left-right origin/<branch>...HEAD`.
- Never rewrite `main` history.

## References

- [WORKFLOWS.md](./WORKFLOWS.md)
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
