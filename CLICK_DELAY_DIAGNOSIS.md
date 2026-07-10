# Click Delay Diagnosis

Comprehensive analysis of every navigation interaction across the Honworth site (public + admin).

---

## Check 1 — `router.push()` / `router.replace()` blocking navigation

**Result: ZERO instances found in application code.**

Every `useRouter` / `router.push` / `router.replace` reference resolves to Next.js internal type declarations (`node_modules/next/dist/...`). No application-level `.tsx` or `.ts` file imports `useRouter` or calls `router.push()`. The codebase exclusively uses `<Link>` components for navigation.

**Verdict: CLEAN — no blocking router.push() calls.**

---

## Check 2 — `<Link>` with onClick handlers doing extra work

| File | Line | onClick Code | Verdict |
|------|------|-------------|---------|
| `Navbar.tsx` L185 | Mobile nav `<Link>` | `() => setIsMobileMenuOpen(false)` | ✅ Trivial sync setState |
| `Navbar.tsx` L209 | Mobile dropdown `<Link>` | `() => setIsMobileMenuOpen(false)` | ✅ Trivial sync setState |
| `AdminSidebar.tsx` | Each sidebar `<Link>` | `() => setIsOpen(false)` | ✅ Trivial sync setState |

**Verdict: CLEAN — all onClick handlers on Links are trivial synchronous state updates.**

---

## Check 3 — High-frequency navigation components

| Component | Pattern | Verdict |
|-----------|---------|---------|
| **ArticleCard** | Pure `<Link>` wrapper, no onClick | ✅ Clean |
| **ArticleListItem** | Pure `<Link>` wrapper, no onClick | ✅ Clean |
| **ArmCard** | Pure `<Link>` for "Learn more" | ✅ Clean |
| **Button (CTA)** | When `href` is provided, renders `<Link>` directly | ✅ Clean |
| **CtaBlock** | Uses `<Button href="/reach-me">`, which renders `<Link>` | ✅ Clean |
| **Footer links** | All `<Link>` components, no onClick | ✅ Clean |
| **GlossaryIndex** | All `<Link>` to `/glossary/[slug]` | ✅ Clean |
| **Navbar (desktop)** | All `<Link>` for top-level + dropdown items | ✅ Clean |
| **ArticlesFeed** | Filter/pagination buttons use `window.history.pushState` (not router.push), never navigates to a new page — only updates URL for same-page filtering | ✅ Correct pattern |
| **ResourceCard** | onClick opens modal or `window.open()` for downloads — not page navigation | ✅ N/A |

**Verdict: CLEAN — all high-frequency navigation uses `<Link>` properly.**

---

## Check 4 — Global click listeners

| File | Pattern | Verdict |
|------|---------|---------|
| `layout.tsx` | `<SpeedInsights />` and `<Analytics />` from `@vercel/analytics` and `@vercel/speed-insights` — these are Vercel's first-party libs that use lightweight non-blocking event capture. They do NOT intercept or delay clicks. | ✅ Non-blocking |
| `ArticlesFeed.tsx` L37 | `window.addEventListener('popstate', ...)` — only listens for browser back/forward, not clicks | ✅ Clean |

**No custom global click interceptors found anywhere.**

**Verdict: CLEAN — no global listeners blocking clicks.**

---

## Check 5 — Missing `loading.tsx` files

### Public site routes:

| Route | Has `loading.tsx` | Needs one? |
|-------|:-:|:-:|
| `/articles` | ✅ | — |
| `/articles/[slug]` | ❌ | **YES** — dynamic data fetch |
| `/calculators` (parent) | ❌ | No (static children) |
| `/calculators/sip` | ❌ | No (client-only calculator) |
| `/calculators/life-cover` | ❌ | No (client-only calculator) |
| `/glossary` | ✅ | — |
| `/glossary/[slug]` | ❌ | **YES** — dynamic data fetch |
| `/library` | ✅ | — |
| `/wealth-creation` | ✅ | — |
| `/wealth-protection` | ✅ | — |
| `/wealth-legacy` | ✅ | — |
| `/my-story` | ❌ | No (static page) |
| `/how-i-work` | ❌ | No (static page) |
| `/reach-me` | ❌ | No (static page) |
| `/disclaimer` | ❌ | No (static page) |
| `/disclosures` | ❌ | No (static page) |
| `/privacy-policy` | ❌ | No (static page) |

> **Impact**: `/articles/[slug]` and `/glossary/[slug]` are the two routes where clicking a link causes a visible delay — the browser has to wait for the server component to fetch post/glossary data from Supabase before anything renders. Adding `loading.tsx` will show instant skeleton feedback.

### Admin routes:
All admin routes already have `loading.tsx` from the previous optimization work. ✅

---

## Check 6 — CSS click/active feedback

**Current state**: The codebase uses `transition-colors duration-300` on most links and buttons. There are NO `:active` pseudo-class styles defined anywhere. The `duration-300` (300ms) hover transition is fine for hover but there's no instant `:active` tap feedback.

**Impact**: When a user clicks a link, there's no sub-100ms visual acknowledgment (scale change, opacity shift, or color flash) that the click registered. The user sees the hover state but nothing changes on press, creating a perceived delay even when navigation is actually fast.

**Verdict: NEEDS FIX — add global `:active` tap feedback styles.**

---

## Summary of issues found

| # | Issue | Severity | Files |
|---|-------|----------|-------|
| 1 | Missing `loading.tsx` on `/articles/[slug]` | **HIGH** | `app/(site)/articles/[slug]/` |
| 2 | Missing `loading.tsx` on `/glossary/[slug]` | **HIGH** | `app/(site)/glossary/[slug]/` |
| 3 | No `:active` press feedback on links/buttons | **MEDIUM** | `globals.css` |
