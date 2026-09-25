# AI Workspace

<p align="center">
  <strong>Turn your documents into verified, cited briefings — never a guess.</strong>
</p>

<p align="center">
  An end-to-end, AI-powered document intelligence workspace built with React 19, Node.js, pgvector, and Google Gemini. Upload PDFs, ask questions in plain language, and receive executive answers grounded strictly in your source documents with verifiable page citations.
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-it-works-rag-pipeline">RAG Pipeline</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#api-reference">API Reference</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#creator">Creator</a>
</p>

---

## ⚡ Overview

AI Workspace addresses a fundamental inefficiency in knowledge work: *why do we re-read the same document multiple times just to find verified facts?*

Generic LLMs hallucinate or provide unverified summaries. AI Workspace implements a **strict, zero-hallucination Retrieval-Augmented Generation (RAG) architecture**. Every answer produced is derived exclusively from the documents uploaded into that project and is explicitly attributed with source chunk receipts and verified page anchors.

---

## ✨ Key Features

### 🎨 Editorial, High-Trust Interface
- **Linear & Perplexity Inspired Aesthetic:** Refined typography with *Instrument Serif* display headings, *Work Sans* body, and *IBM Plex Mono* metadata badges.
- **Physics-Damped 3D Interactive Hero:** The landing page features a real-time mouse tracking 3D tilt card with spring dampening and citation proof highlights.
- **Living Ambient Aura & Glassmorphism:** Dashboard and workspace areas feature flowing aurora fluid gradients, subtle architectural dot grids, and interactive mouse-following spotlights that refract through frosted glass cards (`backdrop-filter: blur(16px)`).

### 📑 Document Intelligence & Research Desk
- **Frictionless PDF Ingestion:** Upload PDF files with automatic metadata extraction, status tracking (`Processing` → `Ready`), and Supabase Storage integration.
- **Interactive Prompt Starters:** One-click executive prompts (*"Executive Summary"*, *"Key Skills & Credentials"*, *"Extract Dates & Metrics"*) to immediately interrogate sources.
- **Verified Source Receipts:** Every generated answer is tagged with a shield badge confirming the exact number of source chunks used to verify the answer.
- **One-Click Dossier Export:** Export research findings instantly into **Markdown (`.md`)**, **Plain Text (`.txt`)**, **Microsoft Word (`.doc`)**, or print-ready **PDF**.

### 🛡️ Enterprise-Grade Auth & Security
- **Dual Authentication:** Email/password authentication and **Google OAuth 2.0**.
- **JWT Rotation & Reuse Detection:** Short-lived access tokens (15m) paired with rotating refresh tokens (7d) stored securely in the database with family invalidation upon reuse detection.
- **Isolated Project Workspaces:** Strict project-level scoping ensuring users can only query documents and projects they own.
- **Hardened HTTP Security:** Rate limiting, Helmet security headers, CORS origin whitelisting, and Zod input validation.

---

## 🧠 How It Works: RAG Pipeline

```
 ┌───────────────┐      ┌─────────────────────────┐      ┌──────────────────────────┐
 │ Upload Source │ ───> │ In-Process Chunking     │ ───> │ Local Embeddings Engine  │
 │ (PDF via UI)  │      │ (pdf-parse + windowing) │      │ (all-MiniLM-L6-v2 ONNX)  │
 └───────────────┘      └─────────────────────────┘      └──────────────────────────┘
                                                                       │
                                                                       ▼
 ┌───────────────┐      ┌─────────────────────────┐      ┌──────────────────────────┐
 │ Grounded      │ <─── │ Google Gemini           │ <─── │ pgvector Cosine Search   │
 │ Dossier + Ref │      │ (Strict Grounding Prompt│      │ (Top-k context match)    │
 └───────────────┘      └─────────────────────────┘      └──────────────────────────┘
```

1. **Document Ingestion & Parsing:** Uploaded PDFs are parsed via `pdf-parse`, extracting clean text streams with page-level metadata.
2. **Recursive Semantic Chunking:** Documents are segmented into overlapping sliding-window chunks (preserving sentence structure and semantic boundaries).
3. **Local In-Process Embedding ($0 Cost):** Chunks are converted into 384-dimensional dense vector embeddings using `@xenova/transformers` (`all-MiniLM-L6-v2`) running directly in Node.js via ONNX runtime — **no third-party embedding API costs or network latency**.
4. **Vector Storage & Cosine Search:** Embeddings are indexed in PostgreSQL using the `pgvector` extension. When a query is asked, it is embedded and matched using cosine distance (`<=>`).
5. **Context-Constrained Synthesis:** Gemini generates answers strictly restricted to the retrieved chunks. If the answer cannot be found in the provided sources, the system explicitly reports that no matching context exists.

---

## 🛠️ Tech Stack

