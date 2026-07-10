-- ==========================================
-- SCALABILITY & QUERY PERFORMANCE INDEXES
-- Run this in your Supabase SQL Editor to support fast queries under high traffic.
-- ==========================================

-- 1. Indexes on POSTS table
CREATE INDEX IF NOT EXISTS idx_posts_status_published_at ON posts(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_arm ON posts(arm);

-- 2. Indexes on FAQS table
CREATE INDEX IF NOT EXISTS idx_faqs_arm ON faqs(arm);

-- 3. Indexes on GLOSSARY_TERMS table
CREATE INDEX IF NOT EXISTS idx_glossary_terms_slug ON glossary_terms(slug);
CREATE INDEX IF NOT EXISTS idx_glossary_terms_term ON glossary_terms(term ASC);
