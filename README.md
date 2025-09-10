# PostHog Upload Sourcemaps Action

Inject and upload JavaScript sourcemaps to PostHog using the PostHog CLI.

## Inputs

- **directory** (required): Directory with built assets (e.g., `dist`).
- **env-id** (required): PostHog environment ID.
- **cli-token** (required): PostHog CLI token.
- **project** (optional): Project identifier. Defaults: derived from Git repository; if not accessible, value from this input is used; if neither available, empty.
- **version** (optional): Release/version (e.g., commit SHA). Defaults: derived from Git commit; if not accessible, value from this input is used; if neither available, empty.

## Behavior of project/version

- The action attempts to detect Git context. If Git is available:
  - The PostHog CLI will infer `project` and `version` automatically.
- If Git is not available (e.g., running outside of a checkout):
  - If `project` is provided, it will be passed via `--project`.
  - If `version` is provided, it will be passed via `--version`.
  - If not provided, both are omitted.

## Example usage

```yaml
name: Build and Upload Sourcemaps

on:
  push:
    branches: [main]

jobs:
  build_and_upload:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - name: Inject & upload sourcemaps to PostHog
        uses: ./
        with:
          directory: dist
          env-id: ${{ secrets.POSTHOG_ENV_ID }}
          cli-token: ${{ secrets.POSTHOG_CLI_TOKEN }}
          # host: https://eu.posthog.com
          # project: my-project
          # version: ${{ github.sha }}
```

## Notes

- This is a composite action that installs `@posthog/cli` and shells out to `posthog-cli sourcemap` commands.
- Ensure `POSTHOG_ENV_ID` and `POSTHOG_CLI_TOKEN` are created and stored as repository secrets.
