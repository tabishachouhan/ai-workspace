# AI Workspace

Turn a pile of project documents (PDFs, notes, spreadsheets, links) into something you can talk to. Upload your files, ask questions in plain English, and get answers grounded in *your* documents — with the source cited, not generic AI knowledge.

## Status

✅ **Working end-to-end**: auth, project management, document upload, and a full RAG pipeline (parse → chunk → embed → retrieve → generate). Frontend UI is not built yet — this is currently a tested, functioning backend API.

## What it does

- **Auth**: email/password + Google OAuth, JWT access/refresh tokens with rotation and reuse detection
- **Projects**: create, organize, archive, and start from templates
- **Documents**: upload PDFs, stored in Supabase Storage, automatically parsed and chunked
- **Chat with your documents**: ask a question, get an answer generated *only* from your uploaded documents' actual content, with citations back to the source chunks — powered by local embeddings + pgvector similarity search + Gemini

## Stack

- **Frontend:** React 19, Vite, Tailwind, ShadCN UI, TanStack Query *(scaffolded, not yet built out)*
- **Backend:** Node.js, Express, Prisma, PostgreSQL (Supabase) + pgvector
- **AI:** Google Gemini (free tier) for generation, local `all-MiniLM-L6-v2` embeddings via `@xenova/transformers` (no paid embedding API), pgvector for retrieval

Runs entirely on free tiers — see [cost breakdown](./docs/architecture.md#9-cost-check--confirming-0-spend).

## API Overview

| Endpoint | Description |
|---|---|
| `POST /api/auth/register` | Email/password registration |
| `POST /api/auth/login` | Email/password login |
| `GET /api/auth/google` → `/google/callback` | Google OAuth flow |
| `POST /api/auth/refresh` | Rotate refresh token, issue new pair |
| `GET /api/auth/me` | Current user (protected) |
| `POST/GET/PATCH/DELETE /api/projects` | Project CRUD (ownership-enforced) |
| `POST /api/projects/:id/archive` \| `/unarchive` | Archive state transitions |
| `GET /api/projects/templates` | List available project templates |
| `POST /api/projects/:projectId/documents` | Upload a document (multipart) |
| `GET /api/documents/:id` | Get a document |
| `POST /api/projects/:projectId/chat` | Ask a question, get a RAG-grounded answer |

## Getting Started

```bash
npm install
cp apps/api/.env.example apps/api/.env   # fill in Supabase, Google OAuth, and Gemini keys
npm run prisma:migrate --workspace=apps/api
npm run dev:api    # http://localhost:5000
npm run dev:web    # http://localhost:5173 (scaffold only)
```

## Project Structure

```
apps/
  web/   # React frontend (scaffolded)
  api/   # Express backend
    src/modules/
      auth/        # register, login, OAuth, refresh rotation
      projects/     # CRUD, archive, templates
      documents/   # upload, parsing, chunking, embeddings
      chat/        # RAG retrieval + generation
```

See [`docs/architecture.md`](./docs/architecture.md) for schema design, the RAG pipeline, and architectural decisions. See [`docs/security-notes.md`](./docs/security-notes.md) for documented, accepted dependency risks and the reasoning behind each.