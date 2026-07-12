// Script to update the author name in Supabase from Aryan Ubale to Rahul Karandikar
// Run with: npx tsx scripts/update-author-name.ts

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

async function updateAuthorName() {
  const selectUrl = `${supabaseUrl}/rest/v1/authors?select=id,name`
  
  console.log('Fetching authors from Supabase...')
  const fetchResponse = await fetch(selectUrl, {
    method: 'GET',
    headers: {
      'apikey': supabaseKey!,
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json'
    }
  })

  if (!fetchResponse.ok) {
    const errorText = await fetchResponse.text()
    console.error('❌ Error fetching authors:', errorText)
    process.exit(1)
  }

  const authors = await fetchResponse.json()
  console.log('Current authors in database:', authors)

  const targetAuthor = authors.find((a: any) => a.name === 'Aryan Ubale')
  
  if (!targetAuthor) {
    console.log('⚠️ Could not find author named "Aryan Ubale".')
    
    // Let's try updating any author just in case, or report if none found
    if (authors.length > 0) {
      console.log(`Updating the first author (${authors[0].name}) to "Rahul Karandikar"...`)
      await performUpdate(authors[0].id)
    } else {
      console.log('❌ No authors found in the database to update.')
    }
    return
  }

  console.log(`Found author "Aryan Ubale" with ID: ${targetAuthor.id}. Updating to "Rahul Karandikar"...`)
  await performUpdate(targetAuthor.id)
}

async function performUpdate(id: string) {
  const updateUrl = `${supabaseUrl}/rest/v1/authors?id=eq.${id}`
  const response = await fetch(updateUrl, {
    method: 'PATCH',
    headers: {
      'apikey': supabaseKey!,
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({
      name: 'Rahul Karandikar',
      bio: 'AMFI-registered Mutual Fund Distributor in Pimple Saudagar, Pune, Maharashtra. helping families create, protect, and pass on wealth.'
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('❌ Error updating author:', errorText)
    process.exit(1)
  }

  const updatedResult = await response.json()
  console.log('✅ Successfully updated author in Supabase:', updatedResult)
}

updateAuthorName().catch(err => {
  console.error('❌ Script failed:', err)
  process.exit(1)
})
