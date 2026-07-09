# Calculators Feature — Implementation Summary

## Pages Built

| Route | Type | Title |
|---|---|---|
| `/calculators/sip` | Dynamic (client) | SIP Calculator \| Honworth |
| `/calculators/life-cover` | Dynamic (client) | Life Cover Estimator \| Honworth |

Both pages are confirmed working standalone routes in the build output.
Both are also embedded in `/library` via the same reusable components (no logic duplication).

---

## A. SIP Calculator — `/calculators/sip`

### Formula Used
Standard SIP Future Value formula:

```
FV = P × [((1 + r)^n − 1) / r] × (1 + r)

Where:
  P = Monthly investment amount (₹)
  r = Monthly interest rate = Annual rate / 12 / 100
  n = Total months = years × 12
```

**Outputs:**
- Total Amount Invested = P × n
- Estimated Wealth Gained = FV − Invested
- Estimated Total Value = FV

### Inputs
| Input | Range | Default |
|---|---|---|
| Monthly Investment | ₹500 – ₹5,00,000 | ₹10,000 |
| Expected Annual Return | 1% – 20% | 12% |
| Investment Duration | 1 – 40 years | 15 years |

Every input has **both a slider and an editable number field** — slider for quick visual adjustment, text input for precise entry. Both are always visible and synced.

### Chart
Year-by-year area chart (recharts `AreaChart`) comparing:
- Amount Invested (cumulative) — sage/green fill
- Estimated Value — gold fill

### Compliance Disclaimer (Permanently Visible)
> "**Illustrative only** — actual returns depend on market performance and are not guaranteed. This is not investment advice. The rate of return shown is chosen by you for illustration — it is not a prediction or promise."

- Rendered as an amber banner at the **top** of the calculator — always visible, non-dismissible, not behind a toggle.
- Result label reads: "Estimated value based on your inputs — not a guaranteed outcome."
- No language like "you could have ₹X!" anywhere.

---

## B. Life Cover Estimator — `/calculators/life-cover`

### Formula Used
Human Life Value (HLV) approach — two-bound range:

```
Conservative (lower bound):
  Income Replacement = Annual Income × Dependent Years × 0.5
  Total = Income Replacement + Outstanding Liabilities

Higher estimate (upper bound):
  Income Replacement = Annual Income × Dependent Years × 1.0
  Dependent Buffer = Number of Dependents × ₹10,00,000
  Total = Income Replacement + Liabilities + Dependent Buffer
```

Output is always presented as a **range** (e.g. "₹X – ₹Y"), never a single number.

### Inputs
| Input | Range | Default |
|---|---|---|
| Annual Income | ₹1L – ₹1 Cr | ₹12,00,000 |
| Outstanding Loans / Liabilities | ₹0 – ₹5 Cr | ₹30,00,000 |
| Number of Dependents | 0 – 10 | 2 |
| Years Until Youngest Dependent Is Financially Independent | 1 – 40 yrs | 20 yrs |

Every input has **both a slider and an editable number field**.

### Compliance Disclaimer (Permanently Visible)
> "**Rough illustrative estimate only** — based on general thumb-rules, not personalised advice. Actual cover needs depend on your full financial situation. No specific insurer or product is referenced here."

- Amber banner at the top — always visible, non-dismissible.
- Output framed as: "Range often considered by families in similar situations."
- Result note: "This range is a rough estimate — not a recommended amount. Actual needs vary."
- Words "guaranteed," "assured," and "recommended amount" do not appear anywhere.

---

## C. Shared

### Sitemap
Both URLs included in `app/sitemap.ts`:
```
https://honworth.in/calculators/sip         priority=0.8, monthly
https://honworth.in/calculators/life-cover  priority=0.8, monthly
```

### Navigation
**Navbar** — both calculators listed as individual links under the **My Library** dropdown:
- "SIP Calculator" → `/calculators/sip` (Calculator icon)
- "Life Cover Estimator" → `/calculators/life-cover` (HeartPulse icon)

**Footer** — both added to Quick Links column below Library and Glossary.

### Structured Data
`WebApplication` schema (schema.org) on each dedicated page:
- `applicationCategory: "FinanceApplication"`
- Description explicitly states "illustrative" and "not a guarantee"
- `FAQPage` or `DefinedTerm` schemas deliberately not used — these are tools, not reference content

### Library Embedding
Both `<SipCalculator />` and `<LifeCoverEstimator />` components are imported into `/library` as embedded sections under the `#calculators` anchor. The same component handles both standalone pages and embedded usage via the `embedded` prop (controls heading tag level: `h2` standalone, `h3` when embedded).

### Mobile
- Sliders use `type="range"` with `cursor-pointer` and large touch targets
- Editable number inputs are the **primary** input method; sliders are secondary/visual
- Layout switches to single-column on mobile (grid drops to 1 col below `md:`)
