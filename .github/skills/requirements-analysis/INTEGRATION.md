# Integration and Output Persistence

## Output Persistence

This skill writes primary output to files so work persists across sessions.

### Output Discovery

Before doing any other work:

1. Check for `context/output-config.md` in the project.
2. If found, look for this skill's entry.
3. If not found or no entry for this skill, ask the user first where to save requirements analysis output.
4. Suggest `docs/requirements/` or project root for simple projects.
5. Store the user's preference.

### Primary Output

Persist these artifacts:

- Problem Statement Brief
- Need Hierarchy
- Constraint Inventory with Assumption Map
- Scope Definition with V1 boundary and deferred items
- User stories and acceptance criteria when requested
- Validated Requirements Document for handoff to design or implementation

### Conversation vs. File

| Goes to File                         | Stays in Conversation         |
| ------------------------------------ | ----------------------------- |
| Problem statement                    | Five Whys exploration         |
| Need hierarchy                       | Prioritization discussion     |
| Constraint inventory                 | Assumption discovery dialogue |
| Scope definition                     | Cut/keep negotiations         |
| User stories and acceptance criteria | Clarifying questions          |
| Validated requirements               | Tradeoff discussion           |

### File Naming

Pattern: `requirements-{project-name}.md` or multiple files in `docs/requirements/`

Example: `requirements-static-site-generator.md`

## Integration with system-design

| requirements-analysis Output    | system-design Input          |
| ------------------------------- | ---------------------------- |
| Validated Requirements Document | Design Context Brief         |
| Constraint Inventory            | Architecture constraints     |
| Need Hierarchy                  | Quality attribute priorities |
| Prioritized user stories        | Capability scope             |

Handoff is ready when:

- Problem is articulated without solution
- Needs are testable and specific
- Constraints are inventoried as real versus assumed
- Scope is bounded with explicit V1 definition

## Integration with Other Skills

| From Skill            | When                                     | Integration                                        |
| --------------------- | ---------------------------------------- | -------------------------------------------------- |
| brainstorming         | Multiple solutions seem possible         | Explore options before committing to one           |
| research              | Domain knowledge gaps block requirements | Fill knowledge gaps before finalizing requirements |
| software-architecture | Requirements are validated               | Translate validated needs into design decisions    |
