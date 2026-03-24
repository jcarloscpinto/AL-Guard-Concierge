---
name: software-architecture
description: "Applies SOLID principles, clean architecture boundaries, DDD-inspired module design, and pragmatic library selection for monoliths, modular monoliths, APIs, and event-driven systems. Use when users ask about system design, architectural tradeoffs, code structure improvements, refactoring strategy, or design pattern recommendations."
---

# Software Architecture Development Skill

## Architecture Workflow

Follow this sequence when making architecture decisions:

1. Identify the domain boundary.
   - Name the core business capability.
   - Separate domain rules from transport, persistence, and framework concerns.
2. Clarify the change surface.
   - Determine whether the request affects UI, application orchestration, domain logic, infrastructure, or external integrations.
   - Avoid mixing responsibilities in the same module.
3. Evaluate existing libraries and platform capabilities.
   - Prefer proven libraries for generic concerns such as validation, retries, schema parsing, auth, date handling, and HTTP clients.
   - Reject libraries that create ownership or integration cost without clear benefit.
4. Design interfaces before implementations.
   - Define the contract for repositories, gateways, services, or handlers.
   - Keep the domain dependent on abstractions, not infrastructure details.
5. Choose the simplest viable architecture shape.
   - Monolith for cohesive local workflows.
   - Modular monolith for clear internal boundaries without operational fragmentation.
   - Microservices only when deployment, scaling, ownership, or isolation requirements justify them.
   - Event-driven flows when decoupling, auditability, or asynchronous processing is required.
6. Validate against architecture principles.
   - Check for single responsibility, dependency direction, naming clarity, and testability.
   - Ensure business logic remains framework-agnostic where practical.
7. Produce a concrete implementation or refactoring path.
   - Specify files, modules, interfaces, and migration steps.

## Core Rules

### Module and Boundary Rules

- Keep business rules out of UI components, route handlers, and controllers.
- Keep persistence and network concerns behind explicit interfaces or adapters.
- Group code by domain capability, not by vague technical buckets.
- Prefer explicit dependency flow: UI or handlers -> application services -> domain -> infrastructure adapters.
- Keep framework-specific code at the edges.

Example: move persistence out of the domain layer.

Bad:

```ts
export const createChallenge = async (input: CreateChallengeInput) => {
  const saved = await db.challenge.create({ data: input });
  return { id: saved.id, title: saved.title };
};
```

Good:

```ts
export const createChallenge = async (
  input: CreateChallengeInput,
  challengeRepository: ChallengeRepository,
) => {
  const challenge = Challenge.create(input);
  return challengeRepository.save(challenge);
};
```

### Naming Rules

- Avoid generic module names such as `utils`, `helpers`, `common`, `shared`, or `misc`.
- Use names that reveal domain purpose, such as `InvoiceTotalCalculator`, `WorkoutProgressTracker`, `ChallengeEnrollmentService`.
- Name modules after the capability they own, not the data structure they happen to touch.
- If a name cannot explain why the code exists, rename it before expanding the module.

Example: replace a generic utility dump with domain modules.

Bad:

```text
utils/
   format.ts
   calculations.ts
   validators.ts
```

Better:

```text
workouts/
   calculate-weekly-progress.ts
   normalize-workout-entry.ts
challenges/
   validate-challenge-enrollment.ts
```

### Code Structure Rules

- Prefer early returns over nested branching.
- Keep functions small enough to explain in one sentence.
- Split files when they start combining multiple responsibilities.
- Extract orchestration from components and controllers into application services or use-case functions.
- Make invalid states explicit with validation at boundaries.

### Error Handling Rules

- Fail fast at boundaries when inputs are invalid.
- Return structured errors or domain-specific failures instead of leaking low-level exceptions.
- Catch infrastructure exceptions near the adapter boundary and map them to application-level meaning.
- Do not swallow errors without logging or transforming them intentionally.

## Companion References

- Use [CHECKLISTS.md](./CHECKLISTS.md) for the library-vs-custom evaluation path and architecture review checklist.
- Use [PATTERNS.md](./PATTERNS.md) for example code showing early returns, boundary-level error handling, and naming patterns.

## Response Template

When applying this skill, structure the answer around:

1. Current architecture or problem summary
2. Risks or architectural issues observed
3. Recommended architecture or refactoring direction
4. Library vs custom-code decision
5. Concrete implementation steps or example structure
