---
name: task-planning
description: Plan and organize software development tasks effectively. Use when breaking down features, creating user stories, or planning sprints. Handles task breakdown, user stories, acceptance criteria, and backlog management.
---

# Task Planning

## When to use this skill

- **Feature development**: break new work into smaller executable tasks
- **Sprint planning**: select work that belongs in the sprint
- **Backlog grooming**: refine backlog items and adjust priorities

## Workflow

### Step 1: Define the story

- Write the user, goal, and business value clearly in one statement
- Write acceptance criteria in `Given / When / Then` form
- See [USER_STORY_TEMPLATE.md](/Users/josepinto/Projects/ouroboros/.github/skills/task-planning/USER_STORY_TEMPLATE.md) for the template and complete worked example

Inline example:

```markdown
## User Story: Join Daily Challenge

**As a** returning fitness user
**I want** to join today’s challenge
**So that** I can track my progress against a shared goal

### Acceptance Criteria

- [ ] Given an available daily challenge When the user taps Join Then the user is enrolled in the challenge
- [ ] Given the user is already enrolled When the challenge panel loads Then the join button is disabled
- [ ] Given enrollment fails When the user taps Join Then an error message is shown and enrollment is not duplicated
```

### Step 2: Validate readiness

- Review the story against INVEST before adding it as a sprint candidate
- Verify that every acceptance criterion is testable and unambiguous before estimation
- Confirm dependencies, approvals, and prerequisite work are explicitly listed

### Step 3: Break down Epic -> Story -> Task

- Split each epic into stories based on user value
- Break each story into tasks with progress that can be tracked daily
- Split any story larger than 13 points or with unclear completion conditions
- See [SPRINT_PLANNING_TEMPLATE.md](/Users/josepinto/Projects/ouroboros/.github/skills/task-planning/SPRINT_PLANNING_TEMPLATE.md) for a worked Epic -> Story -> Task example

Brief example:

```markdown
Epic: Fitness Challenge Participation

Story: Join Daily Challenge

- Task: Design challenge card states
- Task: Implement join action in UI
- Task: Add enrollment API endpoint
- Task: Prevent duplicate joins
- Task: Add unit and integration tests

Story: View Challenge Progress

- Task: Fetch participant progress summary
- Task: Render current progress and target
- Task: Add loading and empty states
```

### Step 4: Prioritize

- Apply MoSCoW or the team standard
- Check that Must Have items align with the sprint goal
- Record items explicitly excluded from the current sprint

### Step 5: Sprint Planning

- Select stories based on team capacity, velocity, and dependencies
- Verify that each selected story directly supports the sprint goal
- See [SPRINT_PLANNING_TEMPLATE.md](/Users/josepinto/Projects/ouroboros/.github/skills/task-planning/SPRINT_PLANNING_TEMPLATE.md) for the detailed format

## Validation checkpoints

- Review each story against INVEST criteria before adding it to the sprint.
- Verify every acceptance criterion is testable before estimation.
- Confirm dependencies and blockers are explicit before commitment.
- Check that each story has a clear owner or owning team before sprint start.
- Validate sprint scope against capacity and recent velocity before finalizing.

## Output format

### Task board structure

```
Backlog → To Do → In Progress → Review → Done

Backlog:
- Sorted by priority
- Stories already refined

To Do:
- Work selected for the sprint
- Owner assigned

In Progress:
- WIP Limit: 2 per person
- Work currently being executed

Review:
- Awaiting code review
- Under QA testing

Done:
- Definition of Done met
- Deployment completed
```

## Constraints

### Required rules (MUST)

1. **Clear AC**: Every story must include acceptance criteria
2. **Estimation completed**: Every story must have a point estimate
3. **Dependencies identified**: Prerequisite work must be explicit
4. **Testability ensured**: Acceptance criteria must be verifiable
5. **Sprint fit reviewed**: Stories must fit the sprint goal and capacity

### Prohibited (MUST NOT)

1. **Oversized stories**: Split any story estimated at 13+ points
2. **Vague requirements**: Do not use goals like "improve" or "optimize" without measurable conditions
3. **Unchecked sprint entry**: Do not add stories to a sprint without INVEST review

## Best practices

1. **Apply INVEST**
2. **Use Definition of Ready**
3. **Use Definition of Done**
4. **Plan from capacity**
5. **Lock testable acceptance criteria before implementation details**

## References

- [USER_STORY_TEMPLATE.md](/Users/josepinto/Projects/ouroboros/.github/skills/task-planning/USER_STORY_TEMPLATE.md)
- [SPRINT_PLANNING_TEMPLATE.md](/Users/josepinto/Projects/ouroboros/.github/skills/task-planning/SPRINT_PLANNING_TEMPLATE.md)
- [User Story Guide](https://www.atlassian.com/agile/project-management/user-stories)
- [MoSCoW Prioritization](https://www.productplan.com/glossary/moscow-prioritization/)
