-- ============================================================
-- HONWORTH WEALTH ADVISORY - MYSQL SCHEMA MIGRATION
-- Run this in your Hostinger phpMyAdmin SQL Editor.
-- ============================================================

-- Drop tables in dependency order if they exist
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS admin_activity_log;
DROP TABLE IF EXISTS newsletter_subscribers;
DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS resources;
DROP TABLE IF EXISTS faqs;
DROP TABLE IF EXISTS glossary_terms;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS admins;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Authors Table
CREATE TABLE IF NOT EXISTS authors (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  photo_url TEXT,
  credentials TEXT, -- Store as serialized JSON array: ["CFP", "MBA"]
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Posts Table
CREATE TABLE IF NOT EXISTS posts (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  body LONGTEXT, -- Tiptap HTML content
  cover_image_url TEXT,
  arm VARCHAR(50) NOT NULL, -- 'Creation', 'Protection', 'Legacy', 'General'
  type VARCHAR(50) NOT NULL, -- 'Insight', 'News', 'Guide'
  status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'published'
  published_at TIMESTAMP NULL,
  author_id VARCHAR(36),
  source_url TEXT,
  seo_title VARCHAR(255),
  seo_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Glossary Terms Table
CREATE TABLE IF NOT EXISTS glossary_terms (
  id VARCHAR(36) PRIMARY KEY,
  term VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  short_definition TEXT NOT NULL,
  full_explanation TEXT,
  arm VARCHAR(50), -- 'Creation', 'Protection', 'Legacy', 'General'
  related_term_slugs TEXT, -- Store as serialized JSON array: ["sip", "lump-sum"]
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. FAQs Table
CREATE TABLE IF NOT EXISTS faqs (
  id VARCHAR(36) PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  arm VARCHAR(50), -- 'Creation', 'Protection', 'Legacy', 'General'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Resources Table
CREATE TABLE IF NOT EXISTS resources (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file_url TEXT,
  gated_by_email BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  contacted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  source VARCHAR(255) DEFAULT 'website',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Admin Activity Log Table
CREATE TABLE IF NOT EXISTS admin_activity_log (
  id VARCHAR(36) PRIMARY KEY,
  admin_email VARCHAR(255) NOT NULL,
  action VARCHAR(255) NOT NULL,
  target_id VARCHAR(255) NOT NULL,
  details TEXT, -- Store as serialized JSON object
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Admins Table (For Custom Authentication)
CREATE TABLE IF NOT EXISTS admins (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================
CREATE INDEX idx_posts_status_pub ON posts(status, published_at DESC);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_arm ON posts(arm);
CREATE INDEX idx_faqs_arm ON faqs(arm);
CREATE INDEX idx_glossary_terms_slug ON glossary_terms(slug);
CREATE INDEX idx_glossary_terms_term ON glossary_terms(term ASC);

-- ============================================================
-- SEED INITIAL SEED DATA
-- ============================================================

-- Seed default author (required for posts)
INSERT INTO authors (id, name, bio, photo_url, credentials)
VALUES (
  'default-author-uuid-1111-2222-333333333333', 
  'Honworth Advisors', 
  'Wealth architects dedicated to strategic wealth creation, protection, and legacy planning.', 
  NULL, 
  '["CFP", "Wealth Architect"]'
) ON DUPLICATE KEY UPDATE name=name;

-- Seed initial glossary terms
INSERT INTO glossary_terms (id, term, slug, short_definition, full_explanation, arm, related_term_slugs) VALUES
('g1', 'SIP', 'sip', 'A Systematic Investment Plan (SIP) is a method of investing a fixed amount in a mutual fund at regular intervals.', 'SIPs work by automatically deducting a pre-set amount from your bank account. Over long periods, they average out your cost per unit through rupee-cost averaging.', 'Creation', '["lump-sum-investment", "asset-allocation", "expense-ratio"]'),
('g2', 'Lump Sum Investment', 'lump-sum-investment', 'A lump sum investment means deploying a large amount of money into a mutual fund or other instrument all at once.', 'Unlike SIPs, a lump sum investment puts your full capital to work immediately. It is beneficial when markets are low.', 'Creation', '["sip", "asset-allocation"]'),
('g3', 'Asset Allocation', 'asset-allocation', 'Asset allocation is distributing your investments across different asset classes (equity, debt, gold, real estate).', 'No single asset class performs best every year. Holding a mix balances potential returns against acceptable risk.', 'Creation', '["sip", "lump-sum-investment", "expense-ratio"]'),
('g4', 'Expense Ratio', 'expense-ratio', 'The annual fee charged by a mutual fund to cover its management and operating costs, as a percentage of assets.', 'Lower expense ratios leave more returns in your hands. Direct plans typically have lower expense ratios.', 'Creation', '["sip", "asset-allocation"]'),
('g5', 'PMS', 'pms', 'Portfolio Management Services (PMS) is a professional service where a manager constructs a custom portfolio of stocks.', 'PMS is designed for high-net-worth individuals with a SEBI-mandated minimum investment of Rs 50 lakhs.', 'Creation', '["asset-allocation"]'),
('g6', 'Term Insurance', 'term-insurance', 'A pure life insurance product that provides coverage for a specific period (term), paying a death benefit to beneficiaries.', 'Term insurance has no investment component. It is the most cost-efficient way to replace income and secure your family''s future.', 'Protection', '["health-insurance", "human-life-value"]'),
('g7', 'Health Insurance', 'health-insurance', 'Insurance coverage that pays for medical, surgical, and sometimes dental expenses incurred by the insured.', 'Health insurance prevents a medical emergency from depleting your hard-earned financial reserves.', 'Protection', '["term-insurance"]'),
('g8', 'Human Life Value', 'human-life-value', 'A financial metric representing the present value of all future income a person is expected to earn.', 'HLV is used to estimate the target amount of life insurance required to maintain a family''s standard of living.', 'Protection', '["term-insurance"]'),
('g9', 'Asset Protection', 'asset-protection', 'Strategies used to safeguard a person''s wealth from claims of creditors, lawsuits, or other legal liabilities.', 'It involves structuring assets through trusts or joint accounts to isolate personal wealth from business risks.', 'Protection', '["will", "nomination"]'),
('g10', 'Will', 'will', 'A legal document that sets forth your wishes regarding the distribution of your property after death.', 'A Will allows you to name executors, nominate guardians for minors, and avoid costly intestate succession disputes.', 'Legacy', '["nomination", "succession-planning", "trust"]'),
('g11', 'Nomination', 'nomination', 'A process where an asset holder authorizes a nominee to receive the asset in the event of the holder''s death.', 'A nominee is a trustee/custodian, not the ultimate legal heir, unless specified as such in a Will.', 'Legacy', '["will", "succession-planning"]'),
('g12', 'Trust', 'trust', 'A fiduciary arrangement that allows a third party (trustee) to hold and manage assets on behalf of beneficiaries.', 'Trusts offer precise control over asset distribution, mitigate estate taxes, and protect assets from creditors.', 'Legacy', '["will", "succession-planning", "asset-protection"]'),
('g13', 'Succession Planning', 'succession-planning', 'The process of identifying and preparing individuals to take over ownership roles in a business or estate.', 'In estate planning, it ensures a smooth transition of asset management and preserves business continuity.', 'Legacy', '["will", "trust", "nomination"]'),
('g14', 'Estate Tax', 'estate-tax', 'A levy on the transfer of the estate of a deceased person, calculated on the total net value of all assets.', 'While India currently does not levy estate tax, lifecycle planners monitor trends to advise client structures.', 'Legacy', '["trust", "succession-planning"]')
ON DUPLICATE KEY UPDATE term=term;
