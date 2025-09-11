# PostHog Upload Sourcemaps Action

Inject and upload JavaScript sourcemaps to PostHog using the PostHog CLI.

**Important:** This action does not build your project. You are responsible for compiling your app and generating source maps (for example, by running `npm run build`). This action only:

- Injects source map references into your built files
- Uploads the source maps to PostHog

See the PostHog documentation for end-to-end guidance: [Upload source maps](https://posthog.com/docs/error-tracking/upload-source-maps).

## Inputs

| **Name**    | **Required** | **Description**                                                                                                                                          |
| ----------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `directory` | Yes          | Directory with built assets (e.g., `dist`)                                                                                                               |
| `env-id`    | Yes          | PostHog environment ID. See [environment settings](https://app.posthog.com/settings/environment#variables)                                               |
| `cli-token` | Yes          | PostHog CLI token. See [api key settings](https://app.posthog.com/settings/environment#variables)                                                        |
| `project`   | No           | Project identifier. Defaults: derived from Git repository; if not accessible, the value from this input is used; if neither available, empty             |
| `version`   | No           | Release/version (e.g., commit SHA). Defaults: derived from Git commit; if not accessible, the value from this input is used; if neither available, empty |

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
      # here you build you app
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build

      # here you invoke this action
      - name: Inject & upload sourcemaps to PostHog
        uses: ablaszkiewicz/posthog-upload-sourcemaps@v0.2
        with:
          directory: dist
          env-id: ${{ secrets.POSTHOG_ENV_ID }}
          cli-token: ${{ secrets.POSTHOG_CLI_TOKEN }}
```
