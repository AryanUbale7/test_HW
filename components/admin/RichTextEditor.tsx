'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import FontFamily from '@tiptap/extension-font-family'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { Extension } from '@tiptap/core'

import {
  Undo, Redo, Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered,
  Indent as IndentIcon, Outdent as OutdentIcon, Link as LinkIcon, Image as ImageIcon,
  Table as TableIcon, Minus, Trash2, Code, ChevronDown, Check,
  Palette, Highlighter, Heading1, Heading2, Heading3, Loader2, Plus, Trash
} from 'lucide-react'
import { useCallback, useState, useRef, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

// --- Custom Indent Extension ---
export interface IndentOptions {
  types: string[]
  minLevel: number
  maxLevel: number
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    indent: {
      indent: () => ReturnType
      outdent: () => ReturnType
    }
  }
}

const Indent = Extension.create<IndentOptions>({
  name: 'indent',
  addOptions() {
    return {
      types: ['paragraph', 'heading', 'blockquote'],
      minLevel: 0,
      maxLevel: 8,
    }
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: element => parseInt(element.getAttribute('data-indent') || '0', 10),
            renderHTML: attributes => {
              if (!attributes.indent) {
                return {}
              }
              return { 
                'data-indent': attributes.indent, 
                style: `margin-left: ${attributes.indent * 2}rem` 
              }
            },
          },
        },
      },
    ]
  },
  addCommands() {
    return {
      indent: () => ({ tr, state }) => {
        const { selection } = state
        tr.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
          if (this.options.types.includes(node.type.name)) {
            const currentIndent = node.attrs.indent || 0
            if (currentIndent < this.options.maxLevel) {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                indent: currentIndent + 1,
              })
            }
          }
        })
        return true
      },
      outdent: () => ({ tr, state }) => {
        const { selection } = state
        tr.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
          if (this.options.types.includes(node.type.name)) {
            const currentIndent = node.attrs.indent || 0
            if (currentIndent > this.options.minLevel) {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                indent: currentIndent - 1,
              })
            }
          }
        })
        return true
      },
    }
  },
})

