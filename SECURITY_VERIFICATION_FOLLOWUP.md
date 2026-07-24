# SECURITY_VERIFICATION_FOLLOWUP.md — Live Security Verification & Hardening Report

**Date**: July 24, 2026  
**Target Platform**: Honworth (Next.js 16 + MySQL + Hostinger + Custom Session Auth)  
**Audit Scope**: Live Test Verification (2a–2e), PBKDF2 Iteration Upgrade & Migration, CSRF Architecture Audit.

---

## 1. Applied Security Fixes

### A. PBKDF2 Iteration Upgrade to 210,000 Iterations (OWASP Standard)
- **Problem**: Password hashing previously used 10,000 iterations of PBKDF2-HMAC-SHA512.
- **Fix Applied (`lib/auth.ts`)**:
  - Upgraded iteration count to **210,000 iterations** for all new password hashes per OWASP guidelines.
  - Implemented hash format `salt:iterations:hash` alongside backwards-compatible verification (`verifyPasswordDetailed`).
- **Migration Strategy (Option B — Seamless Transparent Upgrade)**:
  - When an admin logs in, `verifyPasswordDetailed` checks if the stored hash uses the legacy 10,000 iteration format (`salt:hash`).
  - Upon successful authentication with a legacy hash, the `login()` server action (`lib/actions/auth.ts`) transparently re-hashes the password using 210,000 iterations and updates the `admins` table.

### B. Removal of Hardcoded Fallback Admin Credentials
- **Problem**: `lib/actions/auth.ts` previously had hardcoded fallback default strings (`admin@honworth.in` and `HonworthAdmin2026!`) if environment variables were unset.
- **Fix Applied (`lib/actions/auth.ts`)**:
  - Removed all hardcoded fallback credential strings.
  - Environmental super-admin check now strictly requires `process.env.ADMIN_EMAIL` and `process.env.ADMIN_PASSWORD` to both be explicitly set.

---

## 2. Live Security Test Results (2a – 2e)

| Test Identifier | Security Assessment Target | Real Test Execution & Result | Status |
| :--- | :--- | :--- | :---: |
| **2a. Rate Limiting Lockout** | 6 consecutive failed login attempts from the same IP | **Executed**: Triggered 6 sequential invalid login calls. Attempts 1–4 returned remaining attempt counters (4, 3, 2, 1). Attempt 5 returned 15-minute IP lockout warning. Attempt 6 was rejected immediately by the rate limiter without querying the database (`"Too many failed login attempts"`). | **PASS** |
| **2b. Admin Route Bypass** | Directly invoking admin server actions without session cookie | **Executed**: Attempted calling admin server actions (`deletePost`, `createResource`, `deleteFaq`, `updateLaunchSettings`) without an `admin_session` cookie. Every action threw `Unauthorized access. Session invalid or expired.` and terminated prior to any database operation. | **PASS** |
| **2c. Session Token Tampering** | Tampering 1 character in valid signed session JWT token | **Executed**: Generated valid token via `signSession()`, mutated a single character in the HMAC-SHA256 signature string, and passed it to `verifySession()`. Token signature check failed and returned `null`. | **PASS** |
| **2d. Draft Post Isolation** | Accessing a draft post URL while logged out | **Executed**: Queried a post with `status = 'draft'` via `getPostBySlug()`. The SQL query (`WHERE p.slug = ? AND p.status = 'published'`) returned `null`, rendering Next.js `notFound()` (404 page). Draft content is completely unexposed. | **PASS** |
| **2e. Default Credentials Audit** | Verifying no hardcoded admin passwords exist in codebase | **Executed**: Searched full codebase for hardcoded fallback strings. Identified and removed default fallback credentials in `lib/actions/auth.ts`. Simulated login with unset `ADMIN_PASSWORD` env variable; authentication was strictly rejected. | **PASS** |

---

## 3. CSRF Mechanism Audit (Server Actions vs API Routes)

Next.js 16 handles CSRF differently depending on whether an endpoint is a **Server Action** or a **Traditional API Route (`/api/...`)**.

### A. Admin Mutation Audit (100% Server Actions)
Every administrative state-changing operation (Create, Update, Delete) is implemented exclusively as a **Server Action (`'use server'`)**. Next.js automatically validates `Host` and `Origin` request headers and appends single-use action IDs, providing built-in CSRF protection:

- `lib/actions/posts.ts`: `createPost`, `updatePost`, `deletePost`, `uploadImage` (Server Actions)
- `lib/actions/admin.ts`: `createResource`, `updateResource`, `deleteResource`, `uploadResourceFile`, `createFaq`, `updateFaq`, `deleteFaq`, `toggleLeadContacted`, `saveGlossaryTerm`, `deleteGlossaryTerm` (Server Actions)
- `lib/actions/auth.ts`: `login`, `logout` (Server Actions)
- `lib/actions/site-settings.ts`: `updateLaunchSettings`, `launchNow` (Server Actions)

### B. Traditional API Routes Audit (`app/api/`)
There are **zero** admin mutation endpoints defined as traditional API routes. The existing API routes are strictly public or read-only:

1. `/api/contact/route.ts` (POST) — Public contact submission guarded by Honeypot + Rate Limiter + Zod.
2. `/api/newsletter-signup/route.ts` (POST) — Public newsletter signup guarded by Rate Limiter + Zod.
3. `/api/lead-capture/route.ts` (POST) — Public gated resource download lead capture guarded by Rate Limiter + Zod.
4. `/api/site-settings/route.ts` (GET) — Read-only public site launch mode query.
5. `/api/health/route.ts` (GET) — Read-only diagnostic system health check.

**CSRF Verdict**: **CONFIRMED SECURE**. All admin state changes use Next.js Server Actions with built-in CSRF origin validation.
