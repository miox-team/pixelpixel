import { Upload } from 'lucide-react'
import { Badge } from './Badge'

interface UploadAreaProps {
  isDragging: boolean
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  onFileSelect: (files: FileList) => void
}

export const UploadArea = ({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
}: UploadAreaProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="space-y-6 max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-black dark:text-white">
          HIDE WHAT <br />
          <span className="relative inline-block px-4">
            <span className="absolute inset-0 bg-lime-400 dark:bg-lime-500 transform -skew-x-6 translate-y-2 opacity-50 blur-sm"></span>
            <span className="relative z-10 bg-lime-400 dark:bg-lime-500 px-4 text-black transform -skew-x-3 inline-block border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
              MATTERS
            </span>
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
          The privacy-first image editor for the modern web.
          <span className="font-medium text-black dark:text-white">
            {' '}
            Blur plates, faces, and data
          </span>{' '}
          without uploading a single byte.
        </p>
      </div>

      <div
        className={`
          group relative w-full max-w-2xl h-80 border-2 border-dashed rounded-none flex flex-col items-center justify-center gap-6 transition-all cursor-pointer bg-white dark:bg-gray-900
          ${isDragging ? 'border-lime-500 dark:border-lime-400 bg-lime-50 dark:bg-lime-950 scale-[1.01]' : 'border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white hover:bg-gray-50 dark:hover:bg-gray-800'}
        `}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <div className="p-6 bg-black dark:bg-white text-white dark:text-black group-hover:scale-110 transition-transform shadow-[8px_8px_0px_0px_rgba(163,230,53,1)]">
          <Upload className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <p className="font-bold text-2xl tracking-tight text-black dark:text-white">
            Drop your images here
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-mono uppercase tracking-widest">
            JPG · PNG · WEBP · Max 50MB each · Multiple files · Paste (Ctrl/Cmd+V)
          </p>
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          onChange={(e) => e.target.files && onFileSelect(e.target.files)}
        />
      </div>
    </div>
  )
}
