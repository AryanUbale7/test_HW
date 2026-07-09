import fs from 'fs';
import path from 'path';

// Parse .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
const envFile = fs.readFileSync(envPath, 'utf-8');
const env: Record<string, string> = {};
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
    env[key] = value;
  }
});

async function inspectTable(table: string) {
  const url = `${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${table}?limit=1`;
  const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Prefer': 'count=exact'
      }
    });
    
    console.log(`\n=== Table: ${table} ===`);
    console.log(`Status: ${res.status} ${res.statusText}`);
    
    // Read the headers to see if we can get some structure, or just parse one item
    if (res.ok) {
      const data = await res.json();
      console.log('Sample Row:', data[0] || 'No rows in table');
    } else {
      console.log('Error Details:', await res.text());
    }
  } catch (err: any) {
    console.error(`Error inspecting table ${table}:`, err.message);
  }
}

async function main() {
  await inspectTable('posts');
  await inspectTable('resources');
  await inspectTable('faqs');
  await inspectTable('glossary_terms');
  await inspectTable('contact_messages');
  await inspectTable('newsletter_subscribers');
}

main();
