import { Upload } from 'lucide-react'
import { Badge } from './Badge'

interface UploadAreaProps {
  isDragging: boolean
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  onFileSelect: (file: File) => void
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
        <div className="flex justify-center">
          <Badge>v2.0 AI ENABLED</Badge>
        </div>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-black">
          HIDE WHAT <br />
          <span className="relative inline-block px-4">
            <span className="absolute inset-0 bg-lime-400 transform -skew-x-6 translate-y-2 opacity-50 blur-sm"></span>
            <span className="relative z-10 bg-lime-400 px-4 text-black transform -skew-x-3 inline-block border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              MATTERS
            </span>
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
          The privacy-first image editor.
          <span className="font-medium text-black">
            {' '}
            Blur plates, redact text, or remove backgrounds
          </span>{' '}
          without uploading a single byte.
        </p>
      </div>

      <div
        className={`
          group relative w-full max-w-2xl h-80 border-2 border-dashed rounded-none flex flex-col items-center justify-center gap-6 transition-all cursor-pointer bg-white
          ${isDragging ? 'border-lime-500 bg-lime-50 scale-[1.01]' : 'border-gray-300 hover:border-black hover:bg-gray-50'}
        `}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <div className="p-6 bg-black text-white group-hover:scale-110 transition-transform shadow-[8px_8px_0px_0px_rgba(163,230,53,1)]">
          <Upload className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <p className="font-bold text-2xl tracking-tight">
            Drop your image here
          </p>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">
            JPG · PNG · WEBP · Max 50MB
          </p>
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) =>
            e.target.files && onFileSelect(e.target.files[0])
          }
        />
      </div>
    </div>
  )
}

