'use client'

import { useState, useRef } from 'react'
import { Upload, X, Loader2, Crop } from 'lucide-react'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from '@/lib/utils/cropImage'
import { uploadImage } from '@/lib/actions/posts'

interface CoverImageUploadProps {
  value: string
  onChange: (url: string) => void
  onUploadingChange?: (uploading: boolean) => void
}

export function CoverImageUpload({ value, onChange, onUploadingChange }: CoverImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  
  const changeUploading = (state: boolean) => {
    setUploading(state)
    onUploadingChange?.(state)
  }
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Cropper states
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
  const [originalFileName, setOriginalFileName] = useState('')

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setOriginalFileName(file.name)
    setError('')

    const reader = new FileReader()
    reader.addEventListener('load', () => {
      setImageSrc(reader.result as string)
    })
    reader.readAsDataURL(file)
  }

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const handleCropAndUpload = async () => {
    if (!imageSrc || !croppedAreaPixels) return

    changeUploading(true)
    setError('')
    setImageSrc(null) // Close modal

    try {
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels)
      
      const ext = originalFileName.split('.').pop() || 'jpg'
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`

      const fileToUpload = new File([croppedImageBlob], fileName, { type: croppedImageBlob.type })
      const formData = new FormData()
      formData.append('file', fileToUpload)

      const result = await uploadImage(formData)
      if (result.error) {
        throw new Error(result.error)
      }

      if (result.url) {
        onChange(result.url)
      }
    } catch (err: any) {
      setError(err.message || 'Upload failed')
    } finally {
      changeUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Cover" className="w-full h-48 object-cover rounded-md border border-slate-200" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors shadow-md"
            title="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full h-48 border-2 border-dashed border-slate-300 rounded-md flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 size={24} className="animate-spin mb-2 text-blue-500" />
              <span className="text-sm">Processing & Uploading…</span>
            </>
          ) : (
            <>
              <Upload size={24} className="mb-2" />
              <span className="text-sm">Click to upload cover image</span>
              <span className="text-xs text-slate-400 mt-1">Will open crop window (21:9 ratio)</span>
            </>
          )}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={onFileChange}
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}

      {/* Cropper Modal */}
      {imageSrc && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-4">
          <div className="bg-slate-900 rounded-lg max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col h-[500px]">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-2 text-white">
                <Crop className="w-5 h-5 text-blue-500" />
                <h3 className="font-bold">Crop Cover Image (21:9 Aspect Ratio)</h3>
              </div>
              <button
                type="button"
                onClick={() => setImageSrc(null)}
                className="text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="relative flex-1 bg-slate-950">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={21 / 9}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-400">Zoom</span>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="flex-1 accent-blue-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setImageSrc(null)}
                  className="px-4 py-2 text-sm text-slate-300 bg-slate-850 hover:bg-slate-800 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCropAndUpload}
                  className="px-5 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition-colors flex items-center gap-1.5 shadow-lg shadow-blue-500/10"
                >
                  Crop & Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
