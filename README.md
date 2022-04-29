# Bloglist

This is a simple create-read-update-delete application.

Project is split into two packages:

- Client `packages/client`
- Server `packages/server`

The main package is Server, which serves production version of Client.

## Getting Started

First, install all packages from project root `/`:

```bash
npm install
```

Second, navigate to `packages/server` and create `.env` file. Example can be viewed in `packages/server/.env.example`.

Third, run the server from project root `/`:

```bash
npm run dev
```
