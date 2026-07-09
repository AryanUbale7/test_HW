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

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !ANON_KEY || !SERVICE_KEY) {
  console.error('Error: Missing Supabase credentials in .env.local');
  process.exit(1);
}

// REST Headers
const adminHeaders = {
  'apikey': SERVICE_KEY,
  'Authorization': `Bearer ${SERVICE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};

const publicHeaders = {
  'apikey': ANON_KEY,
  'Authorization': `Bearer ${ANON_KEY}`,
  'Content-Type': 'application/json'
};

async function dbGet(table: string, queryParams = '', useAdmin = false) {
  const url = `${SUPABASE_URL}/rest/v1/${table}${queryParams}`;
  const res = await fetch(url, {
    headers: useAdmin ? adminHeaders : publicHeaders
  });
  if (!res.ok) {
    throw new Error(`GET ${table} failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

async function getCount(table: string): Promise<string> {
  try {
    const data = await dbGet(table, '?select=id', true);
    return String(data.length);
  } catch (err: any) {
    if (err.message.includes('Could not find the table')) {
      return 'MISSING (Table does not exist)';
    }
    return `ERROR: ${err.message}`;
  }
}

async function dbPost(table: string, body: any) {
  const url = `${SUPABASE_URL}/rest/v1/${table}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    throw new Error(`POST ${table} failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

async function dbPatch(table: string, queryParams: string, body: any) {
  const url = `${SUPABASE_URL}/rest/v1/${table}${queryParams}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: adminHeaders,
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    throw new Error(`PATCH ${table} failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

async function dbDelete(table: string, queryParams: string) {
  const url = `${SUPABASE_URL}/rest/v1/${table}${queryParams}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: adminHeaders
  });
  if (!res.ok) {
    throw new Error(`DELETE ${table} failed: ${res.status} ${await res.text()}`);
  }
  return true;
}

async function runTests() {
  console.log('--- STARTING END-TO-END SUPABASE INTEGRATION VERIFICATION ---');

  console.log('\n[1/7] Fetching database table status...');
  const postsStatus = await getCount('posts');
  const resourcesStatus = await getCount('resources');
  const faqsStatus = await getCount('faqs');
  const glossaryStatus = await getCount('glossary_terms');
  const leadsStatus = await getCount('contact_messages');
  const subscribersStatus = await getCount('newsletter_subscribers');

  console.log(`- posts Table: ${postsStatus}`);
  console.log(`- resources Table: ${resourcesStatus}`);
  console.log(`- faqs Table: ${faqsStatus}`);
  console.log(`- glossary_terms Table: ${glossaryStatus}`);
  console.log(`- contact_messages Table: ${leadsStatus}`);
  console.log(`- newsletter_subscribers Table: ${subscribersStatus}`);

  // Test other flows only if tables exist
  if (!postsStatus.startsWith('MISSING') && !postsStatus.startsWith('ERROR')) {
    try {
      console.log('\n[2/7] Testing Blog Post flow...');
      const testPost = {
        title: 'E2E Test Post',
        slug: 'e2e-test-post',
        excerpt: 'This is an end-to-end test post.',
        body: '<p>Testing blog posts integration.</p>',
        arm: 'General',
        type: 'Guide',
        status: 'draft'
      };
      const [createdPost] = await dbPost('posts', testPost);
      console.log(`  Draft post created with ID: ${createdPost.id}`);

      const publicPostsBefore = await dbGet('posts', '?status=eq.published&slug=eq.e2e-test-post');
      if (publicPostsBefore.length !== 0) {
        console.warn('  ⚠️ WARNING: Draft post is visible to public posts query!');
      } else {
        console.log('  ✅ Success: Draft post is hidden from public.');
      }

      await dbPatch('posts', `?id=eq.${createdPost.id}`, { status: 'published', published_at: new Date().toISOString() });
      const publicPostsAfter = await dbGet('posts', '?status=eq.published&slug=eq.e2e-test-post');
      if (publicPostsAfter.length === 1) {
        console.log('  ✅ Success: Post became visible publicly after publishing.');
      } else {
        console.error('  ❌ ERROR: Post is not visible publicly.');
      }

      await dbDelete('posts', `?id=eq.${createdPost.id}`);
      const publicPostsDeleted = await dbGet('posts', '?slug=eq.e2e-test-post', true);
      if (publicPostsDeleted.length === 0) {
        console.log('  ✅ Success: Post permanently deleted.');
      }
    } catch (err: any) {
      console.error('  ❌ Blog Post flow test failed:', err.message);
    }
  }

  if (!resourcesStatus.startsWith('MISSING') && !resourcesStatus.startsWith('ERROR')) {
    try {
      console.log('\n[3/7] Testing Resource flow...');
      const testResource = {
        title: 'E2E Test Resource',
        description: 'Test resource description.',
        file_url: 'https://example.com/test-resource.pdf',
        gated_by_email: true
      };
      const [createdRes] = await dbPost('resources', testResource);
      console.log(`  Resource created with ID: ${createdRes.id}`);

      const publicRes = await dbGet('resources', `?id=eq.${createdRes.id}`);
      if (publicRes.length === 1) {
        console.log('  ✅ Success: Resource visible publicly.');
      } else {
        console.error('  ❌ ERROR: Resource is not visible.');
      }

      await dbDelete('resources', `?id=eq.${createdRes.id}`);
      const publicResDeleted = await dbGet('resources', `?id=eq.${createdRes.id}`, true);
      if (publicResDeleted.length === 0) {
        console.log('  ✅ Success: Resource permanently deleted.');
      }
    } catch (err: any) {
      console.error('  ❌ Resource flow test failed:', err.message);
    }
  }

  if (!faqsStatus.startsWith('MISSING') && !faqsStatus.startsWith('ERROR')) {
    try {
      console.log('\n[4/7] Testing FAQ flow...');
      const testFaq = {
        question: 'Is this an E2E test FAQ?',
        answer: 'Yes, it is.',
        arm: 'General'
      };
      const [createdFaq] = await dbPost('faqs', testFaq);
      console.log(`  FAQ created with ID: ${createdFaq.id}`);

      const publicFaq = await dbGet('faqs', `?id=eq.${createdFaq.id}`);
      if (publicFaq.length === 1) {
        console.log('  ✅ Success: FAQ visible publicly.');
      } else {
        console.error('  ❌ ERROR: FAQ is not visible.');
      }

      await dbDelete('faqs', `?id=eq.${createdFaq.id}`);
      const publicFaqDeleted = await dbGet('faqs', `?id=eq.${createdFaq.id}`, true);
      if (publicFaqDeleted.length === 0) {
        console.log('  ✅ Success: FAQ permanently deleted.');
      }
    } catch (err: any) {
      console.error('  ❌ FAQ flow test failed:', err.message);
    }
  }

  if (!glossaryStatus.startsWith('MISSING') && !glossaryStatus.startsWith('ERROR')) {
    try {
      console.log('\n[5/7] Testing Glossary Term flow...');
      const testTerm = {
        term: 'E2E Test Term',
        slug: 'e2e-test-term',
        short_definition: 'This is a test term definition.',
        full_explanation: 'Full markdown explanation here.',
        arm: 'General',
        related_term_slugs: []
      };
      const [createdTerm] = await dbPost('glossary_terms', testTerm);
      console.log(`  Glossary term created with ID: ${createdTerm.id}`);

      const publicTerm = await dbGet('glossary_terms', `?slug=eq.e2e-test-term`);
      if (publicTerm.length === 1) {
        console.log('  ✅ Success: Glossary term visible publicly.');
      } else {
        console.error('  ❌ ERROR: Glossary term is not visible.');
      }

      await dbDelete('glossary_terms', `?id=eq.${createdTerm.id}`);
      const publicTermDeleted = await dbGet('glossary_terms', `?id=eq.${createdTerm.id}`, true);
      if (publicTermDeleted.length === 0) {
        console.log('  ✅ Success: Glossary term permanently deleted.');
      }
    } catch (err: any) {
      console.error('  ❌ Glossary Term flow test failed:', err.message);
    }
  }

  if (!leadsStatus.startsWith('MISSING') && !leadsStatus.startsWith('ERROR')) {
    try {
      console.log('\n[6/7] Testing Contact Leads flow...');
      const testLead = {
        name: 'E2E Test Lead',
        email: 'e2e-lead@test.com',
        phone: '1234567890',
        message: 'Hello, this is a test lead submission.',
        contacted: false
      };
      const [createdLead] = await dbPost('contact_messages', testLead);
      console.log(`  Lead message created with ID: ${createdLead.id}`);

      await dbPatch('contact_messages', `?id=eq.${createdLead.id}`, { contacted: true });
      const [fetchedLead] = await dbGet('contact_messages', `?id=eq.${createdLead.id}`, true);
      if (fetchedLead.contacted === true) {
        console.log('  ✅ Success: Contacted toggle status persisted.');
      } else {
        console.error('  ❌ ERROR: Toggle status did not persist.');
      }

      await dbDelete('contact_messages', `?id=eq.${createdLead.id}`);
      console.log('  ✅ Success: Lead message deleted.');
    } catch (err: any) {
      console.error('  ❌ Contact Leads flow test failed:', err.message);
    }
  }

  if (!subscribersStatus.startsWith('MISSING') && !subscribersStatus.startsWith('ERROR')) {
    try {
      console.log('\n[7/7] Testing Newsletter subscription flow...');
      const testSubEmail = 'e2e-sub@test.com';
      const [createdSub] = await dbPost('newsletter_subscribers', { email: testSubEmail, source: 'e2e-test' });
      console.log(`  Subscriber created with ID: ${createdSub.id}`);

      try {
        await dbPost('newsletter_subscribers', { email: testSubEmail, source: 'e2e-test' });
        console.warn('  ⚠️ Note: DB insertion allowed duplicate subscriber email.');
      } catch (err: any) {
        console.log('  ✅ Success: DB blocked duplicate email insert.');
      }

      await dbDelete('newsletter_subscribers', `?email=eq.${testSubEmail}`);
      console.log('  ✅ Success: Subscriber deleted.');
    } catch (err: any) {
      console.error('  ❌ Newsletter flow test failed:', err.message);
    }
  }

  console.log('\n--- VERIFICATION COMPLETED ---');
}

runTests();
