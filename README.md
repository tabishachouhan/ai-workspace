<div align="center">

  # ⚡ AI WORKSPACE
  ### *Turn raw documents into verified executive intelligence — zero hallucinations.*

  <br />

  [![Deploy with Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)](https://ai-workspace-gamma-six.vercel.app)
  [![Deploy on Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://ai-workspace-h8lp.onrender.com)
  [![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
  [![Google Gemini](https://img.shields.io/badge/AI-Google_Gemini_1.5-8E44AD?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev)
  [![Prisma](https://img.shields.io/badge/Database-PostgreSQL_|_pgvector-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io)

  <br />

  [🌐 **Explore Live App**](https://ai-workspace-gamma-six.vercel.app) • [📖 **Interactive Docs**](#-how-it-works-rag-architecture) • [⚡ **Quickstart**](#-quickstart-run-locally-in-3-minutes) • [💬 **Feedback**](https://github.com/tabishachouhan/ai-workspace/issues)

  ---

</div>

<br />

## 🌟 Why AI Workspace?

> **The Problem:** Generic AI chatbots hallucinate facts, guess page numbers, and fabricate quotes.  
> **The Solution:** **AI Workspace** is an enterprise-grade document intelligence desk. Every answer generated is **mathematically grounded** in source document chunks using vector embeddings and attributed with verifiable page receipts.

<br />

---

## ✨ Features That Stand Out

<details open>
<summary><strong>🎨 1. Perplexity & Linear Inspired UI (Click to expand)</strong></summary>

<br />

- **Physics-Damped 3D Hero Card:** Live mouse-tracking 3D tilt interaction with glassmorphism standard (`backdrop-filter: blur(16px)`).
- **Living Ambient Aura:** Dynamic fluid gradients and interactive spotlights following cursor movement.
- **Editorial Typography:** *Instrument Serif* display headings paired with *Work Sans* body and *IBM Plex Mono* metadata badges.
</details>

<details open>
<summary><strong>📑 2. Autonomous Document Research Desk (Click to expand)</strong></summary>

<br />

- **1-Click Executive Prompts:** Instant interrogation buttons (*"Executive Briefing"*, *"Key Metrics & Dates"*, *"Credentials Audit"*).
- **Verified Source Receipts:** Every answer features a green shield badge showing the exact number of verified source chunks used.
- **Multi-Format Export:** Export findings instantly into **Markdown (`.md`)**, **Text (`.txt`)**, **Word (`.doc`)**, or **PDF**.
</details>

<details open>
<summary><strong>🛡️ 3. Bank-Grade Security & Authentication (Click to expand)</strong></summary>

<br />

- **Dual Auth:** Password login + **Google OAuth 2.0**.
- **JWT Rotation:** 15-minute access tokens + 7-day rotating refresh tokens with automatic reuse detection family invalidation.
- **Strict Project Isolation:** User data & embeddings are scoped strictly per project workspace.
</details>

<br />

---

## 🧠 How It Works (RAG Architecture)

```mermaid
flowchart TD
    subgraph INGESTION ["📥 1. Ingestion Phase"]
        A[📄 PDF Document] -->|pdf-parse| B[🧩 Semantic Chunks ~1000 Tokens]
        B -->|Google Gemini API| C[🔢 text-embedding-004]
        C -->|Save Embeddings| D[(🗄️ PostgreSQL + pgvector)]
    end

    subgraph QUERY ["🔍 2. Retrieval & Generation"]
        E[💬 User Prompt] -->|Generate Query Vector| F[🎯 Cosine Similarity Search]
        D -->|Fetch Top-5 Chunks| F
        F -->|Context Window| G[🧠 Gemini 1.5 Flash Model]
        G -->|Synthesize| H[✅ Cited Executive Answer]
    end
```

<br />

---

## 🛠️ Tech Stack Matrix

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | `React 19` • `Vite` • `Tailwind CSS` • `Framer Motion` • `Lucide Icons` |
| **Backend** | `Node.js` • `Express` • `Passport.js` (Google OAuth) • `Zod` |
| **Database** | `PostgreSQL` • `pgvector` • `Prisma ORM` |
| **AI Engine** | `Google Gemini 1.5 Flash` • `text-embedding-004` |
| **Storage & Host** | `Supabase Storage` • `Vercel` (Frontend) • `Render` (Backend) |

<br />

---

## ⚙️ Environment Configuration Guide

<details>
<summary><strong>🔑 Click to view <code>apps/api/.env</code> (Backend Template)</strong></summary>

```env
PORT=5000
NODE_ENV=development

# Database Connection
DATABASE_URL="postgresql://user:password@localhost:5432/ai_workspace?schema=public"

# Auth Secrets
JWT_ACCESS_SECRET="your_jwt_access_secret_here"
JWT_REFRESH_SECRET="your_jwt_refresh_secret_here"
JWT_ACCESS_EXPIRY="15m"
JWT_REFRESH_EXPIRY="7d"

# Google OAuth Credentials
GOOGLE_CLIENT_ID="your_google_client_id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
GOOGLE_CALLBACK_URL="http://localhost:5000/api/auth/google/callback"

# AI & Storage Keys
SUPABASE_URL="https://your-supabase-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_key"
GEMINI_API_KEY="your_gemini_api_key"

# Client Application URL
CLIENT_URL="http://localhost:5173"
```
</details>

<details>
<summary><strong>🎨 Click to view <code>apps/web/.env</code> (Frontend Template)</strong></summary>

```env
VITE_API_URL="http://localhost:5000"
```
</details>

<br />

---

## 🚀 Quickstart: Run Locally in 3 Minutes

```bash
# 1️⃣ Clone the repository
git clone https://github.com/tabishachouhan/ai-workspace.git
cd ai-workspace

# 2️⃣ Install all dependencies
npm install

# 3️⃣ Run database setup & Prisma generation
npx prisma migrate dev
npx prisma generate

# 4️⃣ Launch frontend + backend together!
npm run dev
```

Visit `http://localhost:5173` to explore locally! 🎉

<br />

---

## 🌐 Production Deployment

<details>
<summary><strong>☁️ Render Deployment Steps (Backend)</strong></summary>

1. Create a **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository `tabishachouhan/ai-workspace`.
3. Set **Build Command**: `npm install && npx prisma generate`
4. Set **Start Command**: `npm run start`
5. Add your production environment variables in the Render Dashboard.
</details>

<details>
<summary><strong>▲ Vercel Deployment Steps (Frontend)</strong></summary>

1. Import project into [Vercel](https://vercel.com).
2. Set **Root Directory** to `apps/web`.
3. Add Environment Variable `VITE_API_URL` = `https://ai-workspace-h8lp.onrender.com`.
4. Deploy!
</details>

<br />

---

<div align="center">

  ### 👤 Developed with ❤️ by **Tabisha Chouhan**

  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tabishachouhan)

  *If you find this project helpful, give it a ⭐ on GitHub!*

</div>