// --- RibbonButton Component ---
const RibbonButton = ({
  onClick, active, children, title, disabled = false, className = ''
}: {
  onClick: () => void, active?: boolean, children: React.ReactNode, title: string, disabled?: boolean, className?: string
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    disabled={disabled}
    className={`p-1.5 rounded transition-colors flex items-center justify-center gap-1.5 ${
      active 
        ? 'bg-sage-mist text-deep-green font-medium border border-sage/55' 
        : 'text-charcoal hover:bg-slate-100 hover:text-slate-900 border border-transparent'
    } disabled:opacity-30 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
)

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  error?: string
}

export function RichTextEditor({ content, onChange, error }: RichTextEditorProps) {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showHighlightPicker, setShowHighlightPicker] = useState(false)
  const [showStyleDropdown, setShowStyleDropdown] = useState(false)
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [showTableGrid, setShowTableGrid] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  
  // Link parameters
  const [linkUrl, setLinkUrl] = useState('')
  const [linkOpenInNewTab, setLinkOpenInNewTab] = useState(true)

  // Table grid hover tracker
  const [hoveredRow, setHoveredRow] = useState(0)
  const [hoveredCol, setHoveredCol] = useState(0)

  const styleDropdownRef = useRef<HTMLDivElement>(null)
  const colorPickerRef = useRef<HTMLDivElement>(null)
  const highlightPickerRef = useRef<HTMLDivElement>(null)
  const linkModalRef = useRef<HTMLDivElement>(null)
  const tableGridRef = useRef<HTMLDivElement>(null)

  // Brand Swatches (Honworth colors + basic white/black/gray/red)
  const brandColors = [
    { name: 'Charcoal', value: '#36403B' },
    { name: 'Gold', value: '#8C6921' },
    { name: 'Deep Green', value: '#2E4A3A' },
    { name: 'Sage', value: '#AEC3B0' },
    { name: 'Sage Mist', value: '#E8EFE6' },
    { name: 'Ivory', value: '#FBF8F0' },
    { name: 'Black', value: '#000000' },
    { name: 'Gray', value: '#64748B' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Red', value: '#EF4444' },
  ]

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      FontFamily,
      Subscript,
      Superscript,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        HTMLAttributes: {
          class: 'flex items-start my-1',
        },
        nested: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-gold underline hover:text-gold/80' },
      }),
      Image.configure({
        HTMLAttributes: { class: 'rounded-md max-w-full my-4 mx-auto block shadow-md border border-sage/20' },
      }),
      Placeholder.configure({
        placeholder: 'Start writing your document here...',
      }),
      Indent,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none w-full prose prose-lg max-w-none font-serif',
      },
    },
  })

  // Close menus on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (styleDropdownRef.current && !styleDropdownRef.current.contains(event.target as Node)) {
        setShowStyleDropdown(false)
      }
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false)
      }
      if (highlightPickerRef.current && !highlightPickerRef.current.contains(event.target as Node)) {
        setShowHighlightPicker(false)
      }
      if (linkModalRef.current && !linkModalRef.current.contains(event.target as Node)) {
        setShowLinkModal(false)
      }
      if (tableGridRef.current && !tableGridRef.current.contains(event.target as Node)) {
        setShowTableGrid(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const openLinkModal = () => {
    if (!editor) return
    const attrs = editor.getAttributes('link')
    setLinkUrl(attrs.href || '')
    setLinkOpenInNewTab(attrs.target === '_blank')
    setShowLinkModal(true)
  }

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editor) return
    if (!linkUrl) {
      editor.chain().focus().unsetLink().run()
    } else {
      editor.chain().focus().setLink({ 
        href: linkUrl.trim(), 
        target: linkOpenInNewTab ? '_blank' : '_self' 
      }).run()
    }
    setShowLinkModal(false)
    setLinkUrl('')
  }

  const addImage = useCallback(async () => {
    if (!editor) return

    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      try {
        setIsUploadingImage(true)
        const supabase = createClient()
        const ext = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`
        const filePath = `posts/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(filePath)

        editor.chain().focus().setImage({ src: publicUrl, alt: file.name }).run()
      } catch (err: any) {
        alert(err.message || 'Upload failed')
      } finally {
        setIsUploadingImage(false)
      }
    }
    input.click()
  }, [editor])

  const handleIndent = () => {
    if (!editor) return
    if (editor.isActive('bulletList') || editor.isActive('orderedList')) {
      editor.chain().focus().sinkListItem('listItem').run()
    } else {
      editor.chain().focus().indent().run()
    }
  }

  const handleOutdent = () => {
    if (!editor) return
    if (editor.isActive('bulletList') || editor.isActive('orderedList')) {
      editor.chain().focus().liftListItem('listItem').run()
    } else {
      editor.chain().focus().outdent().run()
    }
  }

  const getStyleLabel = () => {
    if (!editor) return 'Paragraph'
    if (editor.isActive('heading', { level: 1 })) return 'Heading 1'
    if (editor.isActive('heading', { level: 2 })) return 'Heading 2'
    if (editor.isActive('heading', { level: 3 })) return 'Heading 3'
    if (editor.isActive('blockquote')) return 'Blockquote'
    return 'Paragraph'
  }

  const getWordCount = () => {
    if (!editor) return 0
    const text = editor.getText()
    const cleanText = text.trim().replace(/\s+/g, ' ')
    if (!cleanText) return 0
    return cleanText.split(' ').length
  }

  const getReadingTime = () => {
    const words = getWordCount()
    const minutes = Math.ceil(words / 200) || 1
    return minutes === 1 ? '1 min read' : `${minutes} mins read`
  }

  if (!editor) return null

  return (
    <div className="border border-slate-300 rounded-md overflow-hidden flex flex-col bg-slate-50 relative min-h-[600px] w-full">
      
      {/* Visual Rich text editor styles to ensure MS Word feeling */}
      <style>{`
        .ProseMirror {
          min-height: 500px;
          outline: none;
          font-family: var(--font-serif);
          color: #36403B;
          width: 100%;
        }
        .ProseMirror p {
          font-family: var(--font-sans);
          margin-bottom: 1.25rem;
          line-height: 1.75;
          font-size: 1rem;
        }
        .ProseMirror h1 {
          font-size: 2.25rem;
          font-family: var(--font-serif);
          color: #2E4A3A;
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        .ProseMirror h2 {
          font-size: 1.75rem;
          font-family: var(--font-serif);
          color: #2E4A3A;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
          font-weight: 700;
        }
        .ProseMirror h3 {
          font-size: 1.25rem;
          font-family: var(--font-serif);
          color: #2E4A3A;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }
        .ProseMirror blockquote {
          border-left: 4px solid #8C6921;
          padding-left: 1.5rem;
          font-style: italic;
          color: #36403B;
          margin: 1.5rem 0;
        }
        .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .ProseMirror li {
          margin-bottom: 0.5rem;
          font-family: var(--font-sans);
        }
        .ProseMirror table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 1.5rem 0;
          overflow: hidden;
        }
        .ProseMirror td, .ProseMirror th {
          min-width: 1em;
          border: 1px solid #AEC3B0;
          padding: 8px 10px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }
        .ProseMirror th {
          font-weight: bold;
          text-align: left;
          background-color: #E8EFE6;
          color: #2E4A3A;
        }
        .ProseMirror pre {
          background-color: #36403B;
          color: #FBF8F0;
          padding: 1rem;
          border-radius: 4px;
          font-family: monospace;
          margin: 1.5rem 0;
          overflow-x: auto;
        }
        .ProseMirror code {
          background-color: #E8EFE6;
          color: #8C6921;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: monospace;
          font-size: 0.9em;
        }
        .ProseMirror p code {
          background-color: #E8EFE6;
          color: #8C6921;
        }
      `}</style>

      {/* Sticky MS Word Ribbon Style Toolbar */}
      <div className="sticky top-0 z-30 bg-slate-50 border-b border-slate-250 p-2 flex flex-wrap items-center gap-1.5 shadow-sm select-none">
        
        {/* Group 1: Undo/Redo */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-slate-350">
          <RibbonButton onClick={() => editor.chain().focus().undo().run()} title="Undo"><Undo size={15} /></RibbonButton>
          <RibbonButton onClick={() => editor.chain().focus().redo().run()} title="Redo"><Redo size={15} /></RibbonButton>
        </div>

        {/* Group 2: Text Style Dropdown */}
        <div className="relative pr-2 border-r border-slate-350" ref={styleDropdownRef}>
          <button
            type="button"
            onClick={() => setShowStyleDropdown(!showStyleDropdown)}
            className="px-2 py-1.5 text-xs border border-slate-300 rounded bg-white flex items-center gap-2 text-charcoal hover:bg-slate-50 min-w-[110px] justify-between"
          >
            <span>{getStyleLabel()}</span>
            <ChevronDown size={12} className="text-slate-500" />
          </button>
          
          {showStyleDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded shadow-lg py-1 min-w-[140px] z-50 flex flex-col">
              <button
                type="button"
                onClick={() => { editor.chain().focus().setParagraph().run(); setShowStyleDropdown(false) }}
                className="px-3 py-1.5 text-xs text-left hover:bg-slate-100 text-slate-800 font-sans"
              >
                Paragraph
              </button>
              <button
                type="button"
                onClick={() => { editor.chain().focus().toggleHeading({ level: 1 }).run(); setShowStyleDropdown(false) }}
                className="px-3 py-1.5 text-xs text-left hover:bg-slate-100 text-slate-800 font-serif font-bold text-lg"
              >
                Heading 1
              </button>
              <button
                type="button"
                onClick={() => { editor.chain().focus().toggleHeading({ level: 2 }).run(); setShowStyleDropdown(false) }}
                className="px-3 py-1.5 text-xs text-left hover:bg-slate-100 text-slate-800 font-serif font-bold text-base"
              >
                Heading 2
              </button>
              <button
                type="button"
                onClick={() => { editor.chain().focus().toggleHeading({ level: 3 }).run(); setShowStyleDropdown(false) }}
                className="px-3 py-1.5 text-xs text-left hover:bg-slate-100 text-slate-800 font-serif font-bold text-sm"
              >
                Heading 3
              </button>
              <button
                type="button"
                onClick={() => { editor.chain().focus().toggleBlockquote().run(); setShowStyleDropdown(false) }}
                className="px-3 py-1.5 text-xs text-left hover:bg-slate-100 text-slate-800 italic font-serif border-t border-slate-100"
              >
                Blockquote
              </button>
            </div>
          )}
        </div>

        {/* Group 3: Font Formatting & Color Picker */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-slate-350">
          <RibbonButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold"><Bold size={15} /></RibbonButton>
          <RibbonButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic"><Italic size={15} /></RibbonButton>
          <RibbonButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline"><UnderlineIcon size={15} /></RibbonButton>
          <RibbonButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough"><Strikethrough size={15} /></RibbonButton>
          
          {/* Swatch Text Color Picker */}
          <div className="relative" ref={colorPickerRef}>
            <button
              type="button"
              onClick={() => { setShowColorPicker(!showColorPicker); setShowHighlightPicker(false) }}
              className="p-1.5 rounded hover:bg-slate-100 text-charcoal flex items-center"
              title="Font Color"
            >
              <Palette size={15} />
            </button>
            {showColorPicker && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded shadow-lg p-2 grid grid-cols-5 gap-1.5 z-50">
                {brandColors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => {
                      if (c.value) {
                        editor.chain().focus().setColor(c.value).run()
                      } else {
                        editor.chain().focus().unsetColor().run()
                      }
                      setShowColorPicker(false)
                    }}
                    title={c.name}
                    style={{ backgroundColor: c.value }}
                    className="w-5 h-5 rounded border border-slate-300 hover:scale-110 transition-transform"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Swatch Highlight Picker */}
          <div className="relative" ref={highlightPickerRef}>
            <button
              type="button"
              onClick={() => { setShowHighlightPicker(!showHighlightPicker); setShowColorPicker(false) }}
              className="p-1.5 rounded hover:bg-slate-100 text-charcoal flex items-center"
              title="Text Highlight Color"
            >
              <Highlighter size={15} />
            </button>
            {showHighlightPicker && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded shadow-lg p-2 grid grid-cols-5 gap-1.5 z-50">
                {brandColors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => {
                      if (c.value) {
                        editor.chain().focus().toggleHighlight({ color: c.value }).run()
                      } else {
                        editor.chain().focus().unsetHighlight().run()
                      }
                      setShowHighlightPicker(false)
                    }}
                    title={c.name}
                    style={{ backgroundColor: c.value }}
                    className="w-5 h-5 rounded border border-slate-300 hover:scale-110 transition-transform"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Group 4: Alignment */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-slate-350">
          <RibbonButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align Left"><AlignLeft size={15} /></RibbonButton>
          <RibbonButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align Center"><AlignCenter size={15} /></RibbonButton>
          <RibbonButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align Right"><AlignRight size={15} /></RibbonButton>
          <RibbonButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} active={editor.isActive({ textAlign: 'justify' })} title="Align Justify"><AlignJustify size={15} /></RibbonButton>
        </div>

        {/* Group 5: Lists & Indentation */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-slate-350">
          <RibbonButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List"><List size={15} /></RibbonButton>
          <RibbonButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered List"><ListOrdered size={15} /></RibbonButton>
          <RibbonButton onClick={handleOutdent} title="Decrease Indent"><OutdentIcon size={15} /></RibbonButton>
          <RibbonButton onClick={handleIndent} title="Increase Indent"><IndentIcon size={15} /></RibbonButton>
        </div>

        {/* Group 6: Insert */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-slate-350">
          {/* Link Insertion */}
          <div className="relative" ref={linkModalRef}>
            <RibbonButton onClick={openLinkModal} active={editor.isActive('link')} title="Insert Hyperlink"><LinkIcon size={15} /></RibbonButton>
            {showLinkModal && (
              <form onSubmit={handleLinkSubmit} className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-md shadow-xl p-3 z-50 flex flex-col gap-2 min-w-[240px]">
                <div className="text-xs font-semibold text-slate-500">Insert Link</div>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="border border-slate-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-gold font-sans bg-white text-charcoal w-full"
                  required
                />
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={linkOpenInNewTab}
                    onChange={(e) => setLinkOpenInNewTab(e.target.checked)}
                    className="rounded text-gold border-slate-300 focus:ring-gold"
                  />
                  <span className="text-[10px] text-slate-600 font-sans">Open in new tab</span>
                </label>
                <div className="flex justify-end gap-1.5 mt-1 border-t border-slate-100 pt-2">
                  <button type="button" onClick={() => setShowLinkModal(false)} className="px-2 py-1 text-[10px] text-slate-500 hover:text-slate-800 font-sans">Cancel</button>
                  <button type="submit" className="px-2.5 py-1 text-[10px] bg-deep-green text-white rounded hover:bg-gold transition-colors font-sans">Apply</button>
                </div>
              </form>
            )}
          </div>

          <RibbonButton onClick={addImage} title="Insert Image"><ImageIcon size={15} /></RibbonButton>
          
          {/* Table Insert Grid Picker */}
          <div className="relative" ref={tableGridRef}>
            <RibbonButton onClick={() => setShowTableGrid(!showTableGrid)} active={editor.isActive('table')} title="Insert Table"><TableIcon size={15} /></RibbonButton>
            {showTableGrid && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded shadow-xl p-2.5 z-50 flex flex-col gap-2">
                <div className="text-xs font-semibold text-slate-500 select-none">Insert Table</div>
                <div 
                  className="grid grid-cols-5 gap-1 select-none"
                  onMouseLeave={() => { setHoveredRow(0); setHoveredCol(0) }}
                >
                  {Array.from({ length: 5 }).map((_, rIdx) => {
                    const r = rIdx + 1
                    return Array.from({ length: 5 }).map((_, cIdx) => {
                      const c = cIdx + 1
                      const isHighlighted = r <= (hoveredRow || 0) && c <= (hoveredCol || 0)
                      return (
                        <button
                          key={`${r}-${c}`}
                          type="button"
                          onMouseEnter={() => { setHoveredRow(r); setHoveredCol(c) }}
                          onClick={() => {
                            editor.chain().focus().insertTable({ rows: r, cols: c, withHeaderRow: true }).run()
                            setShowTableGrid(false)
                          }}
                          className={`w-6 h-6 border transition-colors rounded-sm ${
                            isHighlighted ? 'bg-sage border-deep-green' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                          }`}
                        />
                      )
                    })
                  })}
                </div>
                <div className="text-[10px] font-sans text-slate-500 text-center select-none">
                  {hoveredRow && hoveredCol ? `${hoveredRow} x ${hoveredCol} Table` : 'Select size'}
                </div>
              </div>
            )}
          </div>

          <RibbonButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Insert Horizontal Rule"><Minus size={15} /></RibbonButton>
        </div>

        {/* Group 7: Other (Clear formats, Code) */}
        <div className="flex items-center gap-0.5">
          <RibbonButton onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear Formatting"><Trash2 size={15} className="text-red-500 hover:text-red-700" /></RibbonButton>
          <RibbonButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Code term (inline)"><Code size={15} /></RibbonButton>
        </div>

        {/* Dynamic Table Manipulation Toolbar Group (Only visible if cursor inside a table) */}
        {editor.isActive('table') && (
          <div className="flex items-center gap-1 pl-2 border-l border-slate-350 bg-sage-mist/30 px-2 py-0.5 rounded">
            <span className="text-[10px] font-semibold text-deep-green uppercase tracking-wide mr-1">Table Layout:</span>
            <button
              type="button"
              onClick={() => editor.chain().focus().addRowBefore().run()}
              title="Add Row Above"
              className="p-1 text-xs text-charcoal hover:bg-slate-200 rounded"
            >
              + Row Above
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().addRowAfter().run()}
              title="Add Row Below"
              className="p-1 text-xs text-charcoal hover:bg-slate-200 rounded"
            >
              + Row Below
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().addColumnBefore().run()}
              title="Add Column Left"
              className="p-1 text-xs text-charcoal hover:bg-slate-200 rounded"
            >
              + Col Left
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              title="Add Column Right"
              className="p-1 text-xs text-charcoal hover:bg-slate-200 rounded"
            >
              + Col Right
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().deleteRow().run()}
              title="Delete Current Row"
              className="p-1 text-xs text-red-600 hover:bg-red-50 rounded ml-1"
            >
              Del Row
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().deleteColumn().run()}
              title="Delete Current Column"
              className="p-1 text-xs text-red-600 hover:bg-red-50 rounded"
            >
              Del Col
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().deleteTable().run()}
              title="Delete Entire Table"
              className="p-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded font-medium"
            >
              Del Table
            </button>
          </div>
        )}
      </div>

      {/* Editor Canvas Container (A4 Page Mimic View) */}
      <div className="flex-1 bg-slate-100 p-6 md:p-10 overflow-y-auto flex justify-center min-h-[500px] relative">
        
        {/* Uploading overlay */}
        {isUploadingImage && (
          <div className="absolute inset-0 bg-slate-100/70 backdrop-blur-[1px] flex flex-col justify-center items-center gap-3 z-25">
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
            <span className="text-xs font-semibold text-charcoal tracking-wide">Uploading media asset, please wait...</span>
          </div>
        )}

        <div className="bg-white shadow-md max-w-4xl w-full min-h-[700px] px-12 md:px-16 py-12 border border-slate-200 rounded-sm flex flex-col">
          {/* Header page mockup */}
          <div className="text-[10px] text-slate-400 border-b border-slate-100 pb-2 mb-8 flex justify-between select-none">
            <span>Honworth Rich Editor</span>
            <span>Word Document Canvas</span>
          </div>

          <EditorContent editor={editor} className="flex-1" />
        </div>
      </div>

      {/* Footer Word Count & Read Time status bar */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-500 select-none">
        <div className="flex items-center gap-4">
          <span>Words: <strong className="text-slate-700">{getWordCount()}</strong></span>
          <span>Reading time: <strong className="text-slate-700">{getReadingTime()}</strong></span>
        </div>
        <div className="text-[10px] text-slate-400">
          Keyboard shortcuts enabled (Ctrl/Cmd+B, Ctrl/Cmd+I)
        </div>
      </div>

      {error && <p className="text-red-600 text-xs px-6 py-2 bg-red-50 border-t border-red-200">{error}</p>}
    </div>
  )
}
