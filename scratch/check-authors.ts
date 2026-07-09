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

async function main() {
  const url = `${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/authors?select=*`;
  const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  try {
    const res = await fetch(url, {
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    }
    
    const data = await res.json();
    console.log('Authors count:', data.length);
    console.log('Authors details:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error fetching authors:', err);
  }
}

main();
