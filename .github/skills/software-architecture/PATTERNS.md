# Architecture Patterns

## Early Return

Bad:

```ts
const enrollUser = async (userId: string, challengeId: string) => {
  const user = await userRepository.findById(userId);

  if (user) {
    const challenge = await challengeRepository.findById(challengeId);

    if (challenge) {
      if (!challenge.isClosed) {
        return enrollmentService.enroll(user, challenge);
      }

      throw new ChallengeClosedError(challengeId);
    }

    throw new ChallengeNotFoundError(challengeId);
  }

  throw new UserNotFoundError(userId);
};
```

Good:

```ts
const enrollUser = async (userId: string, challengeId: string) => {
  const user = await userRepository.findById(userId);
  if (!user) throw new UserNotFoundError(userId);

  const challenge = await challengeRepository.findById(challengeId);
  if (!challenge) throw new ChallengeNotFoundError(challengeId);
  if (challenge.isClosed) throw new ChallengeClosedError(challengeId);

  return enrollmentService.enroll(user, challenge);
};
```

## Error Handling at the Right Boundary

Bad:

```ts
const getWorkoutPlan = async (userId: string) => {
  try {
    return await apiClient.get(`/plans/${userId}`);
  } catch {
    return null;
  }
};
```

Good:

```ts
const getWorkoutPlan = async (userId: string) => {
  try {
    return await apiClient.get(`/plans/${userId}`);
  } catch (error) {
    throw new WorkoutPlanGatewayError({
      userId,
      cause: error,
      message: "Failed to fetch workout plan from external service",
    });
  }
};
```

## Naming Patterns

Bad:

```ts
export const helper = (data: unknown) => {
  // unclear purpose
};

export const processStuff = (value: WorkoutEntry) => {
  // ambiguous behavior
};
```

Good:

```ts
export const normalizeWorkoutEntry = (entry: WorkoutEntryInput) => {
  // transforms external input into a domain-friendly shape
};

export const calculateWeeklyProgressScore = (entries: WorkoutEntry[]) => {
  // computes a domain metric used by progress views
};
```
