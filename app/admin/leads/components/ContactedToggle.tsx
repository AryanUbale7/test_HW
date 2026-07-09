'use client'

import { useTransition } from 'react'
import { toggleContactedStatus } from '../actions'

export function ContactedToggle({ id, contacted }: { id: number; contacted: boolean }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      onClick={() => {
        startTransition(() => {
          toggleContactedStatus(id, contacted)
        })
      }}
      disabled={isPending}
      className={`px-3 py-1 text-sm rounded-full transition-colors ${
        contacted 
          ? 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-200' 
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200'
      } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {contacted ? 'Contacted' : 'Mark Contacted'}
    </button>
  )
}
