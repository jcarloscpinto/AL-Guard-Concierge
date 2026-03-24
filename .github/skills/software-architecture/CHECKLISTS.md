# Architecture Checklists

## Library vs Custom Code Checklist

Use this decision path before adding custom code.

1. Is the problem generic?
   - Examples: validation, retries, schema parsing, logging, date math, HTTP transport.
   - If yes, evaluate libraries first.
2. Is there an existing team-standard library already in the repo?
   - If yes, prefer it unless it materially fails the requirement.
3. Does the candidate library meet the functional need?
   - Validate feature fit against the actual use case, not the marketing page.
4. Is the operational cost acceptable?
   - Check maintenance status, bundle or runtime impact, API stability, license, and security posture.
5. Does using the library preserve architectural boundaries?
   - Keep the library behind an adapter if it is likely to change or leak vendor concerns.
6. If custom code is still preferred, is the reason explicit?
   - Valid reasons: domain-specific rules, narrow scope, performance constraints, security control, or lack of viable library support.
7. Record the decision.
   - State why the library was chosen or rejected and where the abstraction boundary lives.

## Quick Validation Template

- Problem type: generic or domain-specific?
- Existing repo standard available?
- Top candidate libraries evaluated?
- Functional gaps found?
- Runtime or maintenance concerns?
- Adapter boundary defined?
- Justification for custom code documented?

## Architecture Review Checklist

- Are responsibilities separated between UI, application, domain, and infrastructure?
- Are dependencies pointing inward toward stable abstractions?
- Are names domain-specific and intention-revealing?
- Is business logic independent from framework and transport details?
- Are integrations isolated behind adapters or gateways?
- Are error paths explicit and handled near the correct boundary?
- Has existing library support been evaluated before custom code was added?
- Is the architecture shape justified by actual operational needs?
