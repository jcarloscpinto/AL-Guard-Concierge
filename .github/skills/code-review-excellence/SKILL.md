---
name: code-review-excellence
description: Reviews pull requests and code changes, generates constructive review comments, identifies bugs and quality risks, and suggests improvements aligned with architecture and best practices. Produces structured feedback with severity levels, inline suggestions, and actionable recommendations. Use when reviewing pull requests, evaluating code changes, requesting review-ready feedback, or mentoring through code review comments.
---

# Code Review Excellence

Use this skill as the compact review playbook. Keep the main flow fast. Load the deep-dive references only when the change needs them.

## Outputs

- Structured review feedback with explicit severity labels
- Inline comment suggestions tied to concrete risks or improvements
- A concise merge recommendation with blockers and non-blocking guidance
- Actionable recommendations covering correctness, architecture, maintainability, and tests

## When to Use

- Reviewing pull requests or patches
- Writing review comments with clear severity
- Mentoring through code review feedback
- Establishing a repeatable review process

## Review Process

### Phase 1: Context Gathering

Before reading line by line:

1. Read the PR description and linked issue.
2. Check CI status and note failing checks.
3. Confirm the intended user or business outcome.
4. Flag oversized changes early if reviewability is poor.

### Phase 2: High-Level Review

Assess the shape of the change first:

1. Does the solution fit the requirement?
2. Is it consistent with existing architecture and patterns?
3. Are files, boundaries, and tests organized sensibly?
4. Is there an obviously simpler approach?

### Phase 3: File Review

For each file, focus on:

1. Correctness and edge cases
2. Security and trust boundaries
3. Performance and scale risks
4. Maintainability and readability
5. Test quality and missing coverage

Use automation for formatting, lint, and trivial mechanical issues.

### Phase 4: Summary and Decision

1. Lead with the most important findings.
2. Make the merge decision explicit.
3. Separate blockers from non-blocking suggestions.
4. Call out notable strengths when they matter.

## Severity Labels

- `[blocking]`: must be fixed before merge
- `[important]`: should be fixed or explicitly discussed
- `[nit]`: optional polish, not merge-blocking
- `[suggestion]`: alternative approach to consider
- `[learning]`: educational note, no action required
- `[praise]`: highlight a strong choice worth repeating

## Key Techniques

### Checklist Method

Run a short mental pass over correctness, security, performance, maintainability, and tests. Load `assets/review-checklist.md` if you need a fuller prompt.

### Question Approach

Prefer prompts that expose risk instead of blunt assertions.

```markdown
❌ "This will fail if the list is empty."
✅ "What happens if `items` is empty here?"
```

### Suggest, Don't Command

State the risk, suggest a direction, and leave room for discussion when it is not blocking.

```markdown
❌ "Extract this into a function."
✅ "This logic appears in multiple places. Would extracting it help testing and reuse?"
```

## Deep Dive

Load extra material only when the review needs it.

| Need                                             | Load                                                                                 |
| ------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Python or TypeScript/JavaScript patterns         | [references/language-specific-patterns.md](references/language-specific-patterns.md) |
| Security-specific review pass                    | [references/security-review-checklist.md](references/security-review-checklist.md)   |
| Architecture, tests, or hard feedback situations | [references/advanced-review-patterns.md](references/advanced-review-patterns.md)     |
| Reusable review wording                          | [assets/pr-review-template.md](assets/pr-review-template.md)                         |
| Quick review prompt                              | [assets/review-checklist.md](assets/review-checklist.md)                             |

Do not load deep references for small, routine reviews when the main flow is enough.
