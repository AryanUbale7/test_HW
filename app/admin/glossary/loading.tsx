import React from 'react'

export default function GlossaryLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-7 bg-slate-200 rounded w-36" />
        <div className="h-9 bg-slate-200 rounded w-24" />
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 p-4">
          <div className="h-5 bg-slate-200 rounded w-full" />
        </div>
        <div className="p-6 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-4 items-center">
              <div className="h-5 bg-slate-200 rounded flex-1" />
              <div className="h-5 bg-slate-200 rounded w-32" />
              <div className="h-5 bg-slate-200 rounded w-24" />
              <div className="h-5 bg-slate-200 rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
