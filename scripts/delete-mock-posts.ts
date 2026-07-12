// Script to delete all mock articles from Supabase using fetch API to avoid WS issues
// Run with: npx tsx scripts/delete-mock-posts.ts

import { readFileSync } from 'fs'
import { resolve } from 'path'

// Parse .env.local manually
const envPath = resolve(process.cwd(), '.env.local')
const envContent = readFileSync(envPath, 'utf-8')
const env: Record<string, string> = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/)
  if (match) env[match[1].trim()] = match[2].trim()
})

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL']
const supabaseKey = env['SUPABASE_SERVICE_ROLE_KEY']

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

async function deleteMockPosts() {
  const url = `${supabaseUrl}/rest/v1/posts?slug=like.mock-*`
  
  console.log('Sending DELETE request to:', `${supabaseUrl}/rest/v1/posts?slug=like.mock-*`)
  
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'apikey': supabaseKey!,
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    }
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('❌ Error deleting mock posts:', errorText)
    process.exit(1)
  }

  const deletedItems = await response.json()
  console.log(`\n✅ Successfully deleted ${deletedItems.length} mock article(s) from the database:`)
  deletedItems.forEach((p: any) => console.log(`  - ${p.slug} (${p.title})`))
}

deleteMockPosts().catch(err => {
  console.error('❌ Script failed:', err)
  process.exit(1)
})
