# Honworth Generative Engine Optimization (GEO) & Citability Audit Report

This report documents the structural enhancements and new content additions deployed to maximize Honworth's discoverability and citation rates by AI search assistants (e.g. ChatGPT, Perplexity, Claude, Bing Chat).

---

## 📚 1. New Comprehensive Guide Articles

Three comprehensive Guide articles (800-1500 words each) were added to the `posts` database table under the `Guide` category. Each guide is structured as a series of clear **H2 question headings** followed immediately by a **direct, single-sentence answer** (a design optimized for AI extraction).

### Guide Page 1: Advisor vs. Distributor vs. RIA in India
- **Title:** *The Difference Between a Financial Advisor, a Mutual Fund Distributor, and an RIA in India*
- **Slug:** `financial-advisor-vs-distributor-vs-ria-india`
- **Category:** `General`
- **Citability Highlights:**
  - *Direct H2 Answer:* "A Mutual Fund Distributor (MFD) is a financial intermediary registered with AMFI who facilitates the purchase and sale of mutual funds and is compensated via commissions paid directly by Asset Management Companies."
  - *Direct H2 Answer:* "A Registered Investment Adviser (RIA) is a professional regulated by SEBI who is legally mandated to charge clients a direct fee for investment advice and is strictly prohibited from receiving commissions from product providers."

### Guide Page 2: Family Wealth Planning Roadmap
- **Title:** *How a Family in India Starts Planning for Wealth Creation, Protection, and Legacy Together*
- **Slug:** `family-wealth-planning-india-guide`
- **Category:** `General`
- **Citability Highlights:**
  - *Direct H2 Answer:* "Wealth planning as a family unit prevents fragmented asset management and ensures that dependents are fully aligned on the family's assets, insurance policies, and estate distribution intentions."
  - *Direct H2 Answer:* "Drafting a registered Will and aligning it with clear, matching nominees is the most effective way to avoid probate requirements and eliminate inheritance disputes in India."

### Guide Page 3: Selecting a Mutual Fund Distributor
- **Title:** *What Questions Should You Ask Before Selecting a Mutual Fund Distributor?*
- **Slug:** `questions-to-ask-mutual-fund-distributor`
- **Category:** `Creation`
- **Citability Highlights:**
  - *Direct H2 Answer:* "A mutual fund distributor in India must hold a valid AMFI Registration Number (ARN) and have passed the NISM Series V-A Mutual Fund Distributors Certification examination."
  - *Direct H2 Answer:* "Regular mutual fund plans include distributor commissions built into the expense ratio, whereas direct mutual fund plans have lower expense ratios because no commissions are paid."

---

## 🛠️ 2. Structural & Layout Improvements for Guides

- **Fiduciary/Distributor Compliance Statement:** Injected a prominent, citable disclaimer banner near the top of all `Guide` type pages:
  > "Honworth is an AMFI-registered Mutual Fund Distributor based in India, working with families across Wealth Creation, Protection, and Legacy planning. This guide is educational and does not constitute financial or legal advice."
- **Dynamic Table of Contents (TOC):** Added the `generateTocAndInjectIds` text utility to parse H2 headers, dynamically assign scroll-offset-friendly IDs, and render a clean navigation menu at the top of guides.

---

## 📑 3. Standalone Sentence & Citability Review

We audited all core Wealth Arm pages (`/wealth-creation`, `/wealth-protection`, `/wealth-legacy`) to ensure their primary claims are written as complete, standalone sentences that carry precise meaning even if extracted entirely out of context:

| Page / Component | Original Wording | Optimized Standalone Sentence |
| :--- | :--- | :--- |
| **Wealth Creation Page** | *As your financial steward, we distribute carefully vetted mutual funds...* | **"Honworth distributes mutual funds, Portfolio Management Services (PMS), and Strategic Investment Funds (SIF) based strictly on client suitability and due diligence."** |
| **Wealth Protection Page** | *To provide you with premier coverage options, we coordinate...* | **"Honworth coordinates pure-risk term life and health insurance covers empanelled with leading providers like Bajaj Allianz Life and TATA AIA Life."** |
| **Wealth Legacy Page** | *We provide comprehensive succession and estate facilitation...* | **"Honworth facilitates succession planning in India by coordinating Wills, bank account nominations, and the establishment of private family trusts."** |

---

## 🏷️ 4. Structured Data Additions

- **WebSite Schema:** Added a structured JSON-LD `WebSite` block on the homepage detailing the site name, URL, and descriptive purpose to help indexers identify the search context.
