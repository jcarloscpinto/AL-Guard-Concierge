# Troubleshooting

## Need to discard local changes

1. Run `git branch --show-current`.
2. Run `git status --short`.
3. If anything might be needed, create a stash or backup branch first.
4. Only then use `git reset --hard`.

## Need to overwrite a remote branch after rebase

1. Confirm the branch is not `main`.
2. Run `git fetch origin`.
3. Inspect divergence with `git log --oneline --left-right origin/<branch>...HEAD`.
4. Only then use `git push --force-with-lease`.

## Committed to the wrong branch

1. Create the correct branch at the current `HEAD`.
2. Move to the original branch and reset it only if the bad commit has not been pushed.
3. If it was already pushed or reviewed, stop and coordinate the repair instead of rewriting shared history.
