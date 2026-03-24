# User Story Template

Use this template when defining a story before estimation or sprint commitment.

```markdown
## User Story: [Title]

**As a** [user type]
**I want** [goal or capability]
**So that** [business value or outcome]

### Acceptance Criteria

- [ ] Given [context] When [action] Then [expected result]
- [ ] Given [context] When [action] Then [expected result]
- [ ] Given [context] When [action] Then [expected result]

### Ready Checklist

- [ ] Story satisfies INVEST
- [ ] Acceptance criteria are testable
- [ ] Dependencies are identified
- [ ] Scope fits within one sprint
- [ ] Open questions are captured

### Technical Notes

- API / integration:
- Data / persistence:
- UI / UX considerations:

### Estimation

- Story Points:
- T-Shirt Size:

### Dependencies

-

### Priority

- MoSCoW:
- Business Value:
```

## Complete worked example

```markdown
## User Story: User Registration

**As a** new visitor
**I want** to create an account
**So that** I can access personalized features

### Acceptance Criteria

- [ ] Given a valid email and password When the user submits the form Then the account is created
- [ ] Given an email already in use When the user submits the form Then a duplicate email error is shown
- [ ] Given a weak password When the user submits the form Then a password validation error is shown
- [ ] Given successful registration When the account is created Then a welcome email is sent

### Ready Checklist

- [ ] Story satisfies INVEST
- [ ] Acceptance criteria are testable
- [ ] Dependencies are identified
- [ ] Scope fits within one sprint
- [ ] Open questions are captured

### Technical Notes

- API / integration: POST /api/users, SendGrid
- Data / persistence: PostgreSQL users table, bcrypt password hashing
- UI / UX considerations: inline validation, password strength guidance

### Estimation

- Story Points: 5
- T-Shirt Size: M

### Dependencies

- Email service integration

### Priority

- MoSCoW: Must Have
- Business Value: High
```

This example is complete enough to estimate, test, and take through sprint planning without adding extra concept explanation.
