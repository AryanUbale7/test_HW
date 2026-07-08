import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manually parse .env.local
const envPath = path.resolve('.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.substring(1, value.length - 1);
    }
    env[key] = value.trim();
  }
});

// Use native fetch to call Supabase REST endpoints directly
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const apiKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !apiKey) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const headers = {
  'apikey': apiKey,
  'Authorization': `Bearer ${apiKey}`
};

async function inspect() {
  try {
    console.log("Fetching authors...");
    const resAuth = await fetch(`${supabaseUrl}/rest/v1/authors?select=*`, { headers });
    const authors = await resAuth.json();
    console.log("Authors:", authors);

    console.log("Fetching faqs...");
    const resFaq = await fetch(`${supabaseUrl}/rest/v1/faqs?select=*`, { headers });
    const faqs = await resFaq.json();
    console.log("FAQs:", faqs);

    console.log("Fetching posts...");
    const resPosts = await fetch(`${supabaseUrl}/rest/v1/posts?select=title,slug,status&limit=5`, { headers });
    const posts = await resPosts.json();
    console.log("Posts:", posts);
  } catch (err) {
    console.error("Error inspecting database:", err);
  }
}

inspect();
