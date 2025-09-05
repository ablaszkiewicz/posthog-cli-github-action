npm run build
posthog-cli --host http://localhost:8010 sourcemap inject --directory ./dist
posthog-cli --host http://localhost:8010 sourcemap upload --directory ./dist
npm run start