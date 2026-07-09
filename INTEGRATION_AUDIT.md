# Honworth Integration & Data Flow Audit Report

This report documents the end-to-end integration state of the Honworth platform with the Supabase database. A programmatic test suite was executed to check actual database connectivity, read-write flows, and schema consistency.

---

## 🔍 Database Table Status
| Table Name | Row Count / Status | Issues Found |
| :--- | :--- | :--- |
| **`posts`** | 0 | Violates check constraint `posts_type_check` when inserting type `'Guide'`. |
| **`resources`** | 0 | Missing column `gated_by_email` in database. |
| **`faqs`** | 0 | None. Database integration works. |
| **`glossary_terms`** | **MISSING** | Table does not exist in the database. |
| **`contact_messages`** | 0 | Missing column `contacted` (database has `status` instead). |
| **`newsletter_subscribers`** | 1 | None. Database integration works. |

---

## 📋 Integration Audit Table

| Page/Feature | Data Source Verified? | Issue Found (if any) | Fixed? |
| :--- | :--- | :--- | :--- |
| **Home (/) — Article Strip** | Yes | None. Fetches dynamic posts via `getPosts()`. | No |
| **/articles — Full List** | Yes | None. Supports pagination, sorting, and arm/type filters dynamically. | No |
| **/articles/[slug] — Dynamic Routes** | Yes | **Security Issue:** Public visitors can access draft articles. The query `getPostBySlug(slug)` lacks a status check (`status = 'published'`). | No |
| **/library — Resources & FAQs** | No (Fails) | **Database Error:** Mismatch due to missing column `gated_by_email` in `resources` table. | No |
| **/glossary & /glossary/[slug]** | No (Fails) | **Database Error:** Glossary table `glossary_terms` does not exist in the database. | No |
| **/calculators/sip & /calculators/life-cover** | Yes | None. Both pages share the exact same components imported from `@/components/sections/`. | No |
| **/reach-me — Contact Form** | No (Fails) | **Database Error:** Mismatch due to missing column `contacted` in `contact_messages` table. | No |
| **Newsletter Signup (All areas)** | Yes | None. Handles validation, subscriber inserts, and notifications. | No |
| **Every Arm Page (Creation, Protection, Legacy)** | No (Static) | **Hardcoded data:** Author/credentials credentials banner is hardcoded inside `ArmPageTemplate.tsx` instead of querying the `authors` table. | No |
| **Admin Panel: CRUD Post** | No (Fails) | **Constraint Violation:** Creating a post with type `'Guide'` is blocked by the database check constraint `posts_type_check`. | No |
| **Admin Panel: CRUD Resource/FAQ/Glossary** | No (Fails) | **Database Error:** Operations fail because of the missing `glossary_terms` table and the missing `gated_by_email` column in `resources` table. | No |
| **Admin Panel: Leads Inbox** | No (Fails) | **Database Error:** Toggling contacted status fails because `contacted` column does not exist. | No |
| **Admin Panel: Newsletter** | Yes | None. Dynamic list works, CSV export button creates CSV files with real data. | No |
| **Admin Dashboard counts** | Yes | None. Summary metrics are calculated dynamically using real count queries. | No |
| **Supabase Configuration (.env.local)** | Yes | None. Environment variables are set consistently. | No |
| **Upstash Rate Limiter** | Yes | None. Rate limiting is configured and active. | No |
| **Storage Uploads** | Yes | None. Landing correctly in `media` and `resources` buckets. | No |
| **Sitemap generator** | Yes | None. Dynamically generates URLs matching published entries. | No |

---

## ⚠️ Hardcoded Placeholders Found
- **My Story (`/my-story`):** Hardcoded placeholder AMFI registration `ARN–XXXXXX` on line 99.
- **Footer (`components/sections/Footer.tsx`):** Hardcoded placeholder AMFI registration `ARN-XXXXXX` on line 71.
- **Regulatory Disclosures (`/disclosures`):** Hardcoded dates `[DATE TBD]`, `[LEGAL COPY TBD]`, and registration number `ARN-[PLACEHOLDER]`.
- **Disclaimer (`/disclaimer`):** Hardcoded dates `[DATE TBD]` and `[LEGAL COPY TBD]`.
- **Privacy Policy (`/privacy-policy`):** Hardcoded dates `[DATE TBD]` and `[LEGAL COPY TBD]`.
- **How I Work (`/how-i-work`):** Hardcoded `[Visual Placeholder]` texts on lines 40, 61, and 74.
- **Author Welcome component (`components/sections/AuthorWelcome.tsx`):** Hardcoded Unsplash portrait and biography details.
