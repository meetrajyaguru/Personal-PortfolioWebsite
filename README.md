# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Contact form backend

The contact form saves submissions to MongoDB and sends an email notification through Gmail SMTP.

1. Keep your existing `backend/.env` and add the SMTP settings shown in `backend/.env.example` (or copy the example for a fresh setup). Preserve your existing `MONGO_URI`.
2. Set `SMTP_USER` to the Gmail account that will send notifications, and `CONTACT_TO` to the inbox that should receive them.
3. Create a Google App Password for `SMTP_APP_PASSWORD` (Google requires 2-Step Verification). Do not use your regular Gmail password or commit `backend/.env`.
4. For local development, the frontend defaults to `http://localhost:5000`. Set `VITE_API_URL` in the frontend environment (see `.env.example`) to the backend origin when deploying the frontend separately.
5. In MongoDB Atlas, make sure the database user in `MONGO_URI` is active and the backend host is allowed under Network Access. If Node.js reports an SRV DNS lookup error, set `MONGO_DNS_SERVERS` in `backend/.env` to a working DNS resolver address (comma-separated for multiple resolvers); leave it unset otherwise.
6. Run `npm run dev` from the project root to start both the frontend and backend. The backend requires a reachable MongoDB instance and will report an error instead of silently switching to a local database.

If SMTP is not configured or Gmail rejects a message, the submission is still saved in MongoDB; the form reports that the email notification was not sent.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
