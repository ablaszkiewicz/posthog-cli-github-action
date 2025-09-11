# PostHog Upload Sourcemaps Action

Inject and upload JavaScript sourcemaps to PostHog using the PostHog CLI.

**Important:** This action does not build your project. You are responsible for compiling your app and generating source maps (for example, by running `npm run build`). This action only:

- Injects source map references into your built files
- Uploads the source maps to PostHog

See the PostHog documentation for end-to-end guidance: [Upload source maps](https://posthog.com/docs/error-tracking/upload-source-maps).

## Inputs

| **Name**    | **Required** | **Description**                                                                                                                                           |
| ----------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `directory` | Yes          | Directory with built assets (e.g., `dist`).                                                                                                               |
| `env-id`    | Yes          | PostHog environment ID.                                                                                                                                   |
| `cli-token` | Yes          | PostHog CLI token.                                                                                                                                        |
| `host`      | No           | Optional PostHog host (e.g., `https://eu.posthog.com`).                                                                                                   |
| `project`   | No           | Project identifier. Defaults: derived from Git repository; if not accessible, the value from this input is used; if neither available, empty.             |
| `version`   | No           | Release/version (e.g., commit SHA). Defaults: derived from Git commit; if not accessible, the value from this input is used; if neither available, empty. |

## Behavior of project/version

The action defers to the PostHog CLI to infer sensible defaults and only passes flags when needed.

- **When Git context is available**: The CLI infers `project` and `version` automatically.
- **When Git is not available** (for example, outside a checkout):
  - `--project` is passed only if the `project` input is provided.
  - `--version` is passed only if the `version` input is provided.
  - If either input is empty, that flag is omitted entirely.

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
        uses: ablaszkiewicz/posthog-upload-sourcemaps@v0.2
        with:
          directory: dist
          env-id: "posthog.com/project/<this-is-your-project-id>"
          cli-token: "see https://posthog.com/docs/api section 'Private endpoint authentication'"
          # project: my-project
          # version: some-version
```

## Notes

- This is a composite action that installs `@posthog/cli` and shells out to `posthog-cli sourcemap` commands.
- Ensure `POSTHOG_ENV_ID` and `POSTHOG_CLI_TOKEN` are created and stored as repository secrets.
