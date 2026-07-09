# Code Cleanup Audit — Honworth

This document outlines the findings of the dead code, duplication, and configuration audit before initiating any refactoring.

## 1. Unused Files & Folders
- `components/admin/auth/` — Empty directory. Will be deleted.
- `convert_pdf.py` — Scratch helper script in root. Will be moved to the `scratch/` directory.
- `Main_Logo.pdf` — PDF logo source in root. Will be moved to the `scratch/` directory.

## 2. Code Duplications
- **`slugify()`** — The slug generation function is duplicated in three separate files:
  1. `components/admin/GlossaryAdmin.tsx`
  2. `components/admin/PostForm.tsx`
  3. `lib/actions/posts.ts`
  *Fix:* Consolidate into a single utility `lib/utils/slugify.ts` and import it.
- **`formatCurrency()`** — Indian currency formatting is duplicated in two files:
  1. `components/ui/SipCalculator.tsx`
  2. `components/ui/LifeCoverEstimator.tsx`
  *Fix:* Consolidate into a single utility `lib/utils/formatCurrency.ts` and import it.
- **Date Formatting** — The date formatting logic `new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })` is duplicated in 5+ public pages and components.
  *Fix:* Consolidate into `lib/utils/formatDate.ts`.

## 3. Leftover Sanity Configuration
- **Checked:** Run full codebase regex scan for "sanity".
- **Result:** **0 references found**. All legacy Sanity-related code has been completely and correctly removed.

## 4. Commented-out Code
- **Checked:** Scanned for leftover large blocks of commented-out code.
- **Result:** No deprecated/dead code blocks found. Clean.

## 5. Console Log Statements
- **Checked:** Scanned for console logging statements.
- **Result:** No production-polluting `console.log` statements are present.
  - `console.log` in `lib/mail.ts` is required for mock mail sending logs.
  - `console.log` in `scratch/test-db.js` is a developer test script.
  - Standard error handling logs `console.error` are present in API routes and database queries to assist debugging; these will be kept.
