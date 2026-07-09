import { createClient } from '@supabase/supabase-js';
import path from 'path';
import fs from 'fs';

// Parse .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
const envFile = fs.readFileSync(envPath, 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
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

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL || '',
  env.SUPABASE_SERVICE_ROLE_KEY || '',
  {
    auth: {
      persistSession: false,
    }
  }
);

async function verify() {
  console.log('=== Verifying Mock Posts Seeding ===');

  // Fetch all posts starting with 'mock-'
  const { data: posts, error } = await supabase
    .from('posts')
    .select('title, slug, arm, type, published_at, status')
    .like('slug', 'mock-%')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching mock posts:', error.message);
    process.exit(1);
  }

  console.log(`Total Mock Posts found: ${posts.length}`);

  const counts = { Creation: 0, Protection: 0, Legacy: 0 };
  const types = {};
  
  posts.forEach((post, i) => {
    counts[post.arm] = (counts[post.arm] || 0) + 1;
    types[post.type] = (types[post.type] || 0) + 1;
    console.log(`[${i + 1}] Title: "${post.title}" | Arm: ${post.arm} | Type: ${post.type} | Date: ${post.published_at} | Status: ${post.status}`);
  });

  console.log('\n=== Summary of Counts ===');
  console.log('Creation:', counts.Creation);
  console.log('Protection:', counts.Protection);
  console.log('Legacy:', counts.Legacy);
  console.log('Types distribution:', types);

  // Assertions
  if (posts.length !== 15) {
    console.error('FAIL: Expected exactly 15 mock posts, found ' + posts.length);
    process.exit(1);
  }
  if (counts.Creation !== 5 || counts.Protection !== 5 || counts.Legacy !== 5) {
    console.error('FAIL: Expected exactly 5 posts for each of Creation, Protection, and Legacy.');
    process.exit(1);
  }

  console.log('\nSUCCESS: Database verification passed!');
}

verify();
