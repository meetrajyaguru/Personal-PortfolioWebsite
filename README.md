# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Contact form

The deployed contact form submits to Netlify Forms. Submissions are stored in the site's Netlify dashboard under Forms > contact after deployment, with no separate API server or MongoDB connection required. The static definition in `public/__forms.html` must match the fields submitted by the React form. Form detection is enabled by the deployment feature marker.

The form keeps its existing appearance and feedback. Email notifications can be configured through the site's Netlify Forms notification settings; submission success confirms acceptance by Netlify, not email delivery. The legacy `backend/` server is not used by the deployed form.

Chatbase uses the existing public widget embed. Anonymous visitors do not need a signed identity token; user identification should only be added alongside authenticated user accounts.

Netlify processes submissions on deployed sites. A plain Vite development server does not emulate Netlify Forms.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
