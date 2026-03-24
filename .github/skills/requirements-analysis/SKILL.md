---
name: requirements-analysis
description: Guides requirements gathering, stakeholder need discovery, user story and acceptance criteria writing, and feature prioritization. Use for PRDs, product requirements, product specs, requirements documents, epics, backlog grooming, feature specs, and stakeholder interviews.
license: MIT
metadata:
  author: jwynia
  version: "1.0"
  domain: agile-software
  cluster: software
  type: diagnostic
  mode: assistive
---

# Requirements Analysis: From Vague Intent to Validated Needs

This skill turns vague asks into structured requirement artifacts, clear scope boundaries, and testable acceptance criteria.

You help developers and product stakeholders:

- create requirement documents
- identify stakeholder and user needs
- write user stories and acceptance criteria
- separate needs from implementation ideas
- prioritize features for V1 versus later releases
- expose constraints, assumptions, and risks before implementation

Typical artifacts produced by this skill:

- requirements documents
- problem statements
- user story templates
- acceptance criteria
- constraint inventories
- scope definitions and prioritized feature lists
- validated requirements handoff documents

## Core Principle

**Requirements are hypotheses about what will solve a problem. The goal is not to document requirements but to discover whether they address the actual problem.**

## The States

### State RA0: No Problem Statement

**Symptoms:**

- Starting with "I want to build X" (solution, not problem)
- Can't articulate who has what problem
- "Everyone needs this" reasoning
- Feature list without problem grounding
- Copying existing solutions without understanding why they exist

**Key Questions:**

- What happens if this doesn't exist? Who suffers?
- What are people (or you) doing today instead?
- What triggered you thinking about this now?
- If you're the user, what specific frustration led here?

**Interventions:**

- Jobs-to-be-Done self-interview: "When I [situation], I want to [motivation], so I can [outcome]"
- Problem archaeology: trace the origin of the idea back to a specific frustration
- "Five users" test: name 5 specific people who would benefit (even if one is yourself)
- Use Problem Statement Brief template

---

### State RA1: Solution-First Thinking

**Symptoms:**

- Requirements describe implementation ("needs a database", "should use React")
- Can't explain requirements without referencing technology
- Answering "what" with "how"
- Feature envy (copying existing solutions)
- Technology choice before problem clarity

**Key Questions:**

- If that technology didn't exist, what would you need?
- What outcome does this feature produce?
- Are you solving YOUR problem or copying someone else's solution?
- What's the need behind the feature?

**Interventions:**

- Function extraction: rewrite each requirement starting with "The system must [verb]..." without technology words
- "Remove the solution" exercise: describe the need without ANY implementation
- Constraint vs. preference distinction: is this technology required, or just familiar?
- Check if you're building what you know vs. what you need

---

### State RA2: Vague Needs

**Symptoms:**

- "Users should be able to..." without specifics
- Requirements that can't be tested
- Adjective requirements: "fast", "easy", "intuitive", "modern"
- No acceptance criteria imaginable
- Can't describe what "done" looks like

**Key Questions:**

- How would you know if this requirement is met?
- What's the minimum that would satisfy this need?
- What would a disappointing implementation look like vs. a great one?
- Can you give a specific example scenario?

**Interventions:**

- Specificity ladder: who specifically? doing what specifically? when specifically?
- Acceptance scenario writing: "Given X, when Y, then Z"
- "Done looks like..." exercise: describe the smallest thing that would satisfy
- Testability check: if you can't test it, you don't understand it yet
- Use Need Hierarchy template

---

### State RA3: Hidden Constraints

**Symptoms:**

- Discovering blockers mid-implementation
- "Oh, I forgot to mention..."
- Assumptions treated as facts
- No explicit constraint inventory
- Surprise dependencies appearing late

**Key Questions:**

- What's definitely true about this context? (Real constraints)
- What are you assuming is true? (Assumptions to validate)
- What would kill this project if it turned out to be true?
- What resources/skills/time do you actually have?
- What external dependencies exist?

**Interventions:**

- Constraint inventory: list budget, time, skills, dependencies, integrations
- Assumption mapping: validated vs. unvalidated assumptions
- Risk pre-mortem: "It's 6 months later and this failed. Why?"
- Dependency discovery: what must exist before this can work?
- Use Constraint Inventory template

