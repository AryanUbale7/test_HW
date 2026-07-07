import { supabaseAdmin } from '@/lib/supabase/admin'
import { ClientExportButton } from './components/ClientExportButton'
import { ContactedToggle } from './components/ContactedToggle'

// Prevent caching so this page always shows the freshest data
export const dynamic = 'force-dynamic'

export default async function LeadsPage() {
  // Fetch Contact Messages
  const { data: contacts, error: contactsError } = await supabaseAdmin
    .from('ContactMessage')
    .select('*')
    .order('createdAt', { ascending: false })

  // Fetch Newsletter Subscribers
  const { data: subscribers, error: subscribersError } = await supabaseAdmin
    .from('NewsletterSubscriber')
    .select('*')
    .order('subscribedAt', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads & Audience</h1>
          <p className="text-gray-500 mt-2">Manage contact form submissions and newsletter subscribers.</p>
        </div>

        {/* Contact Messages Table */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">Contact Form Submissions</h2>
          </div>
          
          <div className="overflow-x-auto">
            {contactsError ? (
              <div className="p-6 text-red-500">Error loading contacts: {contactsError.message}</div>
            ) : !contacts || contacts.length === 0 ? (
              <div className="p-6 text-gray-500 italic">No contact submissions yet.</div>
            ) : (
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Name</th>
                    <th className="px-6 py-3 font-medium">Email</th>
                    <th className="px-6 py-3 font-medium">Phone</th>
                    <th className="px-6 py-3 font-medium max-w-xs">Message</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">{contact.name}</td>
                      <td className="px-6 py-4 text-gray-600">
                        <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">{contact.email}</a>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{contact.phone || '-'}</td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={contact.message}>
                        {contact.message}
                      </td>
                      <td className="px-6 py-4">
                        <ContactedToggle id={contact.id} contacted={contact.contacted} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>


        {/* Newsletter Subscribers Table */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Newsletter Subscribers</h2>
            <ClientExportButton data={subscribers || []} />
          </div>
          
          <div className="overflow-x-auto">
            {subscribersError ? (
              <div className="p-6 text-red-500">Error loading subscribers: {subscribersError.message}</div>
            ) : !subscribers || subscribers.length === 0 ? (
              <div className="p-6 text-gray-500 italic">No newsletter subscribers yet.</div>
            ) : (
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 font-medium">Subscribed Date</th>
                    <th className="px-6 py-3 font-medium">Email</th>
                    <th className="px-6 py-3 font-medium">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {subscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(sub.subscribedAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">{sub.email}</td>
                      <td className="px-6 py-4 text-gray-600">
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs">{sub.source}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

      </div>
    </div>
  )
}
