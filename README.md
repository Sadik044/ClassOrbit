# ClassOrbit

> আধুনিক, সহজে ব্যবহারযোগ্য এবং শিক্ষার্থীবান্ধব ডিজিটাল শিক্ষামাধ্যম।

ClassOrbit is a modern, content-first educational platform designed for Bangladeshi students (Classes 6 to 10) following the NCTB curriculum. It organizes educational materials into a structured hierarchy:
`Curriculum → Class → Subject → Chapter → Topic → Material`.

---

## 1. Technology Stack

- **Monorepo Management:** npm Workspaces
- **Frontend Framework:** [Next.js](https://nextjs.org/) 15 (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Code Quality:** ESLint (`next/core-web-vitals`, `next/typescript`), `.editorconfig`
- **Future Backend (Phase 2):** Cloudflare Workers (Routing framework undecided / TBD)
- **Future Database (Phase 2):** Cloudflare D1 (SQLite)
- **Future Auth (Phase 3):** Better Auth + Google OAuth
- **Future Object Storage (Phase 5):** Cloudflare R2

---

## 2. Repository Structure

```text
ClassOrbit/
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI workflow (lint, typecheck, build)
├── apps/
│   └── web/                     # Next.js Frontend Application
│       ├── app/                 # App Router (layout, page, globals.css)
│       ├── components/          # React components
│       │   └── ui/              # shadcn/ui primitives (e.g. Button)
│       ├── lib/                 # Shared client utilities (e.g. cn)
│       ├── public/              # Static assets & robots.txt
│       ├── components.json      # shadcn/ui configuration
│       ├── eslint.config.mjs    # ESLint flat configuration
│       ├── next.config.ts       # Next.js configuration
│       ├── package.json         # Web workspace package definition
│       ├── postcss.config.mjs   # PostCSS configuration
│       ├── tailwind.config.ts   # Tailwind CSS theme & tokens
│       └── tsconfig.json        # Strict TypeScript configuration
├── docs/
│   └── architecture/
│       └── overview.md          # Architectural Blueprint & Phase Separation
├── .editorconfig                # Universal indentation & whitespace rules
├── .env.example                 # Documented environment variables template
├── .gitignore                   # Version control ignore definitions
├── package.json                 # Monorepo root workspace configuration
└── README.md                    # Project documentation
```

---

## 3. Prerequisites

- **Operating System:** Windows 10/11, macOS, or Linux
- **Node.js:** `v20.x` or `v22.x` (Verified with `v22.12.0 LTS`)
- **npm:** `v10.x` (Verified with `v10.9.0`)
- **Git:** `v2.x` (Verified with `v2.56.0`)

---

## 4. Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ClassOrbit
   ```

2. **Install all workspace dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```

---

## 5. Development Commands

Run these commands directly from the repository root:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Next.js local development server (`http://localhost:3000`) |
| `npm run build` | Builds the Next.js application for production |
| `npm run start` | Starts the built production server locally |
| `npm run lint` | Runs ESLint checks across the workspace |
| `npm run typecheck` | Runs TypeScript compilation verification without emitting files |

To run commands directly inside the web workspace:
```bash
npm --workspace=apps/web run dev
```

---

## 6. Environment Variables Guidance

All required environment variables for local frontend development are documented in `.env.example`.
- **Never** commit `.env` or `.env*.local` files to version control.
- Placeholder variables for future phases (Cloudflare API, D1, Google OAuth) are documented for reference and remain inactive during Phase 0.

---

## 7. Current Project Phase

- **Current Phase:** `Phase 0 — Project Foundation` (**Completed**)
- **Next Phase:** `Phase 1 — UI/UX Design` (**Pending Approval**)

*All architectural boundaries comply strictly with the approved PRD v1.1.*
