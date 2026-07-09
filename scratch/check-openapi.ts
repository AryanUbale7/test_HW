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
  const url = `${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`;
  const key = env.SUPABASE_SERVICE_ROLE_KEY || '';
  
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    }
    
    const spec = await res.json();
    
    // Print the tables and their columns
    console.log('=== DATABASE SCHEMA DEFINITIONS ===');
    const definitions = spec.definitions || {};
    
    for (const tableName of Object.keys(definitions)) {
      if (['posts', 'resources', 'faqs', 'glossary_terms', 'contact_messages', 'newsletter_subscribers', 'authors'].includes(tableName)) {
        console.log(`\nTable: ${tableName}`);
        const properties = definitions[tableName].properties || {};
        for (const colName of Object.keys(properties)) {
          const col = properties[colName];
          console.log(`  - ${colName}: ${col.type} ${col.format ? `(${col.format})` : ''} ${col.description ? `- ${col.description}` : ''}`);
        }
      }
    }
  } catch (err: any) {
    console.error('Error fetching OpenAPI schema:', err.message);
  }
}

main();
