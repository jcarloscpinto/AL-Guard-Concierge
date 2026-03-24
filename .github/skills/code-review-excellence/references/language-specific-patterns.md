# Language-Specific Review Patterns

Use this file when the review needs language-specific bug hunting rather than general review flow.

## Python

Watch for:

- Mutable default arguments
- Broad `except:` blocks
- Shared mutable class attributes
- Hidden state across requests or tasks
- Resource cleanup gaps in file, network, or DB access

```python
# Avoid shared defaults
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

## TypeScript and JavaScript

Watch for:

- `any` or overly broad types in critical paths
- Unhandled async failures
- Silent `undefined` behavior and optional chaining misuse
- Mutating props, inputs, or shared objects unexpectedly
- Missing server-side validation behind typed client code

```typescript
interface DataPayload {
  value: string;
}

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.json();
}
```

## Review Questions

- Does the code rely on language behavior that is easy to misuse?
- Are types or exceptions precise enough to support safe changes later?
- Is state mutated in a way that makes behavior surprising?
- Do tests cover the failure mode that this language commonly hides?
