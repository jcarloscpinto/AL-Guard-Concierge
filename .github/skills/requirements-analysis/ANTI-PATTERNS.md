# Anti-Patterns

## The Solution Specification

**Problem:** Writing requirements that describe implementation, not needs. "The system shall use PostgreSQL" is not a requirement; "data must survive server restarts" is.

**Fix:** For each requirement, ask "could this be satisfied a different way?" If yes, you may have captured implementation, not need.

## The Stakeholder Fiction

**Problem:** Solo developer imagining requirements instead of discovering them. "Users will want..." without evidence.

**Fix:** If you're the user, be honest about YOUR needs. If building for others, talk to them or use analogous evidence. Don't invent users.

## The Infinite Backlog

**Problem:** Requirements that grow without prioritization. Everything is equally important.

**Fix:** Force-rank. If you could only ship ONE thing, what is it? Then two? This reveals actual priorities.

## The Premature Precision

**Problem:** Specifying details that don't matter yet. Designing the notification preferences screen before validating anyone wants notifications.

**Fix:** Identify which requirements need precision now vs. which can be deferred. Stub uncertain areas with "TBD after X validated."

## The Constraint Blindness

**Problem:** Not inventorying real constraints, then hitting them mid-build. "Oh, I only have 10 hours a week for this."

**Fix:** Explicit constraint inventory BEFORE requirements. What's definitely true about your context?

## The Feature Transplant

**Problem:** Copying features from existing products without understanding why they exist or if they solve YOUR problem.

**Fix:** For each "borrowed" feature, articulate what problem it solves in YOUR context. If you can't, cut it.
