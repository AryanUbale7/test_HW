# Honworth Website & Admin Platform

Welcome to the Honworth platform. This website is built using Next.js for high performance and search engine visibility, with Supabase managing all articles, FAQs, glossary terms, client inquiries, and email subscribers.

---

## 📁 Where Do I Find Things?

If you need to make changes or locate specific files, here is a simple directory map:

- **Want to add or edit a page/route?** Look in the `app/` folder. Every subfolder matches a URL on the site (e.g., `app/glossary` is the glossary page).
- **Want to change how the website looks (layouts/sections)?** Look in the `components/` folder.
  - `components/layout/` contains the header Navbar and Footer.
  - `components/sections/` contains large page sections like the Hero banner, contact form, or calculators.
  - `components/ui/` contains small generic items like buttons or cards.
- **Want to see how database data is fetched?** Look in `lib/queries/`. Data-fetching is grouped by entity (e.g., `lib/queries/posts.ts` for blog posts).
- **Want to see or change admin logic?** Look in `app/admin/` for page routing, and `components/admin/` for the administration views (like post creation forms).

---

## 💻 How Do I Run It Locally?

To run this website on your local computer, open your terminal (command prompt) and type the following commands in order:

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the local server:**
   ```bash
   npm run dev
   ```
3. **Open the site in your browser:**
   Go to [http://localhost:3000](http://localhost:3000) to see the live website.

---

## 🔑 Admin Panel & Logging In

The admin dashboard is where you write articles, manage resources, view glossary terms, and inspect leads.

- **URL:** [http://admin.localhost:3000](http://admin.localhost:3000) (when running locally) or `/admin` on your deployed Vercel domain.
- **Guide:** For full instructions on how to log in, reset passwords, edit draft articles, or add new items, please read the [ADMIN_GUIDE.md](ADMIN_GUIDE.md) guide in the project root folder.

---

## 🛠️ If Something Breaks

If the site behaves unexpectedly or fails to load, follow these steps:

1. **Check the database status:** Log in to your [Supabase Dashboard](https://supabase.com) and ensure the project is active and that tables like `posts` or `glossary_terms` are accessible.
2. **Check the hosting status:** Go to your Vercel Dashboard to inspect build logs, serverless function logs, or deployment alerts.
3. **Reach out for support:** For any configuration help, database schema changes, or script debugging, contact your development team.
