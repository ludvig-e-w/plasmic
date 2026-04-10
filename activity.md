## 2026-04-10

- Restored the missing shared copilot tool-definition module used by the WAB editor so the frontend can resolve imports again in OSS/dev builds.
- Added local changelog tracking files required by the workspace instructions because they were missing from the repository root.
- Verified that the original `@/wab/shared/copilot/enterprise/copilot-tools` resolution failure no longer appears in `platform/wab` production build output; current build blockers are unrelated generated/model and stylesheet pipeline issues already present in this checkout.
- Switched the git `origin` remote to `git@github.com:ludvig-e-w/plasmic.git` and loaded `~/.ssh/id_ed25519` into the local SSH agent/keychain so pushes can authenticate without re-entering the passphrase.
- Added a short local-auth note documenting the seeded Docker login accounts and the fact that local signup still expects email verification unless SMTP is configured.
