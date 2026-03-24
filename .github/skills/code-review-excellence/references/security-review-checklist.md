# Security Review Checklist

Use this file when the change crosses trust boundaries, handles credentials, or exposes user-controlled input.

## Authentication and Authorization

- Is authentication required where it should be?
- Are authorization checks enforced before each protected action?
- Are tokens, sessions, and expiry checks validated correctly?
- Are privileged actions protected from indirect access paths?

## Input Validation

- Is every user-controlled input validated on the server?
- Are DB queries parameterized?
- Is output escaped or encoded in the right rendering context?
- Are uploads restricted by type, size, and storage path?

## Data Protection

- Are secrets absent from code, logs, and client responses?
- Are passwords or tokens handled with approved primitives?
- Is sensitive data encrypted or otherwise protected at rest and in transit?
- Do error messages avoid leaking internals or identifiers?

## Common Vulnerabilities

- Dynamic execution (`eval`, shell interpolation, unsafe deserialization)
- CSRF gaps on state-changing endpoints
- Missing rate limiting on public abuse surfaces
- Excessive data exposure in APIs or logs
- Insecure defaults in third-party integrations

## Escalation Rule

If you find a credible exploit path or data exposure risk, mark it `[blocking]` and explain the impact, trigger condition, and recommended remediation.
