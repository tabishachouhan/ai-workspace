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