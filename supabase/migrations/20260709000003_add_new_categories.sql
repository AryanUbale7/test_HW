-- Drop old CHECK constraints if they exist
ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_arm_check;
ALTER TABLE faqs DROP CONSTRAINT IF EXISTS faqs_arm_check;
ALTER TABLE glossary_terms DROP CONSTRAINT IF EXISTS glossary_terms_arm_check;

-- Add new CHECK constraints allowing 'Pers.Fin' and 'Economy'
ALTER TABLE posts ADD CONSTRAINT posts_arm_check CHECK (arm IN ('Creation', 'Protection', 'Legacy', 'General', 'Pers.Fin', 'Economy'));
ALTER TABLE faqs ADD CONSTRAINT faqs_arm_check CHECK (arm IN ('Creation', 'Protection', 'Legacy', 'General', 'Pers.Fin', 'Economy'));
ALTER TABLE glossary_terms ADD CONSTRAINT glossary_terms_arm_check CHECK (arm IN ('Creation', 'Protection', 'Legacy', 'General', 'Pers.Fin', 'Economy'));
