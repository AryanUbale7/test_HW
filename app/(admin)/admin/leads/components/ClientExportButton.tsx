'use client'

export function ClientExportButton({ data }: { data: any[] }) {
  const handleExport = () => {
    if (!data || data.length === 0) return

    // Get headers
    const headers = Object.keys(data[0])
    
    // Convert data to CSV string
    const csvRows = []
    csvRows.push(headers.join(','))
    
    for (const row of data) {
      const values = headers.map(header => {
        const val = row[header]
        const escaped = ('' + (val || '')).replace(/"/g, '""')
        return `"${escaped}"`
      })
      csvRows.push(values.join(','))
    }
    
    const csvString = csvRows.join('\n')
    
    // Trigger download
    const blob = new Blob([csvString], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('hidden', '')
    a.setAttribute('href', url)
    a.setAttribute('download', `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <button
      onClick={handleExport}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
    >
      Export as CSV
    </button>
  )
}
