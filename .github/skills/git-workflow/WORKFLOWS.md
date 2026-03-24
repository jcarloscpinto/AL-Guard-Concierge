# Workflows

## Feature branch

1. Update `main`, then branch as `feature/<slug>`.
2. Commit with `type(scope): summary`.
3. Rebase on `origin/main` before review.
4. Push the branch, then use GitHub MCP to create or update the PR, request Copilot review, and check status checks.

Example:

```bash
git checkout main
git pull --ff-only origin main
git checkout -b feature/progress-page
git fetch origin
git rebase origin/main
git push -u origin feature/progress-page
```

## Hotfix branch

1. Branch from current `main` as `hotfix/<slug>`.
2. Keep the fix narrow and validate it immediately.
3. Open the PR through GitHub MCP and call out urgency in the PR body.

## Remote-only tasks

- Use GitHub MCP instead of local Git when the task is PR review, status-check inspection, issue linking, review comments, notifications, or branch/commit lookup.
