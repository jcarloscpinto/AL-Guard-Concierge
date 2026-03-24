# Advanced Review Patterns

Use this file for larger changes, test-heavy refactors, or reviews that need extra coaching structure.

## Architectural Review

For larger features or risky refactors:

1. Verify the change matches the intended boundary or abstraction.
2. Ask whether the rollout could be split into smaller reviewable steps.
3. Compare the chosen design against the simplest viable alternative.
4. Check how the design behaves as requirements grow.

## Test Quality Review

Prefer tests that verify observable behavior over internal implementation details.

Review questions:

- Do the tests describe behavior clearly?
- Do they cover failure paths and edge cases?
- Are they deterministic and isolated?
- Would the test still pass after a safe refactor that preserves behavior?

## Difficult Feedback

Use this pattern when a comment is important but likely to create friction:

1. State the context briefly.
2. Describe the concrete risk or maintenance cost.
3. Suggest a path forward or a smaller experiment.

Example:

```markdown
The payment logic is now harder to test because calculation, persistence, and side effects are coupled in one function.

Would extracting the calculation path into a service make the behavior easier to test and reuse?
```

## Handling Disagreement

If the author disagrees:

1. Ask what constraint led to the current approach.
2. Distinguish objective risk from preference.
3. Use data, tests, or benchmarks when the tradeoff is unclear.
4. Escalate only when the unresolved issue is material.
