# AI Workspace

Turn a pile of project documents (PDFs, notes, spreadsheets, links) into something you can talk to. Upload your files, ask questions in plain English, and get answers grounded in *your* documents — with the source cited, not generic AI knowledge.

## Status

🚧 Phase 0 complete — repo scaffolding + data model. See [`docs/architecture.md`](./docs/architecture.md) for the full build plan.

## Stack

- **Frontend:** React 19, Vite, Tailwind, ShadCN UI, TanStack Query
- **Backend:** Node.js, Express, Prisma, PostgreSQL (Supabase) + pgvector
- **AI:** Google Gemini (free tier) for generation, local `all-MiniLM-L6-v2` embeddings (no paid API), pgvector for retrieval

Runs entirely on free tiers — no paid API keys required anywhere in this stack.

## Getting Started

```bash
npm install
cp apps/api/.env.example apps/api/.env   # fill in your Supabase + Gemini keys
npm run prisma:migrate --workspace=apps/api
npm run dev:api    # http://localhost:5000
npm run dev:web    # http://localhost:5173
```

## Project Structure

```
apps/
  web/   # React frontend, organized by feature
  api/   # Express backend, organized by module (auth, projects, documents, chat)
```

See [`docs/architecture.md`](./docs/architecture.md) for schema design, the RAG pipeline, and architectural decisions. See [`docs/security-notes.md`](./docs/security-notes.md) for a documented, accepted dependency risk and the reasoning behind it.