# Local Auth Login

If you are running Plasmic locally in Docker, do **not** rely on the email verification flow for your first login.

Use one of the seeded dev accounts instead:

- `admin@admin.example.com`
- `user@example.com`
- `user2@example.com`

Password for all three accounts:

- `!53kr3tz!`

Why this works:

- `docker-compose.yml` starts the local WAB app and Postgres.
- The seed step creates those users.
- The seed step also marks them as verified, so you can log in immediately.

What to avoid:

- Signing up a brand-new account locally unless you have SMTP configured.
- Waiting for the verification email if you have not configured mail delivery.

Login URL:

- `http://localhost:3003/login`