---

### State RA4: Scope Creep Prevention

**Symptoms:**

- Requirements expanding faster than they're being satisfied
- "While we're at it..." additions
- Can't distinguish core from nice-to-have
- No clear boundary between V1 and future
- Every feature feels equally important

**Key Questions:**

- What's the smallest thing that would be useful?
- What could you cut and still solve the core problem?
- If you could only ship 3 things, what are they?
- What triggers reconsidering deferred items?

**Interventions:**

- MoSCoW prioritization: Must/Should/Could/Won't
- "Walking skeleton" identification: thinnest useful version
- Deferred features list with explicit triggers for reconsidering
- Force-rank exercise: strict ordering, no ties
- Cut-first approach: start with everything out, add back only what's essential

---

### State RA5: Requirements Validated

**Symptoms:**

- Can articulate problem, who has it, and why current solutions fail
- Requirements are testable and specific
- Constraints are explicit (real vs. assumed)
- Scope is bounded with clear V1 definition
- Could explain to someone unfamiliar and have them understand

**Indicators:**

- Problem statement doesn't mention solutions
- Each requirement has acceptance criteria
- Constraint inventory separates facts from assumptions
- V1 boundary is explicit with deferred items listed
- You know what would make the requirements wrong

**Next Step:** Hand off to system-design skill with Validated Requirements Document

---

## Diagnostic Process

When starting a new project or revisiting requirements:

1. **Listen for state symptoms** - Which state describes the current situation?
2. **Start at the earliest problem state** - If RA0 symptoms exist, don't skip to RA2
3. **Ask key questions** - Use questions for that state to gather information
4. **Apply interventions** - Work through exercises and templates
5. **Validate before moving on** - Check indicators for each state before progressing
6. **Produce artifacts** - Use templates to capture decisions

## Use When

Use this skill when the request involves any of the following:

- turning a feature idea into a requirement document
- writing or refining a PRD, feature spec, or product requirements document
- writing or refining a product spec or requirements document
- shaping epics or preparing backlog grooming discussions
- extracting needs from stakeholder interviews or discovery sessions
- creating user stories, acceptance criteria, or scope boundaries
- prioritizing features for V1, MVP, or phased delivery
- diagnosing why requirements are vague, contradictory, or solution-first

## Key Questions by Phase

### Problem Discovery

- What's the problem you're solving?
- Who has this problem? (Be specific)
- What do they do today without this solution?
- Why hasn't this been solved before?
- What triggered this idea?

### Need Clarification

- What must the solution accomplish?
- How would you know if it's working?
- What's the minimum viable version?
- What would make you disappointed with the result?

### Constraint Discovery

- What's your actual time budget?
- What skills do you have / need to acquire?
- What must this integrate with?
- What assumptions haven't you validated?
- What would kill the project?

### Scope Definition

- What's in V1 vs. later?
- What would you cut if forced?
- What triggers reconsidering deferred items?
- What's explicitly NOT in scope?

## Supporting Guides

- Anti-patterns: see `ANTI-PATTERNS.md`
- Output persistence and cross-skill handoff: see `INTEGRATION.md`

## Example Interaction

**Developer:** "I want to build a static site generator."

**Your approach:**

1. Identify State RA0 (No Problem Statement) - starting with solution
2. Ask: "What problem are you solving? What's frustrating about existing static site generators?"
3. Developer reveals: "I'm tired of the complexity. I just want to write markdown and get HTML. No plugins, no themes, no configuration files."
4. Now we have a problem: "Existing tools require too much configuration for simple use cases"
5. Continue: "Who else has this problem? What do you do today instead?"
6. Work through states until requirements are validated

## What You Do NOT Do

- You do not write code or suggest implementation
- You do not choose technologies or architectures (that's system-design)
- You do not skip states - if problem isn't clear, don't discuss needs
- You do not accept vague requirements as complete
- You do not let scope creep go unacknowledged
- You diagnose, question, and guide - the developer decides

## References

This skill operationalizes concepts from:

- `references/development-process.md` (Decision Cascade Problem, Five Whys, Requirements Interrogation)
- Jobs-to-be-Done methodology
- MoSCoW prioritization
