# Sprint Planning Template

Use this template to turn refined stories into a sprint commitment.

```markdown
## Sprint [Number] Planning

**Sprint Goal**: [single outcome statement]
**Duration**: [length]
**Team Capacity**: [hours or availability]
**Estimated Velocity**: [story points]

### Candidate Stories

1. [Story name] ([points]) - [priority]
2. [Story name] ([points]) - [priority]
3. [Story name] ([points]) - [priority]

### Commitment Checks

- [ ] Each story supports the sprint goal
- [ ] Total scope fits capacity and recent velocity
- [ ] Dependencies and blockers are resolved or accepted
- [ ] Each story has testable acceptance criteria
- [ ] Owners are clear

### Sprint Backlog

- [ ] [Story / ticket]
- [ ] [Story / ticket]
- [ ] [Story / ticket]

### Definition of Done

- [ ] Code written and reviewed
- [ ] Automated tests passing
- [ ] Documentation updated
- [ ] QA / product validation completed
```

## Worked example: Epic -> stories -> tasks

```markdown
## Epic: User Authentication

### Story 1: User Registration

**As a** new visitor
**I want** to create an account
**So that** I can access personalized features

**Acceptance Criteria summary**:

- Given valid registration data When the form is submitted Then the account is created
- Given a duplicate email When the form is submitted Then the user sees a duplicate email error
- Given a weak password When the form is submitted Then the user sees password guidance

**Tasks**:

- [ ] Design registration form states and validation copy
- [ ] Build registration form UI
- [ ] Create `POST /api/users` endpoint
- [ ] Hash password and persist user record
- [ ] Add duplicate email validation
- [ ] Add unit tests for validation rules
- [ ] Add integration test for successful registration

### Story 2: User Login

**As a** registered user
**I want** to sign in
**So that** I can access my account

**Acceptance Criteria summary**:

- Given valid credentials When the login form is submitted Then the user is authenticated
- Given invalid credentials When the login form is submitted Then an error message is shown

**Tasks**:

- [ ] Build login form UI
- [ ] Create `POST /api/auth/login` endpoint
- [ ] Implement password verification
- [ ] Issue session or JWT token
- [ ] Add login failure tracking
- [ ] Write unit and integration tests

### Story 3: Password Reset

**As a** registered user
**I want** to reset my password
**So that** I can regain access if I forget it

**Acceptance Criteria summary**:

- Given a known email When a reset is requested Then a reset link is sent
- Given an expired token When the reset form is submitted Then the token is rejected

**Tasks**:

- [ ] Build forgot-password request form
- [ ] Generate and store reset token
- [ ] Send reset email
- [ ] Build reset password form
- [ ] Validate token expiration on submit
- [ ] Add end-to-end reset flow test
```

## Sprint planning example

```markdown
## Sprint 10 Planning

**Sprint Goal**: Complete the core user authentication flow
**Duration**: 2 weeks
**Team Capacity**: 160 hours
**Estimated Velocity**: 30 story points

### Candidate Stories

1. User Registration (5) - Must Have
2. User Login (3) - Must Have
3. Password Reset (5) - Must Have
4. Email Verification (3) - Should Have
5. Profile Edit (5) - Should Have
6. JWT Refresh Token (3) - Should Have
7. Rate Limiting (2) - Should Have
8. Security Audit (4) - Must Have

### Commitment Checks

- [ ] Each story supports the sprint goal
- [ ] Total scope fits capacity and recent velocity
- [ ] Dependencies and blockers are resolved or accepted
- [ ] Each story has testable acceptance criteria
- [ ] Owners are clear

### Sprint Backlog

- [ ] User Registration (#101)
- [ ] User Login (#102)
- [ ] Password Reset (#103)
- [ ] Email Verification (#104)
- [ ] Profile Edit (#105)
- [ ] JWT Refresh Token (#106)
- [ ] Rate Limiting (#107)
- [ ] Security Audit (#108)

### Definition of Done

- [ ] Code written and reviewed
- [ ] Unit and integration tests passing
- [ ] Documentation updated
- [ ] Deployed to staging
- [ ] QA approved
```
