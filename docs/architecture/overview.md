# ClassOrbit — Architectural Blueprint & System Overview

**Document Version:** 1.0  
**Source of Truth:** Approved PRD v1.1 — Cloudflare Architecture  
**Current Phase:** Phase 0 — Project Foundation  

---

## 1. High-Level Architecture Overview

ClassOrbit is a content-first educational platform designed for Bangladeshi students (Classes 6 to 10) following the NCTB curriculum. The technical architecture enforces strict separation of concerns across presentation, routing, persistence, and object storage:

```
+------------------------------------------------------------------+
|                  ClassOrbit System Boundaries                     |
+------------------------------------------------------------------+
                                  |
                                  v
                    +---------------------------+
                    |    Next.js Web Frontend   |  <--- [PHASE 0 & 1]
                    |     (Vercel Hosting)      |
                    +-------------+-------------+
                                  |
            [HTTPS API Requests / Session Cookies via Proxy]
                                  |
                                  v
                    +---------------------------+
                    | Cloudflare Workers Backend|  <--- [PHASE 2 - INACTIVE]
                    |  (Hono Router + RBAC API) |
                    +------+-------------+------+
                           |             |
           [D1 Native Binding]           [R2 S3 Presigned URLs]
                           |             |
                           v             v
       +-----------------------+     +------------------------+
       |     Cloudflare D1     |     |      Cloudflare R2     |  <--- [PHASE 5 - INACTIVE]
       |  (SQLite-based Relational)  |     |  (Private Object Store) |
       | <--- [PHASE 2 - INACTIVE] |     +------------------------+
       +-----------------------+
```

---

## 2. Core Responsibilities & Component Separation

### 2.1 Next.js Frontend (`apps/web`) — Phase 0 & Phase 1
- **Status:** **Active (Phase 0 Foundation Implemented; Phase 1 Pending)**
- **Hosting Target:** Vercel
- **Technology:** Next.js 15 (App Router), React 19, TypeScript (Strict), Tailwind CSS, shadcn/ui.
- **Responsibilities:**
  - Public web interface, SEO metadata, and server-side rendering (SSR).
  - Student learning portal and responsive educational navigation.
  - Teacher/Admin dashboard UI.
  - Bengali typography optimization (Hind Siliguri / Noto Sans Bengali) and accessible responsive layouts.
- **Strict Invariants:**
  - Next.js **must never** directly connect to Cloudflare D1.
  - Client-side code **must never** contain database secrets, Cloudflare API credentials, or R2 tokens.

### 2.2 Cloudflare Workers Backend (`apps/api`) — Phase 2
- **Status:** **PLANNED (Not implemented in Phase 0)**
- **Technology:** Cloudflare Workers, Hono, `@cloudflare/workers-types`.
- **Responsibilities:**
  - Serving the unified REST API (`api.classorbit.com`).
  - Request authentication, session validation, and strict Role-Based Access Control (RBAC).
  - Mediating all read and write queries to Cloudflare D1 via native bindings.
  - Generating time-limited, presigned URLs for Cloudflare R2 file uploads and downloads.
- **Strict Invariants:**
  - All protected endpoints must verify sessions and permissions server-side.
  - Public APIs must never expose draft content or MCQ answer keys.

### 2.3 Cloudflare D1 Database — Phase 2
- **Status:** **PLANNED (Not implemented in Phase 0)**
- **Technology:** Cloudflare D1 (Serverless SQLite Dialect), Drizzle ORM.
- **Responsibilities:**
  - Relational storage for Curricula, Classes, Subjects, Chapters, Topics, Materials, Questions, Bookmarks, and Reading History.
  - Better Auth tables (`user`, `session`, `account`, `verification`).
  - Full-Text Search (FTS5) index for educational content discovery with fallback query logic.
- **Strict Invariants:**
  - Direct PostgreSQL-specific features (e.g. Supabase RLS, `pg_trgm`) are strictly forbidden.
  - Binary files (images, PDFs) must never be stored directly in D1; D1 stores metadata and storage keys only.

### 2.4 Better Auth & Google OAuth — Phase 3
- **Status:** **PLANNED (Not implemented in Phase 0)**
- **Responsibilities:**
  - Google OAuth sign-in flow and session persistence.
  - Server-side session verification in Cloudflare Workers.
  - Cross-domain cookie and CORS management across `www.classorbit.com` and `api.classorbit.com`.

### 2.5 Cloudflare R2 Storage — Phase 5
- **Status:** **PLANNED (Not implemented in Phase 0)**
- **Technology:** Cloudflare R2 Private Bucket.
- **Responsibilities:**
  - Storage for handwritten math solution images, chapter PDFs, and diagrams.
  - S3-compatible presigned upload/download authorization.
- **Strict Invariants:**
  - The R2 bucket is strictly private. Direct public bucket exposure is disallowed.

---

## 3. Development Phase Roadmap

| Phase | Phase Name | Focus | Status |
| :---: | :--- | :--- | :---: |
| **0** | **Project Foundation** | Monorepo setup, Next.js App Router, Tailwind CSS, shadcn/ui, Git init, code quality | **CURRENT / COMPLETED** |
| 1 | UI/UX Design | Design system, Bengali typography, complete responsive UI mockups | Pending Approval |
| 2 | Cloudflare Database & Backend | Cloudflare Workers, D1 schema, versioned migrations, Drizzle ORM | Planned |
| 3 | Authentication | Better Auth, Google OAuth, session cookies, RBAC enforcement | Planned |
| 4 | Admin CMS | Class/Subject/Chapter management, TipTap rich text, KaTeX math editor | Planned |
| 5 | File Management | Cloudflare R2 private bucket, presigned upload URLs, PDF reader | Planned |
| 6 | Student Features | Personal dashboard, reading history, bookmarks, progress tracking | Planned |
| 7 | Question Bank & Search | MCQ, Creative questions, Formula library, D1 FTS5 search | Planned |
| 8 | Testing & Production Audit | End-to-end security audit, performance tuning, production release | Planned |

---

*This document was drafted to establish clear architectural boundaries for Phase 0 in compliance with ClassOrbit PRD v1.1.*
