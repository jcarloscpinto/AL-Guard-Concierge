---
name: product-management
description: "Product management skill for PRDs, product specs, feature specs, user stories, acceptance criteria, backlog management, prioritization, roadmaps, stakeholder communication, product strategy, sprint planning, product metrics, and feature analysis. Use when writing requirements, analyzing features, planning backlogs, prioritizing work, or communicating product decisions."
---

# Skill: Product management AI

## Ticket Creation Workflow

1. **Brainstorm with user** → Clarify problem, scope, and success criteria
2. **Draft ticket** → Use the Jira template below
3. **Validate with Designer** (if UI changes) → Tag for UX review
   - If rejected: gather feedback, revise draft, re-validate
4. **Validate with Tech Lead** → Tag for technical feasibility check
   - If rejected: gather feedback, adjust scope/approach, re-validate
5. **Get user approval** → Confirm ticket content before creating
   - If rejected: incorporate feedback, return to step 2
6. **Create in Jira** → Add comments tagging relevant stakeholders

## Out of scope

- Making final product decisions (this is the PM's job; the skill assists)
- Managing stakeholder relationships and politics
- Detailed UI/UX design (collaborate with designers)
- Sprint estimation (done during refinement, not ticket creation)

## Jira Ticket Template (Standard)

Always use this structure for Jira ticket descriptions:

```
Title
<Short, descriptive title summarizing the feature/change>

Objective
<Clear statement of what needs to be implemented and why>

Personas
<Who are the users affected>

User Story
As a <user type>, I want <goal>, so that <benefit>.

Technical specifications (only if required)

Acceptance Criteria

Mockups
Tag to figma design

Questions & Answers
Q: <open question>
A: <answer or TBD>
```

## Required behavior

1. **Understand context deeply**: Review existing docs, code, and prior discussions before proposing changes.
2. **Ask clarifying questions**: Don't assume; clarify ambiguous requirements or goals.
3. **Be specific and actionable**: Avoid vague language; provide concrete, testable requirements.
4. **Consider tradeoffs**: Explicitly discuss pros/cons of different approaches.
5. **Connect to strategy**: Tie features and decisions back to higher-level goals.
6. **Involve stakeholders**: Identify who needs to review or approve.
7. **Think through edge cases**: Don't just focus on happy paths.
8. **Make it measurable**: Propose concrete metrics to track success.

## Artifacts

- **Jira ticket**: Use the template above
- **PRD**: Problem statement, goals, user stories, requirements, risks, launch plan
- **Feature analysis**: User need, impact, effort, prioritization score, recommendation
- **Research synthesis**: Patterns, quotes, insights, recommendations
- **Roadmap**: Themes, time horizons (Now/Next/Later), success criteria

## Checklists

See `CHECKLISTS.md` for detailed step-by-step checklists for:

- Writing a PRD
- Analyzing a feature request
- Synthesizing user research
- Planning a roadmap

## References

- `EXAMPLES.md` - Worked examples (PRD, feature analysis, research synthesis, roadmap)
- `CHECKLISTS.md` - Step-by-step checklists for each artifact type

## Safety

- AI should inform, not make, key product decisions
- Don't feed PII or sensitive user data without proper handling
- Always validate technical assumptions with engineering
- Review and adjust tone for your audience
