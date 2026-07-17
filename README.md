# Honworth Wealth Advisory Platform

A premium wealth-advisory client portal and administrative management console built with Next.js 15, MySQL, TailwindCSS, Framer Motion, and Redis rate-limiting.

---

## 🌟 Key Architecture & Features

* **Incremental Static Regeneration (ISR)**: High-performance Next.js App Router setup with dynamic paths (`/articles`, `/articles/[slug]`, `/glossary/[slug]`) configured with `revalidate = 60` for fast indexing and live updates.
* **Premium Brand Styling**: Minimalist HSL-curated gold-and-green color scheme matching Honworth corporate aesthetics. Micro-animations and responsive components built from scratch.
* **Multi-tenant Subdomain Routing**:
  - Client brochure and editorial content serve at `honworth.in`.
  - Administrative dashboard operates on the `admin.` subdomain (e.g. `admin.honworth.in` or `admin.localhost:3000` locally).
* **Hardened Security & Authentication**:
  - Custom JWT session management using Web Crypto API.
  - Constant-time signature verification to prevent timing attacks.
  - Mandatory environment check throwing hard errors if secrets are missing.
  - Input sanitization (HTML escaping) on contact/lead-capture routes.
  - Redis-backed security limits guarding failed logins and IP lockouts.
* **Extensive Search Engine Optimization (SEO)**:
  - Default OpenGraph and Twitter configurations in layout roots.
  - Structured metadata schema bindings (JSON-LD WebSite, BreadcrumbList, DefinedTerm, Service, ProfessionalService) to secure Google Rich Snippets.
  - Auto-generated static/dynamic sitemaps and search robot parameters.

---

## 📁 Project Directory Structure

```text
├── app/                     # Next.js App Router Pages
│   ├── (site)/              # Public brochure routes (brochures, calculators, blog)
│   ├── admin/               # Admin panel dashboard routes (requires authenticated session)
│   ├── api/                 # Endpoint logic (contact, newsletter-signup, lead-capture)
│   ├── globals.css          # Styling rules & Tailwind integrations
│   └── layout.tsx           # Global root HTML structure & default SEO metadata
├── components/              # Reusable React UI Components
│   ├── admin/               # Admin Forms (PostForm, RichTextEditor, Sidebar)
│   ├── sections/            # Core layout components (Navbar, Footer, Calculators, Cards)
│   └── ui/                  # Atom widgets (SectionHeader, Card, etc.)
├── lib/                     # Database Actions, Helpers & Utilities
│   ├── actions/             # Server Actions (Mutations & DB Inserts)
│   ├── queries/             # Data fetch handlers (Select queries)
│   ├── utils/               # Sanitizers, HTML Escapers, Date formatters
│   ├── validations/         # Zod schemas (Contact forms, Post creation validation)
│   ├── audit.ts             # Admin activity logger
│   ├── auth-check.ts        # Server-side authentication guard
│   ├── mysql.ts             # MySQL pool initiator (Hostinger VPS)
│   └── session.ts           # Timing-safe JWT session manager
├── public/                  # Static assets (emblem, logo files, PDF resources)
├── types/                   # TypeScript interfaces (Post, Glossary, Author, FAQ)
├── .env.example             # Clean configuration template
├── mysql_schema.sql         # Main MySQL database setup schema
├── next.config.ts           # NextJS compiler config & security headers
├── tailwind.config.ts       # Branding color palette configurations
└── tsconfig.json            # Strict TypeScript configuration
```

---

## 💻 Local Development Workflow

Follow these steps to run the Honworth codebase on your local machine:

### 1. Configure Local Environment
Copy the example file to `.env.local`:
```bash
cp .env.example .env.local
```
Edit `.env.local` to supply your **MySQL connection credentials**, **Upstash Redis REST credentials**, and a secure **session secret**.

### 2. Install Project Dependencies
Use NPM to fetch required libraries:
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

* **Client Brochure website**: [http://localhost:3000](http://localhost:3000)
* **Admin Management Console**: [http://admin.localhost:3000](http://admin.localhost:3000) (Ensure your hosts file resolves subdomains or use administrative dashboard routes).

---

## 💾 Database Schema

The platform runs on a **MySQL InnoDB engine** configured with index optimization. You can find the database initialization structure in `mysql_schema.sql`.

Key tables include:
* `posts` - Blog articles, metadata, and Tiptap HTML content.
* `authors` - Author details, bios, and credentials.
* `glossary_terms` - Glossary definition cards mapped to financial categories.
* `contact_messages` - Client leads capturing names, phone, email, and inquiry messages.
* `newsletter_subscribers` - Gated content downloads and newsletter lists.
* `admin_activity_log` - Security audit trail tracking admin changes.
* `admins` - Authenticated logins storing SHA-256 salted credentials.

---

## 🚀 Deployment to Hostinger

The production environment is hosted on Hostinger.

### Automated Redeployment
1. Push your changes to the `main` branch:
   ```bash
   git push origin main
   ```
2. Log in to your **Hostinger Dashboard**.
3. Select your application page and click **Redeploy** to build and serve the latest Next.js build.
