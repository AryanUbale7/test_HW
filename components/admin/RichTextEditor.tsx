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
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Heading2, Heading3, 
  List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Undo, Redo, 
  Minus, AlignLeft, AlignCenter, AlignRight, AlignJustify, Quote, 
  Maximize2, Minimize2, Palette, Highlighter, Trash2, Subscript as SubIcon,
  Superscript as SuperIcon, Table as TableIcon, CheckSquare, ArrowUp,
  ArrowDown, ArrowLeft, ArrowRight
} from 'lucide-react'
import { useCallback, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

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
        ? 'bg-blue-100 text-blue-700 font-medium' 
        : 'text-slate-700 hover:bg-slate-200 hover:text-slate-900'
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
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState<'home' | 'insert' | 'table'>('home')
  
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showHighlightPicker, setShowHighlightPicker] = useState(false)
  const [showFontPicker, setShowFontPicker] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
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
        HTMLAttributes: { class: 'text-blue-600 underline hover:text-blue-800' },
      }),
      Image.configure({
        HTMLAttributes: { class: 'rounded-md max-w-full my-4 mx-auto block shadow-sm border border-slate-200' },
      }),
      Placeholder.configure({
        placeholder: 'Double click to edit or start typing your document here...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm md:prose-base max-w-none focus:outline-none min-h-[900px] w-full',
      },
    },
  })

  const addLink = useCallback(() => {
    if (!editor) return
    const url = window.prompt('Enter URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }, [editor])

  const addImage = useCallback(async () => {
    if (!editor) return

    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      try {
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
      }
    }
    input.click()
  }, [editor])


  if (!editor) return null


  const colors = [
    { name: 'Default', value: '' },
    { name: 'Charcoal', value: '#334155' },
    { name: 'Gold', value: '#C5A880' },
    { name: 'Deep Green', value: '#1E3E30' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Blue', value: '#3B82F6' },
  ]

  const highlights = [
    { name: 'None', value: '' },
    { name: 'Yellow', value: '#FEF08A' },
    { name: 'Green', value: '#BBF7D0' },
    { name: 'Pink', value: '#FBCFE8' },
    { name: 'Blue', value: '#BFDBFE' },
  ]

  const fonts = [
    { name: 'Default', value: '' },
    { name: 'Arial', value: 'Arial' },
    { name: 'Georgia', value: 'Georgia' },
    { name: 'Courier New', value: 'Courier New' },
    { name: 'Times New Roman', value: 'Times New Roman' },
    { name: 'Trebuchet MS', value: 'Trebuchet MS' },
    { name: 'Verdana', value: 'Verdana' },
  ]

  const editorContainerClass = isFullscreen
    ? 'fixed inset-0 z-[9999] bg-slate-100 flex flex-col h-screen w-screen'
    : `border rounded-md overflow-hidden flex flex-col bg-slate-50 ${error ? 'border-red-300' : 'border-slate-350 shadow-inner'}`

  return (
    <div className={editorContainerClass}>
      <style>{`
        .ProseMirror table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 1.5rem 0;
          overflow: hidden;
        }
        .ProseMirror td, .ProseMirror th {
          min-width: 1em;
          border: 1px solid #cbd5e1;
          padding: 8px 10px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }
        .ProseMirror th {
          font-weight: bold;
          text-align: left;
          background-color: #f8fafc;
        }
        .ProseMirror ul[data-type="taskList"] {
          list-style: none;
          padding-left: 0;
        }
        .ProseMirror ul[data-type="taskList"] li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        .ProseMirror ul[data-type="taskList"] label {
          user-select: none;
          margin-top: 4px;
        }
        .ProseMirror ul[data-type="taskList"] input[type="checkbox"] {
          cursor: pointer;
          accent-color: #3b82f6;
          width: 15px;
          height: 15px;
          margin-top: 4px;
        }
      `}</style>

      {/* MS Word Ribbon Header Tabs */}
      <div className="bg-slate-100 border-b border-slate-250 flex items-center px-4 pt-1 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
            activeTab === 'home' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Home
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('insert')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
            activeTab === 'insert' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Insert
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('table')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
            activeTab === 'table' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Table Layout
        </button>
        
        <div className="flex-1" />

        <button
          type="button"
          onClick={() => setIsFullscreen(!isFullscreen)}
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Document Mode"}
          className="p-1.5 rounded text-blue-600 hover:bg-slate-200 transition-colors mb-1"
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>

      {/* Tab Content Ribbon */}
      <div className="bg-white border-b border-slate-200 p-2 flex flex-wrap items-center gap-1 min-h-[48px] shadow-sm">
        {/* Undo/Redo - Available everywhere */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-slate-200">
          <RibbonButton onClick={() => editor.chain().focus().undo().run()} title="Undo"><Undo size={15} /></RibbonButton>
          <RibbonButton onClick={() => editor.chain().focus().redo().run()} title="Redo"><Redo size={15} /></RibbonButton>
        </div>

        {/* HOME TAB RIBBON */}
        {activeTab === 'home' && (
          <div className="flex flex-wrap items-center gap-1.5 pl-2">
            {/* Font Family Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => { setShowFontPicker(!showFontPicker); setShowColorPicker(false); setShowHighlightPicker(false) }}
                className="px-2 py-1 text-xs border border-slate-250 rounded bg-slate-50 flex items-center gap-1 text-slate-700 hover:bg-slate-100"
              >
                Font Style
              </button>
              {showFontPicker && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-md shadow-lg p-1 min-w-[120px] flex flex-col z-20">
                  {fonts.map((f) => (
                    <button
                      key={f.name}
                      type="button"
                      onClick={() => {
                        if (f.value) {
                          editor.chain().focus().setFontFamily(f.value).run()
                        } else {
                          editor.chain().focus().unsetFontFamily().run()
                        }
                        setShowFontPicker(false)
                      }}
                      className="px-3 py-1.5 text-xs text-left hover:bg-slate-100 rounded text-slate-800"
                      style={{ fontFamily: f.value || 'inherit' }}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-px h-5 bg-slate-200" />

            {/* Typography styles */}
            <RibbonButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2"><Heading2 size={15} /></RibbonButton>
            <RibbonButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3"><Heading3 size={15} /></RibbonButton>
            <RibbonButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold"><Bold size={15} /></RibbonButton>
            <RibbonButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic"><Italic size={15} /></RibbonButton>
            <RibbonButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline"><UnderlineIcon size={15} /></RibbonButton>
            <RibbonButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough"><Strikethrough size={15} /></RibbonButton>

            <div className="w-px h-5 bg-slate-200" />

            {/* Subscript / Superscript */}
            <RibbonButton onClick={() => editor.chain().focus().toggleSubscript().run()} active={editor.isActive('subscript')} title="Subscript"><SubIcon size={15} /></RibbonButton>
            <RibbonButton onClick={() => editor.chain().focus().toggleSuperscript().run()} active={editor.isActive('superscript')} title="Superscript"><SuperIcon size={15} /></RibbonButton>

            <div className="w-px h-5 bg-slate-200" />

            {/* Alignments */}
            <RibbonButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align Left"><AlignLeft size={15} /></RibbonButton>
            <RibbonButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align Center"><AlignCenter size={15} /></RibbonButton>
            <RibbonButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align Right"><AlignRight size={15} /></RibbonButton>
            <RibbonButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} active={editor.isActive({ textAlign: 'justify' })} title="Align Justify"><AlignJustify size={15} /></RibbonButton>

            <div className="w-px h-5 bg-slate-200" />

            {/* Text Color */}
            <div className="relative">
              <button
                type="button"
                onClick={() => { setShowColorPicker(!showColorPicker); setShowHighlightPicker(false); setShowFontPicker(false) }}
                className="p-1.5 rounded text-slate-700 hover:bg-slate-250 flex items-center"
                title="Font Color"
              >
                <Palette size={15} />
              </button>
              {showColorPicker && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-md shadow-lg p-2 flex gap-1 z-20">
                  {colors.map((c) => (
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
                      style={{ backgroundColor: c.value || '#e2e8f0' }}
                      className="w-6 h-6 rounded-full border border-slate-350 hover:scale-110 transition-transform"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Text Highlight */}
            <div className="relative">
              <button
                type="button"
                onClick={() => { setShowHighlightPicker(!showHighlightPicker); setShowColorPicker(false); setShowFontPicker(false) }}
                className="p-1.5 rounded text-slate-700 hover:bg-slate-250 flex items-center"
                title="Text Highlight"
              >
                <Highlighter size={15} />
              </button>
              {showHighlightPicker && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-md shadow-lg p-2 flex gap-1 z-20">
                  {highlights.map((h) => (
                    <button
                      key={h.name}
                      type="button"
                      onClick={() => {
                        if (h.value) {
                          editor.chain().focus().toggleHighlight({ color: h.value }).run()
                        } else {
                          editor.chain().focus().unsetHighlight().run()
                        }
                        setShowHighlightPicker(false)
                      }}
                      title={h.name}
                      style={{ backgroundColor: h.value || '#e2e8f0' }}
                      className="w-6 h-6 rounded border border-slate-350 hover:scale-110 transition-transform"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="w-px h-5 bg-slate-200" />

            {/* Lists & Blockquote */}
            <RibbonButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List"><List size={15} /></RibbonButton>
            <RibbonButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered List"><ListOrdered size={15} /></RibbonButton>
            <RibbonButton onClick={() => editor.chain().focus().toggleTaskList().run()} active={editor.isActive('taskList')} title="Checkbox Checklist"><CheckSquare size={15} /></RibbonButton>
            <RibbonButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote"><Quote size={15} /></RibbonButton>

            <div className="w-px h-5 bg-slate-200" />

            {/* Reset Formatting */}
            <RibbonButton onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear formatting"><Trash2 size={15} className="text-red-500 hover:text-red-700" /></RibbonButton>
          </div>
        )}

        {/* INSERT TAB RIBBON */}
        {activeTab === 'insert' && (
          <div className="flex flex-wrap items-center gap-1.5 pl-2">
            <RibbonButton onClick={addImage} title="Insert Image"><ImageIcon size={15} /> Picture</RibbonButton>
            <RibbonButton onClick={addLink} active={editor.isActive('link')} title="Insert Link"><LinkIcon size={15} /> Hyperlink</RibbonButton>
            <RibbonButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Line"><Minus size={15} /> Horizontal line</RibbonButton>
            
            <div className="w-px h-5 bg-slate-200" />

            <RibbonButton 
              onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} 
              title="Insert Table"
            >
              <TableIcon size={15} /> Table (3x3)
            </RibbonButton>
          </div>
        )}

        {/* TABLE TAB RIBBON */}
        {activeTab === 'table' && (
          <div className="flex flex-wrap items-center gap-1.5 pl-2">
            <RibbonButton 
              onClick={() => editor.chain().focus().addRowBefore().run()} 
              disabled={!editor.isActive('table')}
              title="Insert Row Above"
            >
              <ArrowUp size={14} /> Row Above
            </RibbonButton>
            <RibbonButton 
              onClick={() => editor.chain().focus().addRowAfter().run()} 
              disabled={!editor.isActive('table')}
              title="Insert Row Below"
            >
              <ArrowDown size={14} /> Row Below
            </RibbonButton>
            <RibbonButton 
              onClick={() => editor.chain().focus().addColumnBefore().run()} 
              disabled={!editor.isActive('table')}
              title="Insert Column Left"
            >
              <ArrowLeft size={14} /> Column Left
            </RibbonButton>
            <RibbonButton 
              onClick={() => editor.chain().focus().addColumnAfter().run()} 
              disabled={!editor.isActive('table')}
              title="Insert Column Right"
            >
              <ArrowRight size={14} /> Column Right
            </RibbonButton>
            
            <div className="w-px h-5 bg-slate-200" />

            <RibbonButton 
              onClick={() => editor.chain().focus().deleteRow().run()} 
              disabled={!editor.isActive('table')}
              title="Delete Row"
            >
              <Trash2 size={14} /> Delete Row
            </RibbonButton>
            <RibbonButton 
              onClick={() => editor.chain().focus().deleteColumn().run()} 
              disabled={!editor.isActive('table')}
              title="Delete Column"
            >
              <Trash2 size={14} /> Delete Col
            </RibbonButton>
            <RibbonButton 
              onClick={() => editor.chain().focus().deleteTable().run()} 
              disabled={!editor.isActive('table')}
              title="Delete Table"
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={14} /> Delete Table
            </RibbonButton>
          </div>
        )}
      </div>

      {/* Editor Page-Style Canvas */}
      <div className="flex-1 bg-slate-100 p-8 overflow-y-auto flex justify-center">
        <div className="bg-white shadow-xl max-w-4xl w-full min-h-[1056px] px-16 py-14 border border-slate-250 rounded-sm focus:outline-none flex flex-col">
          {/* Header page mockup */}
          <div className="text-[10px] text-slate-400 border-b border-slate-100 pb-2 mb-6 flex justify-between select-none">
            <span>Honworth Blog Document</span>
            <span>A4 Writing Layout</span>
          </div>

          <EditorContent editor={editor} />
        </div>
      </div>

      {error && <p className="text-red-600 text-xs px-6 py-2 bg-red-50 border-t border-red-200">{error}</p>}
    </div>
  )
}