### Frontend (`apps/web`)
| Layer | Technologies |
|---|---|
| **Framework** | [React 19](https://react.dev/), [Vite 5](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), Custom Design System (OKLCH color space) |
| **Motion & Physics** | [Framer Motion](https://www.framer.com/motion/) |
| **State & Cache** | [TanStack React Query v5](https://tanstack.com/query) |
| **Icons & Feedback** | [Lucide React](https://lucide.dev/), [React Hot Toast](https://react-hot-toast.com/) |
| **Routing** | [React Router v6](https://reactrouter.com/) |

### Backend (`apps/api`)
| Layer | Technologies |
|---|---|
| **Runtime & Server** | [Node.js 20+](https://nodejs.org/), [Express 4](https://expressjs.com/) |
| **Database & ORM** | [PostgreSQL (Supabase)](https://supabase.com/), [Prisma ORM](https://www.prisma.io/) |
| **Vector Engine** | [pgvector](https://github.com/pgvector/pgvector) extension |
| **Local Embeddings** | [`@xenova/transformers`](https://github.com/xenova/transformers.js) (`all-MiniLM-L6-v2`) |
| **LLM Generation** | [Google Gemini API](https://ai.google.dev/) (`@google/generative-ai`) |
| **Authentication** | Passport.js (Google OAuth 2.0), JSON Web Tokens (JWT), BcryptJS |
| **Validation & Safety** | [Zod](https://zod.dev/), [Helmet](https://helmetjs.github.io/), [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) |

---

## 📡 API Reference

### Authentication
- `POST /api/auth/register` — Register a new account with email & password.
- `POST /api/auth/login` — Authenticate and receive access & refresh tokens.
- `GET /api/auth/google` — Initiate Google OAuth 2.0 flow.
- `GET /api/auth/google/callback` — Google OAuth callback handler.
- `POST /api/auth/refresh` — Rotate refresh token and issue a fresh access token.
- `GET /api/auth/me` — Retrieve the currently authenticated user profile.

### Projects & Workspaces
- `GET /api/projects` — List all active projects for the current user.
- `POST /api/projects` — Create a new workspace project.
- `GET /api/projects/:id` — Retrieve project details, sources, and query history.
- `PATCH /api/projects/:id` — Update project metadata.
- `DELETE /api/projects/:id` — Delete a project and associated documents.
- `POST /api/projects/:id/archive` — Archive a workspace project.
- `POST /api/projects/:id/unarchive` — Restore an archived project.

### Documents & Ingestion
- `POST /api/projects/:projectId/documents` — Upload a PDF file (multipart form data).
- `GET /api/documents/:id` — Fetch document metadata and indexing status.
- `DELETE /api/documents/:id` — Delete a document and its vector embeddings.

### Intelligence & Chat
- `POST /api/projects/:projectId/chat` — Submit a question across indexed sources to receive a RAG-grounded response with verified citations.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 20.0.0
- **npm** ≥ 9.0.0
- A free **Supabase** project (PostgreSQL with `pgvector` extension enabled)
- A free **Google Gemini API Key** ([Google AI Studio](https://aistudio.google.com/apikey))

### 1. Clone the Repository
```bash
git clone https://github.com/tabishachouhan/ai-workspace.git
cd ai-workspace
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy the sample environment file in `apps/api`:
```bash
cp apps/api/.env.example apps/api/.env
```
Fill in the values in `apps/api/.env`:
```env
# Database (PostgreSQL with pgvector enabled)
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"

# Supabase Storage
SUPABASE_URL="https://[YOUR_PROJECT_REF].supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# Authentication Secrets
JWT_ACCESS_SECRET="generate-a-strong-access-secret"
JWT_REFRESH_SECRET="generate-a-strong-refresh-secret"
JWT_ACCESS_EXPIRY="15m"
JWT_REFRESH_EXPIRY="7d"

# Google OAuth (Optional for local testing)
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:5000/api/auth/google/callback"

# AI Inference (Free tier)
GEMINI_API_KEY="your-gemini-api-key"

# In-process embeddings (No API key needed)
EMBEDDING_MODEL="Xenova/all-MiniLM-L6-v2"

# Server & Client URLs
PORT=5000
NODE_ENV="development"
CLIENT_URL="http://localhost:5173"
```

### 4. Database Setup & Migrations
```bash
npm run prisma:generate --workspace=apps/api
npm run prisma:migrate --workspace=apps/api
```

### 5. Launch the Development Environment
Run both backend and frontend concurrently:

```bash
# Terminal 1: Backend API (port 5000)
npm run dev:api

# Terminal 2: Web Frontend (port 5173)
npm run dev:web
```

Visit **`http://localhost:5173`** in your browser.

---

## 📂 Repository Structure

```
ai-workspace/
├── apps/
│   ├── web/                     # React 19 Frontend (Vite)
│   │   ├── src/
│   │   │   ├── features/
│   │   │   │   ├── about/       # About page & builder profile
│   │   │   │   ├── auth/        # Login & Register views
│   │   │   │   ├── chat/        # RAG query hooks
│   │   │   │   ├── documents/   # Document ingestion hooks
│   │   │   │   ├── landing/     # Hero & 3D tilt presentation
│   │   │   │   └── projects/    # Dashboard & Document Intelligence
│   │   │   └── ...
│   │   └── package.json
│   │
│   └── api/                     # Express Backend & RAG Engine
│       ├── prisma/              # Database schema & migrations
│       ├── src/
│       │   ├── config/          # Environment, Supabase, & Passport
│       │   ├── middleware/      # Auth, rate-limiting, error handling
│       │   ├── modules/
│       │   │   ├── auth/        # JWT & OAuth handlers
│       │   │   ├── chat/        # Vector similarity search & Gemini RAG
│       │   │   ├── documents/   # PDF parsing & in-process embeddings
│       │   │   └── projects/    # Workspace management
│       │   └── server.js
│       └── package.json
│
├── docs/                        # Architecture & security documentation
└── package.json                 # Monorepo workspaces configuration
```

---

## 👩‍💻 Creator

**Tabisha Chouhan**  
*Full-Stack Software Engineer · AI Systems & RAG Architecture*

- **GitHub:** [@tabishachouhan](https://github.com/tabishachouhan)
- **Repository:** [tabishachouhan/ai-workspace](https://github.com/tabishachouhan/ai-workspace)
- **LinkedIn:** [Tabisha Chouhan](https://www.linkedin.com/in/tabisha-chouhan-9473243b3/)
- **Email:** [tabishachouhan001@gmail.com](mailto:tabishachouhan001@gmail.com)

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
