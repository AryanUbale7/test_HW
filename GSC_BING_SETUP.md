# Google Search Console & Bing Webmaster Tools Setup Guide

This guide outlines the step-by-step instructions to verify and monitor your website's performance on search engines.

---

## 🌐 1. Google Search Console (GSC)

### Step 1: Add Property
1. Go to the [Google Search Console Dashboard](https://search.google.com/search-console).
2. Click the property selector dropdown in the top-left and select **Add property**.
3. Choose the **Domain** property option (recommended). Enter `honworth.in` (do not include `https://` or `www.`).

### Step 2: DNS TXT Verification (Recommended)
1. GSC will provide a TXT record value (e.g., `google-site-verification=xxxx`). Copy this value.
2. Log in to your domain registrar (e.g., GoDaddy, Namecheap, Google Domains).
3. Navigate to the **DNS Management** panel for `honworth.in`.
4. Add a new DNS Record:
   - **Type:** `TXT`
   - **Host/Name:** `@` (or leave blank)
   - **Value:** Paste the verification code copied from GSC.
   - **TTL:** `1 hour` (or default)
5. Save the DNS record. It may take anywhere from a few minutes to 24 hours to propagate.
6. Return to Google Search Console and click **Verify**.

### Step 3: Submit Sitemap
1. Once verified, go to **Sitemaps** in the left-hand menu.
2. Under "Add a new sitemap", enter `sitemap.xml`.
3. Click **Submit**. Google will crawl the sitemap and start indexing pages dynamically.

---

## 🔎 2. Bing Webmaster Tools (BWT)

### Step 1: Verification (One-Click Import)
1. Go to the [Bing Webmaster Tools Portal](https://www.bing.com/webmasters).
2. Sign in with your Microsoft/Google account.
3. BWT offers an option to **Import your properties from Google Search Console**. Select this option.
4. Log in using the same Google account verified in Google Search Console.
5. Click **Import**. Bing will copy the property and automatically verify domain ownership instantly without requiring further DNS updates.

---

## 📅 3. Ongoing Monitoring Checklist
Set a recurring calendar reminder (e.g., **Monthly**) to perform the following checks:
1. **Search Console -> Overview:** Check total clicks, impressions, and average position.
2. **Search Console -> Page Indexing:** Check for any crawl failures, 404s, or pages showing indexing issues.
3. **Core Web Vitals:** Audit mobile and desktop performance field values using actual user data captured via Vercel Speed Insights.
4. **Security & Manual Actions:** Verify that there are no active warnings or manual security actions against the site.
